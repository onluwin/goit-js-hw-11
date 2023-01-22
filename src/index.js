import "./css/reset.css";
import "simplelightbox/dist/simple-lightbox.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";

import { refs } from "./js/refs";
import { PixabayAPI } from "./js/FetchAPI";
import { MarkupAPI } from "./js/Markup";
import { smoothScroll } from "./js/scroll/smooth-scroll";
import { onToTopBtnClick, throttledHideTopBtn, } from "./js/scroll/scrollBtn";

const { form, input, loadMoreBtn, onTopBtn } = refs;

const lightbox = new SimpleLightbox('.photo-card a');
const FetchAPI = new PixabayAPI()
const Markup = new MarkupAPI()

initPage()

let query = ''
let lowerCasedQuery = ''

window.onscroll = throttledHideTopBtn;

// --------OBSERVER--------- //

const options = {
    root: null,
    rootMargin: '100px',
    threshold: 1.0
}

let target = null;

const callback = function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            try {
                io.unobserve(entry.target)
                FetchAPI.fetchQuery(FetchAPI.query)
                    .then(({ hits, total, totalHits }) => {
                        if (!FetchAPI.isShowLoadMore) {
                            io.unobserve(entry.target)
                            Notify.info("We're sorry, but you've reached the end of search results.")
                            return;
                        }
                        FetchAPI.incrementPage()
                        const markup = Markup.createMarkup(hits)
                        Markup.addMarkupToPage(markup)
                        smoothScroll();
                        lightbox.refresh();
                        target = document.querySelector('.photo-card:last-child');
                        io.observe(target)

                    })
                    .catch(console.log)
                
                
            } catch (error) {
                console.log(error)
            }
        }
    });
};
const io = new IntersectionObserver(callback, options);

function onSubmitBtnClick(e) {
    e.preventDefault();

    query = input.value.trim()
    lowerCasedQuery = query.toLowerCase();
    FetchAPI.resetPage()

    try {
        FetchAPI.fetchQuery(query)
            .then(({ hits, total, totalHits }) => {
            
            Markup.resetMarkup()
            // FetchAPI.removeLoadMoreBtn()
            console.log({ hits, total, totalHits });
            if (query === '') return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            if (hits.length === 0) return Notify.failure(`Ooops, there are no images with that query: ${query}`);
            Notify.success(`Hooray! We found ${totalHits} images.`)
            
            const markup = Markup.createMarkup(hits)
            Markup.addMarkupToPage(markup)
            
            
            
            FetchAPI.calculateTotalPages(total)
            if (FetchAPI.isShowLoadMore) {
                // FetchAPI.addLoadMoreBtn();
                target = document.querySelector('.photo-card:last-child');
                setTimeout(() => {
                    io.observe(target)
                }, 500);
            }
            FetchAPI.incrementPage()
            
            lightbox.refresh();
            form.reset()
        })
        .catch(console.log)
    } catch(error) {console.log(error)}
} 

function onLoadMoreBtnClick() {
    FetchAPI.fetchQuery(query)
        .then(({ hits, total, totalHits }) => {
            // FetchAPI.calculateTotalPages(total)
            // if (!FetchAPI.isShowLoadMore) {
            //     FetchAPI.removeLoadMoreBtn();
            //     target = document.querySelector('.photo-card:last-child');
            //     io.unobserve(target)
            //     return
            // }
            // FetchAPI.incrementPage()
            
            // const markup = Markup.createMarkup(hits)
            // Markup.addMarkupToPage(markup)
            // smoothScroll()
            
            // lightbox.refresh();

        })
        .catch(console.log);
}

function initPage () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


// loadMoreBtn.addEventListener('click', onLoadMoreBtnClick)
form.addEventListener('submit', onSubmitBtnClick)
onTopBtn.addEventListener('click', onToTopBtnClick)