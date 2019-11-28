/**
 * 迭代阶乘
 * @param {*} number 
 */
function factorialIterative(number) { 
  if (number < 0) return undefined;
  let total = 1;
  for (let n = number; n > 1; n--) {
    total = total * n;
  }
  return total;
}
console.log('factorialIterative(3) :', factorialIterative(3));

/**
 * 递归阶乘
 * @param {*} n 
 */
function factorial(n) {
  console.trace()
  if (n === 1 || n === 0) { // 基线条件
    return 1;
  }
  debugger;
  return n * factorial(n -1); // 递归调用
}
console.log('factorial(3) :', factorial(3));