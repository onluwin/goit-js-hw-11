import axios from "axios";

import { refs } from "./refs";

axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['Authorization'] = 'Client-ID 17568064-fe285d9450a7ecb893916a0ce' // НЕ РАБОТАЕТ axios Error by CORS;

export class PixabayAPI {
    #page = 1; 
    #totalPages = 0;
    #per_page = 40;
    query = ''
    

    async fetchQuery(query) {
        this.query = query;
        const options = `q=${query}&key=17568064-fe285d9450a7ecb893916a0ce&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.#per_page}&page=${this.#page}`
        const { data } = await axios.get(`?${options}`)
        return data;
    }
    incrementPage() {
        this.#page += 1;
    }
    addLoadMoreBtn() {
        refs.loadMoreBtn.classList.remove('is-hidden')
    }
    removeLoadMoreBtn() {
        refs.loadMoreBtn.classList.add('is-hidden')
    }
    calculateTotalPages(total) {
        this.#totalPages = Math.ceil(total / this.#per_page)
    }
    get isShowLoadMore() {
        return this.#page < this.#totalPages
    }
    resetPage() {
        this.#page = 1;
    }
}
