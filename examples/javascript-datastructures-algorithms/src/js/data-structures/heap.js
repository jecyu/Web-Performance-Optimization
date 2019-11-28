
import { defaultCompare, Compare, swap } from '../util'

/**
 * 最小堆类
 * 完全二叉树，根节点最小的堆叫做最小堆
 * 在二叉堆中，每个子节点都要大于等于父节点
 * @export
 * @class MinHeap
 */
export class MinHeap {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.heap = []; // 使用数组来存储数据，通过索引值检索父节点、左侧和右侧子节点的值。
  }
  getLeftIndex(index) {
    return 2 * index + 1;
  }
  getRightIndex(index) {
    return 2 * index + 2;
  }
  getParentIndex(index) {
    if (index === 0) {
      return undefined;
    }
    return Math.floor((index - 1) / 2)
  }
  /**
   * 向堆中插入值
   * 指将值插入堆的底部叶节点（数组的最后一个位置）
   * @param {*} value
   * @memberof MinHeap
   */
  insert(value) {
    if (value !== null) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1); // 将这个值和它的父节点进行交换，直到父节点小于这个插入的值。
      return true;
    }
    return false;
  }
  /**
   * 上移操作，维护堆的结构
   * 将这个值和它的父节点进行交换，直到父节点小于这个插入的值。
   * @param {*} index
   * @memberof MinHeap
   */
  siftUp(index) {
    let parent = this.getParentIndex(index); // 获得父节点的索引
    while( index > 0 && this.compareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN) {
      swap(this.heap, parent, index);
      index = parent; // 往上替换
    }
  }
  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
  /**
   * 从堆中找到最小值或最大值
   * 在最小堆中，最小值总是位于数组的第一个位置（堆的根节点）
   * @memberof MinHeap
   */
  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0];
  }
  /**
   * 移除最小值表示移除数组中的第一个元素（堆的根节点）。
   * 在移除后，我们将堆的最后一个元素移动至根部并执行 siftDown 函数，表示我们将交换元素直到堆的结构正常。
   * @memberof MinHeap
   */
  extract() {
    if(this.isEmpty()) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.shift();
    }
    const removedValue = this.heap.shift();
    this.siftDown(0);
    return removedValue;
  }
  /**
   * 下移操作，维护堆的结构
   * @param {*} index 移除元素的位置
   * @memberof MinHeap
   */
  siftDown(index) {
    let element = index; // 将 index 复制到 element 变量中
    const left = this.getLeftIndex(index);
    const right = this.getRightIndex(index);
    const size = this.size();
    // 如果元素比左侧节点要小，且 index 合法。
    if (left < size && this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN) {
      element = left;
    }
    // 如果元素比右侧节点要小，且 index 合法。
    if (right < size && this.compareFn(this.heap[element], this.heap[right] === Compare.BIGGER_THAN)) {
      element = right;
    }
    if (index !== element) {
      swap(this.heap, index, element);
      this.siftDown(element); // 向下移动
    }
  }
}