const { Queue } = PackDataStructuresAlogrithms;
const queue = new Queue();
// 添加一些元素
queue.enqueue('Jecyu');
queue.enqueue('Crazy');
console.log('queue :', queue.toString());
// 添加另一个元素
queue.enqueue('Linjy')
// 再执行其他的命令
console.log('queue.toString() :', queue.toString());
console.log('queue.size() :', queue.size());
console.log('queue.isEmpty() :', queue.isEmpty());
console.log('移除两个元素')
queue.dequeue();
queue.dequeue();
console.log('queue.toString() :', queue.toString());