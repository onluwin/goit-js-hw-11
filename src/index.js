import "./css/reset.css";

import { refs } from "./js/refs";
import { fetchQuery } from "./js/fetch/fetchQuery";
import { createMarkup } from './js/markup/createMarkup'

const { form, input, gallery } = refs

let query = ''
function onSubmitBtnClick(e) {
    e.preventDefault()
    query = input.value
    fetchQuery(query)
        .then(r => {
            console.log(r.hits);
            console.log(createMarkup(r.hits));
            gallery.innerHTML = createMarkup(r.hits)
        })
        .catch(console.log)
}



form.addEventListener('submit', onSubmitBtnClick)