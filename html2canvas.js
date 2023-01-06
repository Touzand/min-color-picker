const table = document.querySelector("table");
const div = document.querySelector("div");
const boton = document.getElementById("imagen");

boton.addEventListener("click", (e) => {
  domtoimage
    .toPng(document.getElementById("result"), { quality: 0.95 })
    .then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "my-image-name.jpeg";
      link.href = dataUrl;
      link.click();
    });
});
