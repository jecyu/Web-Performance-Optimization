/*
 * @Description: 完整渲染长列表
 * @Author: Jecyu
 * @Date: 2020-05-30 17:14:01
 * @LastEditTime: 2020-05-30 18:25:01
 * @LastEditors: Jecyu
 */
/**
 * @description: 创建带文本元素
 * @param {type} 
 * @return: 
 */ 
var createElements = function(count) {
  var start = new Date();
  for (var i = 0; i < count; i++) {
    var element = document.createElement("div");
    element.appendChild(document.createTextNode("" + i));
    document.body.appendChild(element);
  }
  setTimeout(() => {
    alert(new Date() - start);
  }, 0);
};

document.querySelector("#btn").addEventListener(
  "click",
  createElements.bind(this, 10000),
  false
);
