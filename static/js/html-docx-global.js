
(function() {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/html-docx-js-fix@0.4.0/dist/html-docx.js";
  script.onload = () => {
    if (typeof htmlDocx !== "undefined") {
      window.htmlDocx = htmlDocx;
      console.log("✅ htmlDocx.asBlob cargado correctamente en window");
    } else {
      console.warn("❌ htmlDocx no está definido después de cargar el script");
    }
  };
  document.head.appendChild(script);
})();
