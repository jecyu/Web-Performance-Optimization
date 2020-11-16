/*
 * @Author: Jecyu
 * @Date: 2020-11-11 22:44:19
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-16 02:03:44
 * @FilePath: /examples/cache/local/cacheStorage/demo01/public/sw.js
 * @Description:
 */
const cacheName = "WWW-EXAMPLE-COM-V2";
const filesToCache = [
  "/", // index.html
  "./main.js",
  "./styles.css",
  "./assets/logo.png",
];

// 安装事件
self.addEventListener("install", function(event) {
  event.waitUntil(
    // 存储
    caches.open(cacheName).then(function(cache) {
      console.info("[sw.js] cached all files");
      return cache.addAll(filesToCache);
    })
  );
});

caches.keys().then((r) => console.log(r));

// 
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cName) {
          if (cName !== cacheName) {
            return caches.delete(cName);
          }
        })
      );
    })
  );
});

// self.addEventListener("fetch", function(event) {
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       if (response) {
//         return response;
//       }
//       // not in cache, return from network
//       return fetch(event.request, { credentials: "include" });
//     })
//   );
// });

// 获取请求
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      } else {
        // clone request stream
        // as stream once cosumed, can not be used again
        const reqCopy = event.request.clone();
        return fetch(reqCopy, { credentials: "include" }) // reqCopy stream consumed
          .then(function(response) {
            // bad response
            // response.type !== 'basic' means third party origin request
            if (
              !response ||
              response.status !== 200 ||
              response.type !== "basic"
            ) {
              return response; // response stream comsumed
            }

            // clone response stream
            // as stream once comsumed, can not be used again
            const resCopy = response.clone();

            // ========= IN BACKGROUND ====== //
            caches.open(cacheName).then(function(cache) {
              return cache.put(reqCopy, resCopy); // reqCopy, resCopy streams consumed
            });
            // ============================= //
            return response; // response stream consumed
          });
      }
    })
  );
});
