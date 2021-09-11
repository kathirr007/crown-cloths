const loadFonts = (fontsArray) => {
  document.querySelectorAll("style[name]").forEach((elem) => elem.remove());
  fontsArray.forEach((font) => {
    fetch(font.url)
      .then((response) => response.text())
      .then((data) => {
        let headEl = document.querySelector("head");
        let styleEl = document.createElement("style");
        styleEl.setAttribute("type", "text/css");
        styleEl.setAttribute("name", font.name);
        styleEl.textContent = data;
        headEl.appendChild(styleEl);
      });
  });
};

module.exports = {
  loadFonts,
};
