// 测试浏览器的栈溢出错误，即超过最大调用栈
let i = 0;
function recursiveFn() {
  i++;
  recursiveFn();
}
try {
  recursiveFn();
} catch (ex) {
  console.log('i = ' + i + 'error: ' + ex);
}
