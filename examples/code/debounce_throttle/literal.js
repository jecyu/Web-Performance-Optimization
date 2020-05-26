/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-05-13 22:58:39
 * @LastEditTime: 2020-05-13 23:04:01
 * @LastEditors: Jecyu
 */

console.time("试验1");
for (let i = 0; i < 10000; i++) {
  const a = {};
}
console.timeEnd("试验1"); // 0.658203125ms

console.time("试验2");
for (let i = 0; i < 10000; i++) {
  const a = new Object();
}
console.timeEnd("试验2"); // 1.0947265625ms
