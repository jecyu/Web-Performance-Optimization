 // 尝试获取 container 元素
 var container = document.getElementById('container');
 console.log('container :', container);
 // 输出 container 元素此刻的背景色
 console.log('container bgColor', getComputedStyle(container).backgroundColor);