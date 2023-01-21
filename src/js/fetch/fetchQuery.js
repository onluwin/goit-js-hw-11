import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchQuery(query) {

    const options = `q=${query}&key=17568064-fe285d9450a7ecb893916a0ce&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
    const { data } = await axios.get(`?${options}`)
    return data;
}
