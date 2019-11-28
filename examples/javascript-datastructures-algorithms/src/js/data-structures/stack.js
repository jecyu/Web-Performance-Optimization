/**
 * @description 创建一个基于 JavaScript 对象的 Stack 类
 * 使用 JavaScript 对象来存储所有的栈元素，保证它们的顺序并且遵循 LIFO 原则。
 * @class Stack
 */
export default class Stack {
  constructor() {
    this.count = 0; // 记录栈的大小，以及帮助我们从数据结构中添加和删除元素。保证顺序
    this.items = {}
  }
  /**
   * @description 向栈中插入元素
   * @param {*} element
   * @memberof Stack
   */
  push(element) {
    this.items[this.count] = element;
    this.count++;
  }
  /**
   * @description 从栈中弹出元素
   * @returns 移出最后添加进去的元素
   * @memberof Stack
   */
  pop() {
    if (this.isEmpty()) { // {1}检验栈是否空
      return undefined; // 如果为空，则返回 undefined
    } 
    this.count--; // 如果栈不为空的话，我们会讲 count 属性减1
    const result = this.items[this.count]; // 保存栈顶的
    delete this.items[this.count] // 删除该属性
    return result;
  }
  /**
   * @description 返回栈的长度
   * @returns
   * @memberof Stack
   */
  size() {
    return this.count;
  }
  /**
   * @description 检查栈是否为空
   * @returns
   * @memberof Stack
   */
  isEmpty() {
    return this.count === 0;
  }
   /**
   * @description 查看栈顶元素
   * @returns 返回栈顶的元素
   * @memberof Stack
   */
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count -1];
  }
  /**
   * @description 清空栈元素
   * @memberof Stack
   */
  clear() {
    this.items = {};
    this.count = 0;
    // 或者 LIFO 原则
    // while (!this.isEmpty()) { this.pop(); }
  }
  /**
   * @description 打印栈的内容
   * @returns
   * @memberof Stack
   */
  toString() {
    if (this.isEmpty()) {
      return ''; // 如果栈是空的，我们只需返回一个空字符串
    }
    let objString = `${this.items[0]}`; // 如果不是空的，就用它底部的第一个元素作为字符串的初始值
    for (let i = 1; i < this.count; i++) { // 迭代整个栈的键
      objString = `${objString},${this.items[i]}`
    }
    return objString;
  }
}