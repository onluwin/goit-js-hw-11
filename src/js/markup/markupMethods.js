import { refs } from "../refs";

function addMarkupToPage(markup) {
    refs.gallery.insertAdjacentHTML('beforeend', markup)
}
function resetMarkup() {
    refs.gallery.innerHTML = ''
}

export { addMarkupToPage, resetMarkup, }