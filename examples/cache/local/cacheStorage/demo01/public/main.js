/*
 * @Author: Jecyu
 * @Date: 2020-11-11 22:44:13
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-11 23:04:15
 * @FilePath: /examples/16-worker/service-worker/base/demo03/main.js
 * @Description:
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("./sw.js")
      .then(function(registration) {
        console.log(
          "Service successfully registered on scope",
          registration.scope
        );
      })
      .catch(function(error) {
        console.log("Service worker failed to register", error );
      });
  });
}
