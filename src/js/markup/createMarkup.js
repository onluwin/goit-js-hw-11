export function createMarkup(data) {
    let markup = ``;
  data.map(card => {
    markup += `<div class="photo-card"><a href="${card.largeImageURL}" class="photo__link-img"><img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" /></a><div class="info"><p class="info-item"><b>Likes ${card.likes}</b></p><p class="info-item">  <b>Views ${card.views}</b></p><p class="info-item">  <b>Comments ${card.comments}</b></p><p class="info-item">  <b>Downloads ${card.downloads}</b></p></div></div>`
    }
  ).join('');
  return markup;
}

// <div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>