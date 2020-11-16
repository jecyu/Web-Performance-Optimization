
const DOCUMENT_ROOT = "./public";
const DIRECTORY_INDEX = "/index.html";

const http = require("http");
const path = require("path");
const fs = require("fs");
const mime = require("mime");

const app = http
  .createServer(function(request, response) {
    // Remove query strings from uri
    if (request.url.indexOf("?") > -1) {
      request.url = request.url.substr(0, request.url.indexOf("?"));
    }
    console.log(`[request]: ${request.url}`)

    // Remove query strings from uri
    if (request.url == "/") {
      request.url = DIRECTORY_INDEX;
    }
    const filePath = DOCUMENT_ROOT + request.url;

    const extname = path.extname(filePath);
    // 定义Expires规则
    // const Expires = {
    //   fileMatch: /(gif|png|jpg|js|css)$/gi,
    //   // maxAge: 60 * 60 * 24 * 365 
    //   maxAge: 60 * 5, // 5min
    // };

    const ifModifiedSince = request.headers["if-modified-since"];

    fs.exists(filePath, function(exists) {
      if (exists) {
        fs.readFile(filePath, function(error, content) {
          if (error) {
            response.writeHead(500);
            response.end();
          } else {
            const raw = fs.createReadStream(filePath);
            // 获取实际文件的修改时间，进行对比
            const stat = fs.statSync(filePath);
            const lastModified = stat.mtime.toUTCString();
            response.setHeader("Last-Modified", lastModified);

            if (ifModifiedSince && lastModified === ifModifiedSince) {
              response.writeHead(304, "Not Modified");
              response.end();
            } else {
              // 正常写文件
              response.writeHead(200, {
                "Content-Type": mime.getType(extname),
              });
              raw.pipe(response);
            }
          }
        });
      } else {
        response.writeHead(404);
        response.end();
      }
    });
  })
  
const listener = app.listen(process.env.PORT);
console.log("Serving files on http://localhost:" + listener.address().port);
