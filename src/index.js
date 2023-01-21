import "./css/reset.css";
import "simplelightbox/dist/simple-lightbox.min.css";


import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";

import { refs } from "./js/refs";
import { pixabayAPI } from "./js/fetch/fetchAPI";
import { createMarkup } from './js/markup/createMarkup'
import { addMarkupToPage, resetMarkup, } from "./js/markup/markupMethods";
import { smoothScroll } from "./js/smooth-scroll";
import { scrollFunction, topFunction, } from "./js/scrollBtn";

const { form, input, loadMoreBtn, onTopBtn } = refs

const lightbox = new SimpleLightbox('.photo-card a');
const fetchAPI = new pixabayAPI()

initPage()

let query = ''
let lowerCasedQuery = ''

window.onscroll = function() {scrollFunction()};

function onSubmitBtnClick(e) {
    e.preventDefault();

    query = input.value.trim()
    lowerCasedQuery = query.toLowerCase();

    fetchAPI.resetPage()

    fetchAPI.fetchQuery(query)
        .then(({ hits, total, totalHits }) => {
            resetMarkup()
            fetchAPI.removeLoadMoreBtn()
            console.log({ hits, total, totalHits });
            if (query === '') return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            if (hits.length === 0) return Notify.failure(`Ooops, there are no images with that query: ${query}`);
            Notify.success(`Hooray! We found ${totalHits} images.`)
            
            const markup = createMarkup(hits)
            addMarkupToPage(markup)
            fetchAPI.calculateTotalPages(total)
            if (fetchAPI.isShowLoadMore) {
                fetchAPI.addLoadMoreBtn();
            }
            fetchAPI.incrementPage()
            
            lightbox.refresh();
            form.reset()
        })
        .catch(console.log)
}

function onLoadMoreBtnClick() {
    fetchAPI.fetchQuery(query)
        .then(({ hits, total, totalHits }) => {
            fetchAPI.calculateTotalPages(total)
            if (!fetchAPI.isShowLoadMore) {
                fetchAPI.removeLoadMoreBtn();
                Notify.info("We're sorry, but you've reached the end of search results.")
            }
            fetchAPI.incrementPage()
            
            const markup = createMarkup(hits)
            addMarkupToPage(markup)
            smoothScroll()
            
            lightbox.refresh();

        })
        .catch(console.log);
}

function initPage () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

form.addEventListener('submit', onSubmitBtnClick)
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick)
onTopBtn.addEventListener('click', topFunction)