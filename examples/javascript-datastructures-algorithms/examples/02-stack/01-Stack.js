const { Stack } = PackDataStructuresAlogrithms;
const stack = new Stack() // new stack-array
console.log('检查栈是否为空', stack.isEmpty())
// 添加一些元素
stack.push(5)
stack.push(8)
console.log('插入5,8，stack：', stack.toString());
console.log('输出栈顶的元素', stack.peek());

// 再添加一个元素
stack.push(11)
console.log('插入11，stack：', stack.toString());
console.log('输出栈的大小', stack.size());
console.log('检查栈是否为空', stack.isEmpty())
stack.push(15)
console.log('插入15，stack：', stack.toString());

// // 移除两个元素
console.log('移除两个元素', stack.size());
stack.pop()
stack.pop()
console.log('输出栈的大小', stack.size(), stack.toString());

