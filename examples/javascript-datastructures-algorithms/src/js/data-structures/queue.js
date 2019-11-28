export default class Queue {
  constructor() {
    this.count = 0; // 控制队列的大小
    this.lowestCount = 0; // 用于追踪第一元素，便于从队列前端移除元素
    this.items = {}; // 用对象存储我们的元素
  }
  /**
   * 向队列添加元素
   * 该方法负责向队列添加新元素，新的项只能添加到队列末尾。
   * @param {*} element 
   */
  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }
  /**
   * 从队列移除元素
   */
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount]; // 暂存队列头部的值，以便改元素被移除后将它返回
    delete this.items[this.lowestCount];
    this.lowestCount++; // 属性+ 1
    return result;
  }
  /**
   * 查看队列头元素
   */
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }
  /**
   * 检查队列是否为空并获取它的长度
   */
  isEmpty() {
    return this.count - this.lowestCount === 0; // 要计算队列中有多少元素，我们只需要计算 count 和 lowestCount 之间的差值
  }
  /**
   * 计算队列中有多少元素
   */
  size() {
    return this.count - this.lowestCount;
  }
  /**
   * 清空队列
   * 要清空队列，我们可以调用 dequeue 方法直到它返回 undefined，也可以简单地将队列中的舒心值重设为和构造函数的一样。
   * @memberof Queue
   */
  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString;
  }
}