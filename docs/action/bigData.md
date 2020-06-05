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

`可视区域`指的是只渲染可视区域的列表项，非可见区域的完全不渲染，在滚动条滚动时动态更新列表项（跟`断点续传`的套路很像，进行分片切割，网络缓冲区）。可视区域渲染适合下面这种场景：

1. 每个数据的展现形式的高度需要一致（非必须）。

2. 产品设计上，一次需要加载的数据量比较大「1000条以上」。

3. 产品设计上，滚动条需要挂载在一个固定高度的区域（在 window 上也可以，但是需要整个区域都只显示这个列表）。


<!-- TODO 动画演示思路，ppt 或编码 -->

<!-- 性能对比。 -->

思路详解：

- HTML 结构上使用 phantom 作为幽灵元素，占位高度，使得容器可以滚动。
- 根据可视区域的高度以及每条数据的固定高度，计算出可以显示的条数 visibleCount，对整个的数据 data 切割出初始化显示的数据 visibleData。
- 然后触发滚动事件，根据 `this.start = Math.floor(scrollTop / this.itemHeight)` 计算出起点位置，以及 start + visibleCount 计算终点位置，切割出当前要显示的数据。
- 由于滚动了列表内容元素，因此需要使用 transform 把列表容器移回可视区域，移动Y 为`fixedScrollTop = scrollTop - scrollTop % this.itemHeight;`

1. HTML 结构

```html
<div class="list-view">
  <div class="list-view-phantom"></div>
  <div class="list-view-content">
    <!-- <div class="list-view-item"></div> -->
  </div>
</div>
```

2. CSS

```css
.list-view {
  overflow: auto;
  position: relative;
  height: 400px;
  border: 1px solid #666;
}
.list-view-phantom {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: -1;
}
.list-view-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}
.list-view-item {
  height: 30px;
  line-height: 30px;
  padding-left: 5px;
  box-sizing: border-box;
  border-bottom: 1px solid #666;
  color: #666;
}
```

3. JS

```js
handleScroll(e) {
    const target = e.target || e.srcElement;
    const scrollTop = target.scrollTop;
    // 减去整除 itemHeigt 多出来的距离，得到整倍数，并进行 transformY 移动，使listViewContentDom容器的位置回到可见区域（因为滚动导致）
    const fixedScrollTop = scrollTop - scrollTop % this.itemHeight; // 跟下面的 start 求值做对应处理，因此只需要移动整倍数。
    // const fixedScrollTop = scrollTop; // 直接采用这个的话，拖到底部后会出现页面抖动现象。
    this.listViewContentDom.style.webkitTransform = `translate3d(0, ${fixedScrollTop}px, 0)`;

    // 改变要渲染的数据
    this.start = Math.floor(scrollTop / this.itemHeight); // 起点数据不会计算上余数，因此不会多请求额外的数据，保证整个容器高度容纳了所有显示的数据。
    this.visibleData = this.getVisibleData(target, this.start);
    this.renderListViewContentDom();
  },
    /**
   * @description: 获得渲染的数据
   * @param {type}
   * @return:
   */
  getVisibleData(el, start = 0) {
    this.start = start;
    this.visibleCount = Math.ceil(el.clientHeight / this.itemHeight); // 向上取整
    this.end = this.start + this.visibleCount;
    const visibleData = this.data.slice(this.start, this.end);
    return visibleData;
  },
init() {
    this.data = this.mockData(100);
    this.listViewDom = document.querySelector(".list-view");
    const phantomDom = document.querySelector(".list-view-phantom"); // 幽灵元素，用于占位高度，使容器可以一直滚动
    phantomDom.style.height = this.data.length * this.itemHeight + "px";
    this.listViewContentDom = document.querySelector(".list-view-content");

    this.visibleData = this.getVisibleData(this.listViewDom);
    this.renderListViewContentDom().bindEvent(this.listViewDom);
  },
```

#### 可视区域渲染 + 懒渲染

只需要把在 handleScroll 添加滚动至底部的时候，进行数据的增加，并重新渲染即可。

```js
handleScroll(e) {
    const target = e.target || e.srcElement;
    // 加载更多的数据
    if (this.isCloseToBottom(target, 0)) {
      setTimeout(() => {
        this.data.push(...this.mockData(this.delta, this.data.length));
        console.log("loadmore =>", this.data);
        this.start = Math.floor(scrollTop / this.itemHeight); // 改变起始位置
        this.render();
      }, 500);
    }
  // .....
}
```

## 虚拟列表

### 什么是虚拟列表

## 树

### tree 数据和 DOM 结构的扁平化

vue 组件数据

### 类虚拟列表方案

## vue 树组件

响应式的设计，更适合对节点进行增删改查的操作，所以才有 vue 树的需求，不仅仅是原生的树节点。但是当整个列表节点非常多的时候，就不建议移动了，但是修改还是有必要的。

tree 的性能缓慢原因，树以及它为什么能够解决初始大数据渲染的原因（重绘），然后应用到自己写的 tree 中。

关于这个性能问题，是因为那边有个目录树有 2000+子节点，用 iview 自带的 tree 组件加载非常卡顿，根本无法使用。iview 的 tree 组件我之前优化过源码，但是 2000+的子节点一样会存在性能问题，这和 vue 和作者设计有关，引起卡顿原因：

1、折叠节点一次就要重新递归一次
2、数据改变，vue 就要触发收集依赖相关函数，和 computed 的回调函数，1 个子节点 1 个函数，1 个函数耗时 6ms，1000\*6ms = 6000ms === 6s，所以加载很慢

<!-- ## 虚拟 DOM，考虑放到 Vue 框架内 -->

### 原因分析

### 改写 iview 树组件

<!-- 后续更改组件源码 -->
