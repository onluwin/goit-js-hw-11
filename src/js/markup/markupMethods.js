import { refs } from "../refs";

function addMarkupToPage(markup) {
    refs.gallery.insertAdjacentHTML('afterbegin', markup)
}


export { addMarkupToPage, }