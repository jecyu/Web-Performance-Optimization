// Copyright 2018 Google LLC.
// SPDX-License-Identifier: Apache-2.0

const express = require("express");
const app = express();

app.use(function(req, res, next) {
  console.log(`request url: ${req.url}`);
  next();
});

app.use(
  express.static("public", {
    etag: true,
    lastModified: false,
    cacheControl: false, 
    setHeaders: (res, path) => {
      // res.setHeader("Cache-Control", "no-cache");
      // res.setHeader("Cache-Control", "no-store");
      // res.setHeader("Cache-Control", "no-cahce, max-age=60");

      // res.setHeader("Cache-Control", "public, max-age=60");
      // const hashRegExp = new RegExp("\\.[0-9a-f]{8}\\.");
      // if (path.endsWith(".html")) {
      // } else if (hashRegExp.test(path)) {
      //   res.setHeader("Cache-Control", "max-age=10");
      // }
    },
  })
);

const listener = app.listen(process.env.PORT, function() {
  console.log("Serving files on http://localhost:" + listener.address().port);
});
