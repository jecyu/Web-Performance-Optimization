/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-07-21 13:35:50
 * @LastEditTime: 2020-10-22 11:29:13
 * @LastEditors: Jecyu
 */

const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");
const path = require("path");

// converts string to object
// Cookie is as string type such as `name=Jecyu;year=1994` and we need to convert this to object type such as {name: 'Jecyu', year: '1994'}
const parseCookies = (cookie = "") =>
  cookie
    .split(";")
    .map((v) => v.split("="))
    .map(([k, ...vs]) => [k, vs.join("=")])
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

const app = http.createServer((req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  if (req.url.startsWith("/login")) {
    // if the url start with `/login`
    const { query } = url.parse(req.url); // analyze url
    const { name } = qs.parse(query);
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 1); // we set the cookie that expires in 1 minute
    res.writeHead(302, {
      Location: "/",
      "Set-Cookie": `name=${encodeURIComponent(
        name
      )};Expires=${expires.toUTCString()};HttpOnly;Path=/`,
    });
    res.end();
  } else if (cookies.name) {
    // if the url start with `/` and has the cookie
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`Welcome ${cookies.name}`);
  } else {
    fs.readFile(path.join(__dirname, "./public/login.html"), (err, data) => {
      // relative path should be written like this `path.join(__dirname, "./login.html")` rather than './login.html' https://stackoverflow.com/questions/40678995/relative-path-readfile-error-enoent-no-such-file
      if (err) {
        throw err;
      }
      res.end(data);
    });
  }
});

module.exports = app;
