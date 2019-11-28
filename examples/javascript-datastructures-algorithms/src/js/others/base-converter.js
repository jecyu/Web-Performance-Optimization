import Stack from "../data-structures/stack"
/**
 * 把十进制转换成基数为 2～36 的任意进制。
 * @param {*} decNumber 十进制
 * @param {*} base 基数
 */
export function decimalToBinary(decNumber, base) {
  const remStack = new Stack();
  let number = decNumber; // 十进制数字
  let rem; // 余数
  let binaryString = '';

  while (number > 0) {
    // 当结果不为0，获得一个余数
    rem = Math.floor(number % base); 
    remStack.push(rem); // 入栈
    number = Math.floor(number / base);
  }

  while(!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }
  return binaryString;
}