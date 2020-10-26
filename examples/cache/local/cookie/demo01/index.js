/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-07-21 13:28:04
 * @LastEditTime: 2020-10-22 11:31:10
 * @LastEditors: Jecyu
 */ 
const app = require("./app");
const listener = app.listen(process.env.PORT, () => {
  console.log("Serving files on http://localhost:" + listener.address().port);
});
