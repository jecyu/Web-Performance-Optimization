/*
 * @Description: 懒渲染
 * @Author: Jecyu
 * @Date: 2020-06-02 09:20:18
 * @LastEditTime: 2020-06-02 17:24:53
 * @LastEditors: Jecyu
 */

const app = {
  count: 0, // 总条数
  delta: 40, // 增量，一次加载 40 条 -->
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

  createElements(el, count, delta) {
    for (let i = count; i < count + delta; i++) {
      const templateString = `<div class="lazy-render-list-item">${i}</div>`;
      const div = document.createElement("div");
      div.innerHTML = templateString;
      const liDom = div.childNodes[0];
      el.appendChild(liDom);
    }
  },
  loadData(el) {
    let tempCount = this.count;
    this.createElements(el, tempCount, this.delta);
    this.count += this.delta;
  },

  updated(e) {
    const target = e.target || e.srcElement;
    if (this.isCloseToBottom(target, 0)) {
      setTimeout(this.loadData.bind(this, target), 500);
    }
  },

  init() {
    let outerDom = document.querySelector(".lazy-render-list");
    this.loadData(outerDom);
    outerDom.addEventListener("scroll", this.updated.bind(this), false);
  },
};
window.onload = () => {
  app.init();
};
