import { refs } from "./refs";

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    refs.onTopBtn.style.display = "block";
  } else {
    refs.onTopBtn.style.display = "none";
  }
}

function topFunction() {
    document.body.scrollTop = 0; // Для Safari
    document.documentElement.scrollTop = 0; // Для Chrome, Firefox, IE и Opera
}

export {scrollFunction, topFunction,}