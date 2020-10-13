function getComponent() {
  // 这里的注释会被 webpack 自动识别处理
  return import(/* webpackChunkName: "lodash" */ "lodash")
    .then(({ default: _ }) => {
      const element = document.createElement("div");

      element.innerHTML = _.join(["Hello", "webpack"], " ");

      return element;
    })
    .catch((error) => "An error occurred while loading the component");
}

window.document.getElementById("btn").addEventListener("click", () => {
  console.log(666);
  getComponent().then((component) => {
    document.body.appendChild(component);
  });
});
