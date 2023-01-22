import { refs } from "./refs";

export class MarkupAPI {

    createMarkup(data) {
        let markup = ``;
        data.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => {
        markup += `<div class="photo-card"><a href="${largeImageURL}" class="photo__link-img"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a><div class="info"><p class="info-item"><b>Likes ${likes}</b></p><p class="info-item">  <b>Views ${views}</b></p><p class="info-item">  <b>Comments ${comments}</b></p><p class="info-item">  <b>Downloads ${downloads}</b></p></div></div>`
        })
        .join('');
        return markup;
    }
    
    addMarkupToPage(markup) {
        refs.gallery.insertAdjacentHTML('beforeend', markup)
    }
    resetMarkup() {
        refs.gallery.innerHTML = '';
    }
}