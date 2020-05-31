/*
 * @Description: 尝试使用不同的 DOM API
 * @Author: Jecyu
 * @Date: 2020-05-30 18:22:25
 * @LastEditTime: 2020-05-30 18:24:20
 * @LastEditors: Jecyu
 */ 

/**
 * @description: 创建空元素的方法
 * @param {type} 
 * @return: 
 */
var createEmptyElements = function(count) {
  var start = new Date();
  for (var i = 0; i < count; i++) {
    var element = document.createElement("div");
    document.body.appendChild(element);
  }
  setTimeout(() => {
    alert(new Date() - start);
  }, 0);
};


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

/**
 * @description: 使用 DocumnetFragment
 * @param {type} 
 * @return: 
 */ 
var createElements = function(count) {
  var start = new Date();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < count; i++) {
    var element = document.createElement("div");
    element.appendChild(document.createTextNode("" + i));
    fragment.appendChild(element);
  }
  document.body.appendChild(element);
  setTimeout(() => {
    alert(new Date() - start);
  }, 0);
};

// /**
//  * @description: 使用 innerHTML
//  * @param {type} 
//  * @return: 
//  */ 
// var createElements = function(count) {
//   var start = new Date();
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < count; i++) {
//     var element = document.createElement("div");
//     element.appendChild(document.createTextNode("" + i));
//     fragment.appendChild(element);
//   }
//   document.body.appendChild(element);
//   setTimeout(() => {
//     alert(new Date() - start);
//   }, 0);
// };