# 大数据量的渲染优化

基本策略：
- 延迟（执行、加载）
- 按需（加载）
- 缓存（资源）
- 预备（提前执行、加载）

## 分页

## 长列表

无法使用分页的情况下，采用长列表，例如移动端的滚动方案。

<!-- 关于滚动尺寸等，可以看xxx -->

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>长列表</title>
  </head>
  <body>
    <h1>长列表</h1>
    <button id="btn">createElement</button>
    <script src="./demo01.js"></script>
  </body>
</html>
```

```js
/**
 * @description: 创建带文本元素
 * @param {type}
 * @return:
 */

var createElements = function(count) {
  var start = new Date();
  for (var i = 0; i < count; i++) {
    var element = document.createElement("div");
    element.appendChild(document.createTextNode("" + i));
    document.body.appendChild(element);
  }
  setTimeout(() => {
    alert(new Date() - start);
  }, 0);
};

document
  .querySelector("#btn")
  .addEventListener("click", createElements.bind(this, 10000), false);
```

### 懒渲染

在滚动到页面底部的时候，再去加载剩余的数据。这是一种前后端共同优化的方式，跟分页很像。

实现思路：监听父元素的 `scroll` 事件（一般是 window），通过父元素的 scrollTop 判断是否到了页面底部，如果到了页面底部，就加载更多的数据。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>懒渲染</title>
    <style>
      .lazy-render-list {
        border: 1px solid #666;
        overflow: auto;
        width: 500px;
        height: 500px;
      }

      .lazy-render-list-item {
        box-sizing: border-box;
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
        border-bottom: 1px solid #666;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="lazy-render-list"></div>
    <script src="./demo03.js"></script>
  </body>
</html>
```

```js
/**
 * @description: 解决底部一定距离，如提前加载数据
 * @param {type}
 * @return:
 */
let isCloseToBottom = (el, distance) => {
  const maxScrollTop = el.scrollHeight - el.clientHeight;
  const currentScrollTop = el.scrollTop + distance;
  if (maxScrollTop <= currentScrollTop) {
    return true;
  }
  return false;
};

let createElements = function(el, count, delta) {
  for (let i = count; i < count + delta; i++) {
    const templateString = `<div class="lazy-render-list-item">${i}</div>`;
    const div = document.createElement("div");
    div.innerHTML = templateString;
    const liDom = div.childNodes[0];
    el.appendChild(liDom);
  }
};

let count = 0;
let loadData = (el) => {
  let tempCount = count;
  let delta = 100000; // 增量，一次加载 40 条
  createElements(el, tempCount, delta);
  count += delta; 
};

let updated = (e) => {
  const target = e.target || e.srcElement;
  if (isCloseToBottom(target, 0)) {
    setTimeout(loadData.bind(null, target), 500);
  }
};

let init = () => {
  let outerDom = document.querySelector(".lazy-render-list");
  loadData(outerDom);
  outerDom.addEventListener("scroll", updated, false);
};

init();

```

### 可视区域渲染

通过懒渲染可以解决初始渲染的性能问题，但是在不断加载过后，整个列表会变得非常长，每次滚动都要改变所有的节点的位置，引发`回流`导致`重绘`，导致响应缓慢，并且过多的节点对象占用了大量的堆、栈内存。

[通过 performance 获得的 10000 个节点每次滚动的时间花费](placeholder)

因此，为了解决这个问题，我们需要可视区域渲染。

`可视区域`指的是只渲染可视区域的列表项，非可见区域的完全不渲染，在滚动条滚动时动态更新列表项（跟断点续传的套路一样，进行分片切割，网络缓冲区）。可视区域渲染适合下面这种场景：

思路：
1. 

<!-- TODO 动画演示思路，ppt 或编码 -->

性能对比。

思路：
详解：
1. HTML 结构

## 虚拟列表

### 什么是虚拟列表

## 树

### tree 数据和 DOM 结构的扁平化

vue 组件数据

### 类虚拟列表方案

## vue 树组件

tree 的性能缓慢原因，树以及它为什么能够解决初始大数据渲染的原因（重绘），然后应用到自己写的 tree 中。

关于这个性能问题，是因为那边有个目录树有 2000+子节点，用 iview 自带的 tree 组件加载非常卡顿，根本无法使用。iview 的 tree 组件我之前优化过源码，但是 2000+的子节点一样会存在性能问题，这和 vue 和作者设计有关，引起卡顿原因：

1、折叠节点一次就要重新递归一次
2、数据改变，vue 就要触发收集依赖相关函数，和 computed 的回调函数，1 个子节点 1 个函数，1 个函数耗时 6ms，1000\*6ms = 6000ms === 6s，所以加载很慢

<!-- ## 虚拟 DOM，考虑放到 Vue 框架内 -->

### 原因分析

### 改写 iview 树组件

<!-- 后续更改组件源码 -->
