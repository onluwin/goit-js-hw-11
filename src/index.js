import "./css/reset.css";
import "simplelightbox/dist/simple-lightbox.min.css";


import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";

import { refs } from "./js/refs";
import { fetchQuery } from "./js/fetch/fetchQuery";
import { createMarkup } from './js/markup/createMarkup'
import { addMarkupToPage, } from "./js/markup/markupMethods";

const { form, input, } = refs

const lightbox = new SimpleLightbox('.photo-card a', {
    captionType: 'attr',
    captionsData: 'alt',
    captionDelay: 250,
});

let query = ''
function onSubmitBtnClick(e) {
    e.preventDefault();
    query = input.value.trim()
    fetchQuery(query)
        .then(response => {
            lightbox.refresh();
            if (query === '') return Notify.failure('Type something');
            if (!response.hits.length > 0) {
                Notify.failure(`Ooops, there are no images with that query: ${query}`)
            }
            const markup = createMarkup(response.hits)
            addMarkupToPage(markup)
            
            form.reset()
        })
        .catch(console.log)
}



form.addEventListener('submit', onSubmitBtnClick)
