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
    etag: false,
    lastModified: true,
    cacheControl: false, 
  })
);

const listener = app.listen(process.env.PORT, function() {
  console.log("Serving files on http://localhost:" + listener.address().port);
});
