// Copyright 2018 Google LLC.
// SPDX-License-Identifier: Apache-2.0

const express = require("express");
const app = express();

app.use(
  express.static("public", {
    etag: true,
    lastModified: true,
    cacheControl: true,
    setHeaders: (res, path) => {
      const hashRegExp = new RegExp("\\.[0-9a-f]{8}\\.");
      if (path.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache");
      } else if (hashRegExp.test(path)) {
        res.setHeader("Cache-Control", "max-age=10");
      }
    },
  })
);

const listener = app.listen(process.env.PORT, function() {
  console.log("Your server is running on http://localhost:" + listener.address().port);
});
