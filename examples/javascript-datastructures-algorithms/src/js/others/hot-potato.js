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