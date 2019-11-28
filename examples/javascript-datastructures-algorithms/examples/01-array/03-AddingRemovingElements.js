let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log('原数组', numbers);

/**************** 添加元素 */
// 在数组末尾插入元素 
numbers[numbers.length] = 10;
console.log('在数组末尾插入10', numbers)

numbers.push(11);
console.log('在数组末尾插入11', numbers)

numbers.push(12, 13); // 任意个
console.log('在数组末尾插入12, 13', numbers)

// 在数组开头插入元素 
Array.prototype.insertFirstPosition = function(value) {
  for (let i = this.length; i >= 0; i--) {  // 腾出数组的第一个元素，把所有的元素向右移动一位。
    this[i] = this[i - 1];
  }
  this[0] = value;
}
numbers.insertFirstPosition(-1);
console.log('在数组开头插入-1', numbers)

numbers.unshift(-2)
console.log('在数组开头插入-2', numbers)
numbers.unshift(-3,-4)
console.log('在数组开头插入-2, -3', numbers)

/**************** 删除元素 */

// 从数组末尾删除元素

numbers.pop();
console.log('在数组末尾删除一个元素', numbers)

// 从数组开头删除元素
Array.prototype.reIndex = function(myArray) {
  const newArray = [];
  for(let i = 0; i < myArray.length; i++) {
    if (myArray[i] !== undefined) {
      newArray.push(myArray[i])
    }
  }
  return newArray;
}
// 手动一处第一个元素并重新排序
Array.prototype.removeFirstPosition = function() {
  for (let i = 0; i < numbers.length; i++) { // 所有元素右移一位后，剔除 undefined
    numbers[i] = numbers[i + 1]
  }
  return this.reIndex(this);
}
numbers = numbers.removeFirstPosition();
console.log('在数组开头删除一个元素', numbers)

numbers.shift();
console.log('在数组开头删除一个元素', numbers)

