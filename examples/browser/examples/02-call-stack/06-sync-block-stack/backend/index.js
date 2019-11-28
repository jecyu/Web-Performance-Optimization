const http = require("http");
const PORT = 8088;

// 创建一个 http 服务
const userNames = ['Jecyu', 'Crazy'];
const server = http.createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "PUT"); // 预请求时，增加除了GET，POST返回允许实际请求的方法
  setTimeout(() => { // 模拟时间
    response.end(JSON.stringify(userNames));
  }, 5000);
});

// 启动服务，监听端口
server.listen(PORT, () => {
  console.log("服务启动成功，正在监听: ", PORT);
});
