# 队列

队列是遵循先进先出（**FIFO**，也称为先来先服务）原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。

在现实中，最常见的队列的例子就是排队。

![queue](../.vuepress/public/assets/queue.jpg)

在电影院、自助餐厅、杂货店收银台，我们都会排队。排在第一位的人会先接受服务。
在计算机科学中，一个常见的例子就是打印队列。比如说，我们需要打印五份文档。我们会打开每个文档，然后点击打印按钮。每个文档都会被发送至打印队列。第一个发送到打印队列的文档会首先被打印，以此类推，直到打印完所有文档。

## 创建队列

```js
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
```

## 使用队列来解决问题

### 循环队列——击鼓传花游戏

![queue-loop-boom](../.vuepress/public/assets/queue-loop-boom.jpg)

```js
import Queue from "../data-structures/queue"
/**
 * 模拟击鼓传花
 * 循环队列。在这个游戏中，孩子们围成一个圆圈，把花尽快传递给旁边的人。某一时刻传花停止，这个时候花在谁手上，谁就退出圆圈，结束游戏。
 * 重复这个过程，直到只剩一个孩子（胜者）。
 * @export
 * @param {*} elementsList 要入列的元素
 * @param {*} num // 达到给定的传递次数。 // 可以随机输入
 */
export default function hotPotato(elementsList, num) {
  const queue = new Queue();
  const elimitatedList = [];

  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i]);
  }

  while (queue.size() > 1) {
    // 循环队列，给定一个数字，然后迭代队列。从队列开头移除一项，再将其添加到队列末尾，模拟击鼓传花。
    // 一旦达到给定的传递次数，拿着花的那个人就被淘汰了。（从队列中移除）
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }
    elimitatedList.push(queue.dequeue());
  }
  return {
    elimitated: elimitatedList,
    winner: queue.dequeue()
  }
}
```

### 优先队列

元素的添加和移除是基于优先级的。一个现实的例子就是机场登机的顺序。头等舱和商务舱的乘客的优先级要高于经济舱乘客。另一个现实中的例子是医院的（急诊科）候诊室，医生会优先处理病情比较严重的患者。通常，护士会鉴别分类，根据患者病情的严重程度放号。

实现一个优先队列，有两种选项：设置优先级，然后在正确的位置添加元素；或者用入列操作添加元素，然后按照优先优先级移除它们。

```js
function PriorityQueue() {
  const items = [];
  // 特殊的 priority 元素
  function QueueElement (element, priority) { 
    this.element = element;
    this.priority = priority; // 优先级
  }

  this.enqueue = function(element, priority) {
    var queueElement = new QueueElement(element, priority);

    if (this.isEmpty()) {
      // 如果队列为空，可以直接入列  
      items.push(queueElement);
    } else {
      let added = false;
      for (let i = 0; i < items.length; i++) {
        if (queueElement.priority < items[i].priority) { // 判断优先级再入列
          items.splice(i, 0, queueElement);
          added = true;
          break;
        }
      }
      if (!added) {
        items.push(queueElement);
      }
    }
  }
  // 其他方法类似
}

// 使用
let priorityQueue = new PriorityQueue();
priorityQueue.enqueue("Jecyu", 2)
priorityQueue.enqueue("Crazy", 1)
priorityQueue.enqueue("Linjy", 1)
```

### JavaScript 任务队列

<u>当我们在浏览器中打开标签时，就会创建一个任务队列。</u>这是因为每个标签都是单线程处理所有的任务，成为事件循环。浏览器要负责多个任务，如渲染 HTML、执行 JavaScript 代码、处理用户交互（用户输入、鼠标点击等）、执行和处理异步请求。具体后面浏览器章节会详细蛇戒。

## 小结

这一节我们学习了队列这种数据结构。我们实现了自己的队列算法，学习了两种非常著名的特殊队列的实现：优先队列和循环队列，以及最后与事件循环息息相关的 JavaScript 任务队列，与事件循环相关的数据结构栈和队列基本结束。下一章，我们将会说说CPU层面的运作，进程与线程、异步同步等知识。