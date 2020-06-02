/*
 * @Description: 可视区域渲染指的是只渲染可视区域的列表项，非可见区域的完全不渲染，在滚动条滚动时动态更新列表项
 可视区域渲染适合下面这种场景：

1. 每个数据的展现形式的高度需要一致（非必须，TODO，后续详细绘图）。

2. 产品设计上，一次需要加载的数据量比较大「1000条以上」。

3. 产品设计上，滚动条需要挂载在一个固定高度的区域（在 window 上也可以，但是需要整个区域都只显示这个列表）。
 * @Author: Jecyu
 * @Date: 2020-06-02 11:21:10
 * @LastEditTime: 2020-06-02 20:30:09
 * @LastEditors: Jecyu
 */

const app = {
  data: [], // 总数据
  itemHeight: 30, // listItem 高度
  start: 0,
  end: null,
  visibleCount: null, // 可见的条数
  visibleData: [], // 当前可见的数据
  listViewDom: null,
  listViewContentDom: null,
  handleScroll(e) {
    const target = e.target || e.srcElement;
    const scrollTop = target.scrollTop;
    // 减去整除 itemHeigt 多出来的距离，得到整倍数，并进行 transformY 移动，使listViewContentDom容器的位置回到可见区域（因为滚动导致）
    const fixedScrollTop = scrollTop - scrollTop % this.itemHeight; // TODO，后续详细绘图，跟下面的 start 求值做对应处理，因此只需要移动整倍数。
    // const fixedScrollTop = scrollTop; // 直接采用这个的话，拖到底部后会出现页面抖动现象。
    this.listViewContentDom.style.webkitTransform = `translate3d(0, ${fixedScrollTop}px, 0)`;

    // 改变要渲染的数据
    this.start = Math.floor(scrollTop / this.itemHeight); // 起点数据不会计算上余数，因此不会多请求额外的数据，保证整个容器高度容纳了所有显示的数据。
    this.visibleData = this.getVisibleData(target, this.start);
    this.renderListViewContentDom();
  },
  bindEvent(el) {
    el.addEventListener("scroll", this.handleScroll.bind(this), false);
  },
  mockData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
      const obj = {
        value: i,
      };
      data.push(obj);
    }
    return data;
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
  createDomFromString(templateString) {
    const div = document.createElement("div");
    div.innerHTML = templateString;
    const dom = div.childNodes[0];
    return dom;
  },

  renderListItem(data) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const templateString = `<div class="list-view-item">${item.value}</div>`;
      const element = this.createDomFromString(templateString);
      fragment.appendChild(element);
    }
    return fragment;
  },
  renderListViewContentDom() {
    this.listViewContentDom.innerHTML = "";
    this.listViewContentDom.appendChild(this.renderListItem(this.visibleData));
    return this;
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
};

window.onload = () => {
  app.init();
}
