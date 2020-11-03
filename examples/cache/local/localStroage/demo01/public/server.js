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
    setHeaders: (res, path) => {},
  })
);

// 动态请求
// app.use("/", (req, res, next) => {
//   next();
// });

const listener = app.listen(process.env.PORT, () => {
  console.log("Serving files on http://localhost:" + listener.address().port);
});
