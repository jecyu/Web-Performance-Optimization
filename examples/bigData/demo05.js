/*
 * @Description: 可视区域渲染指的是只渲染可视区域的列表项，非可见区域的完全不渲染，在滚动条滚动时动态更新列表项
 可视区域渲染适合下面这种场景：

1. 每个数据的展现形式的高度需要一致（非必须，TODO，后续详细绘图）。

2. 产品设计上，一次需要加载的数据量比较大「1000条以上」。

3. 产品设计上，滚动条需要挂载在一个固定高度的区域（在 window 上也可以，但是需要整个区域都只显示这个列表）。
 * @Author: Jecyu
 * @Date: 2020-06-02 11:21:10
 * @LastEditTime: 2020-06-05 15:25:41
 * @LastEditors: Jecyu
 */

const app = {
  data: [], // 总数据
  itemHeight: 30, // listItem 高度
  contentHeight: 0, // 占位高度
  start: 0,
  end: null,
  visibleCount: null, // 可见的条数
  visibleData: [], // 当前可见的数据
  listViewDom: null,
  listViewContentDom: null,
  delta: 100, // 增量，一次加载 100 条
  /**
   * @description: 解决底部一定距离，如提前加载数据
   * @param {type}
   * @return:
   */
  isCloseToBottom(el, distance) {
    const maxScrollTop = el.scrollHeight - el.clientHeight;
    const currentScrollTop = el.scrollTop + distance;
    if (maxScrollTop <= currentScrollTop) {
      return true;
    }
    return false;
  },

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

    const scrollTop = target.scrollTop;
    // 减去整除 itemHeigt 多出来的距离，得到整倍数，并进行 transformY 移动，使listViewContentDom容器的位置回到可见区域（因为滚动导致）
    const fixedScrollTop = scrollTop - (scrollTop % this.itemHeight); // TODO，后续详细绘图，跟下面的 start 求值做对应处理，因此只需要移动整倍数。
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
  /**
   * mock 数据
   */
  mockData(count, start = 0) {
    const data = [];
    for (let i = 0; i < count; i++) {
      const obj = {
        value: start + i,
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
  /**
   * @description: 渲染列表项目
   * @param {type} 
   * @return: 
   */
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
  /**
   * 渲染列表内容
   */
  renderListViewContentDom() {
    this.listViewContentDom.innerHTML = "";
    this.listViewContentDom.appendChild(this.renderListItem(this.visibleData));
    return this;
  },
  render() {
    this.contentHeight = this.data.length * this.itemHeight + "px";
    this.phantomDom.style.height = this.contentHeight;
    this.visibleData = this.getVisibleData(this.listViewDom, this.start);
    this.renderListViewContentDom();
    return this;
  },
  init() {
    this.data = this.mockData(100);
    this.listViewDom = document.querySelector(".list-view");
    this.phantomDom = document.querySelector(".list-view-phantom"); // 幽灵元素，用于占位高度，使容器可以一直滚动
    this.listViewContentDom = document.querySelector(".list-view-content");
    this.render().bindEvent(this.listViewDom);
  },
};

window.onload = () => {
  app.init();
};
