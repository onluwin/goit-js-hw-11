import { refs } from "../refs";
import throttle from "lodash.throttle"

function hideTopBtn() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    refs.onTopBtn.style.display = "block";
  } else {
    refs.onTopBtn.style.display = "none";
  }
}
function onToTopBtnClick() {
    document.body.scrollTop = 0; // Для Safari
    document.documentElement.scrollTop = 0; // Для Chrome, Firefox, IE и Opera
}

const throttledHideTopBtn = throttle(hideTopBtn, 300)

export { throttledHideTopBtn, onToTopBtnClick, }
