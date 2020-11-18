# Web 运行时缓存

<!-- 从 xxx 应用/开源项目学到了哪些存储技术 -->
<!-- vuex 缓存的源码 -->
<!-- keep-alive 源码-->
<!-- 1. 闭包 -->
<!-- 2. 高阶函数 -->
<!-- 1. ajax 请求 -->
<!-- 2. vuex、webpack devserver 缓存/vite -->

## 前言

Web 运行时缓存本质上就是用空间（缓存存储）换时间（跳过计算过程）。前端运行时缓存，可以通过声明一个全局变量存储，更好的是通过一个函数中获取。

<!-- 头脑风暴 -->
<!-- - 函数缓存
  - 普通变量缓存
  - 闭包
  - 高阶函数
- vuex 缓存原理解析（源码）
- webpack devserver 缓存/vite
- 应用场景 ajax 请求
- vue 单页面应用缓存的最佳实践 -->
<!-- **阅读时长**：20min -->

## 编码基本缓存技术

<!-- ### 函数缓存 -->
<!-- ### 常用的存储技术 -->

<!-- Object 对象、Map -->

### 基本示例

假设又一个获取天气的函数 getChanceOfRain，每次调用都要花 100ms 计算：

```js
import { getChanceOfRain } from "magic-weather-calculator";
function showWeatherReport() {
  let result = getChanceOfRain(); // Let the magic happen
  console.log("The chance of rain tomorrow is:", result);
}

showWeatherReport(); // (!) Triggers the calculation
showWeatherReport(); // (!) Triggers the calculation
showWeatherReport(); // (!) Triggers the calculation
```

很显然这样太浪费计算资源了，当已经计算过一次天气后，就没有必要再算一次了，我们期望的是后续调用可以直接拿上一次结果的缓存，这样可以节省大量计算。因此我们可以做一个 memoizedGetChanceOfRain 函数缓存计算结果：

```js
import { getChanceOfRain } from "magic-weather-calculator";
let isCalculated = false;
let lastResult;
// We added this function!
function memoizedGetChanceOfRain() {
  if (isCalculated) {
    // No need to calculate it again.
    return lastResult;
  }
  // Gotta calculate it for the first time.
  let result = getChanceOfRain();
  // Remember it for the next time.
  lastResult = result;
  isCalculated = true;
  return result;
}
function showWeatherReport() {
  // Use the memoized function instead of the original function.
  let result = memoizedGetChanceOfRain();
  console.log("The chance of rain tomorrow is:", result);
}
```

### 闭包 + 高阶函数

可以把缓存函数抽离出来，运行闭包和高阶函数：

```js
function memoize(fn) {
  let isCalculated = false;
  let lastResult;
  return function memoizedFn() {
    // Return the generated function!
    if (isCalculated) {
      return lastResult;
    }
    let result = fn();
    lastResult = result;
    isCalculated = true;
    return result;
  };
}
```

这样生成新的缓存函数就很方便：

```js
let memoizedGetChanceOfRain = memoize(getChanceOfRain);
let memoizedGetNextEarthquake = memoize(getNextEarthquake);
let memoizedGetCosmicRaysProbability = memoize(getCosmicRaysProbability);
```

## 实战应用

<!-- ### 建立一个全局的 Modal 框 -->
<!-- ### 前端缓存当前展开的树节点 -->

### 封装一个 LocalStorage 缓存类

```js
// 先实现一个基础的StorageBase类，把getItem和setItem方法放在它的原型链上
function StorageBase() {}
StorageBase.prototype.getItem = function(key) {
  return localStorage.getItem(key);
};
StorageBase.prototype.setItem = function(key, value) {
  return localStorage.setItem(key, value);
};

// 以闭包的形式创建一个引用自由变量的构造函数
const Storage = (function() {
  let instance = null;
  return function() {
    // 判断自由变量是否为null
    if (!instance) {
      // 如果为null则new出唯一实例
      instance = new StorageBase();
    }
    return instance;
  };
})();

// 这里其实不用 new Storage 的形式调用，直接 Storage() 也会有一样的效果
const storage1 = new Storage();
const storage2 = new Storage();
```

上面这种缓存方式在设计模式中就是一个单例，前端的应用有全局建立一个模态框，vuex 的 install 函数。

### 前端 api 请求响应数据缓存

缓存指定服务的基本信息，后期减少请求次数。

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
export const getServerAllLayerInfo = async (url) => {
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
    result: res,
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
      console.log("地图服务查询结果里没有图层信息");
      localstatus = false;
    } else {
      const filterLayer = layers.filter((v) => v.name.trim() === name.trim());
      if (filterLayer.length > 0) {
        layerId = filterLayer[0].id;
        console.log(`${url}/${layerId}  ${name}`);
      } else {
        // 特定的图层不存在
        console.log(`${name}所对应的图层不存在`);
        localstatus = false;
      }
    }
  }
  return new Promise(async (resolve) => {
    if (localstatus) {
      resolve(layerId);
    } else {
      resolve(-1);
    }
  });
};
```

<!-- ## 前端 api 请求缓存 -->

<!-- ## vuecli 单页面应用缓存方案分析 -->

<!-- ### vuex 缓存原理解析 -->

<!-- ### 构建工具的缓存：webpack devserver & vite  -->

## 小结

运行时缓存虽好，但并不是所有场景都适用，比如以下两种情况不适合用缓存：

- 不经常执行的函数。
- 本身执行速度较快的函数。

## 参考资料

- [Web 性能优化资源合集（持续更新）](../reference/README.md#网络)
