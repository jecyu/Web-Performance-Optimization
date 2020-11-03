const express = require("express");
const app = express();

app.use(function(req, res, next) {
  console.log(`request url: ${req.url}`);
  next();
});

// 静态资源
app.use(
  express.static("public", {
    etag: true,
    lastModified: true,
    cacheControl: false,
    setHeaders: (res, path) => {
      //设置 Cookie 过期时间
      // res.setHeader("Set-Cookie", ["username=Jecyu;max-age=0", "job=web development"]);
      // res.setHeader("Set-Cookie", ["username=Jecyu;max-age=5", "job=web development"]);
      res.setHeader("Set-Cookie", [
        // 一定是同域（当前）之间的访问，不能把 domain 的值设置成非主域的域名。
        "username=Jecyu;domain=baidu.com;path=/",
        "job=web development;httpOnly=true;",
        "age=26;",
      ]);
    },
  })
);

// 动态请求
// app.use("/", (req, res, next) => {
//   next();
// });

const listener = app.listen(process.env.PORT, () => {
  console.log("Serving files on http://localhost:" + listener.address().port);
});
