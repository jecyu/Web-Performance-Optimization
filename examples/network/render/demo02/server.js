const Vue = require("vue");
// 创建一个express应用
const server = require("express")();
// 提取出renderer实例
const renderer = require("vue-server-renderer").createRenderer();

server.get("*", (req, res) => {
  // 编写Vue实例（虚拟DOM节点）
  const app = new Vue({
    data: {
      url: req.url,
    },
    // 编写模板HTML的内容
    template: `<div>访问的 URL 是： {{ url }}</div>`,
  });

  // renderToString 是把Vue实例转化为真实DOM的关键方法
  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end("Internal Server Error");
      return;
    }
    // 把渲染出来的真实DOM字符串插入HTML模板中
    res.end(
      `
      <!DOCTYPE html>
      <html lang="en">
        <meta charset="utf-8">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `,
      "utf-8"
    );
  });
});

server.listen(9000);
console.log("8080");
