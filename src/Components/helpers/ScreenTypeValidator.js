function ScreenTypeValidator(setter) {
  if (window.matchMedia("(pointer: coarse)").matches) {
    // touchscreen
    console.log("Touch screen");
    setter(true);
  } else {
    console.log("PC");
    setter(false);
  }
}
export default ScreenTypeValidator;
