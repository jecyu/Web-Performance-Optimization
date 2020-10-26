# Web 应用层缓存 

<!-- 从 xxx 应用/开源项目学到了哪些存储技术 -->
<!-- vuex 缓存的源码 -->
<!-- keep-alive 源码-->
<!-- 1. 闭包 -->
<!-- 2. 高阶函数 -->
<!-- 1. ajax 请求 -->
<!-- 2. vuex、webpack devserver 缓存/vite -->

<!-- 如果不这样说，干货就少了点 -->

## 前言

头脑风暴
- vue 单页面应用缓存的最佳实践

**阅读时长**：20min

## 函数缓存

缓存指定服务的基本信息，后期减少请求次数，ArcGIS。

```js
import axios from "axios";
// 缓存指定服务的基本信息，后期减少请求次数
let serverLayerInfo = new Map();
// 拿到服务所有图层信息
/**
 * @description 拿到服务所有图层信息
 * @param {...Array} args 数组参数 顺序不能乱
 * @param {String} url 服务地址
 * @returns {Object}
 */
export const clearLayerToolsCacheData = () => {
  serverLayerInfo = null;
};
export const getServerAllLayerInfo = async url => {
  // 解析服务里的图层
  const infoUrl = url.trim() + "?f=pjson";
  let res = null;
  let status = true;
  if (serverLayerInfo && serverLayerInfo.has(url)) {
    res = serverLayerInfo.get(url);
  } else {
    serverLayerInfo = new Map();
    try {
      res = await axios.get(infoUrl);
      serverLayerInfo.set(url, res);
    } catch (err) {
      // 服务挂了
      // iview.Message.error("地图服务查询错误!");
      console.log("地图服务查询错误!");
      status = false;
    }
  }
  return {
    status: status,
    result: res
  };
};
/**
 * @description: 通过名称解析服务里的对应的图层ID
 * @param {String} name 图层名称
 * @return: Number
 */
export const resolveServerLayerId = async (url, name) => {
  // 解析服务里的图层
  const { status, result: res } = await getServerAllLayerInfo(url);
  let localstatus = status;
  let layerId = void 0;
  if (localstatus) {
    const { layers } = res.data;
    if (!layers) {
      // 图层不存在
      // iview.Message.error("地图服务查询结果里没有图层信息");
      console.log("地图服务查询结果里没有图层信息");
      localstatus = false;
    } else {
      const filterLayer = layers.filter(v => v.name.trim() === name.trim());
      if (filterLayer.length > 0) {
        layerId = filterLayer[0].id;
        console.log(`${url}/${layerId}  ${name}`);
      } else {
        // 特定的图层不存在
        // iview.Message.error(`${name}所对应的图层不存在`);
        console.log(`${name}所对应的图层不存在`);
        localstatus = false;
      }
    }
  }
  return new Promise(async resolve => {
    if (localstatus) {
      resolve(layerId);
    } else {
      resolve(-1);
    }
  });
};

```

## 参考资料

- 《精读函数缓存》