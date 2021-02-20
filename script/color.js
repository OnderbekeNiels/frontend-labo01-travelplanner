const listenToSlider = () => {
  const slider = document.querySelector(".js-color-slider");
  slider.addEventListener("input", function () {
    console.log("event got triggerd");
    document.documentElement.style.setProperty("--theme-color-hue", this.value);
  });

  //! past niet aan ? 
//   let amount = 0;
//   setInterval(function () {
//     if (amount >= 360) {
//       amount = 0;
//     }
//     amount += 10;
//     slider.value = amount;
//   }, 300);
};

document.addEventListener("DOMContentLoaded", function () {
  listenToSlider();
});
