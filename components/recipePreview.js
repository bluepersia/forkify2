export default function (recipe, currentRecipeId = 0)
{
    return `<li class="preview" data-id="${recipe.id}">
    <a class="preview__link ${currentRecipeId == recipe.id && "preview__link--active"}" href="#23456">
      <figure class="preview__fig">
        <img src="${recipe.image_url}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${recipe.title}</h4>
        <p class="preview__publisher">${recipe.publisher}</p>
        <div class="preview__user-generated">
          <svg>
            <use href="./src/img/icons.svg#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>`;
}