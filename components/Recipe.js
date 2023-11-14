import { baseUrl } from "../utility.js";

export default class Recipe 
{
    constructor (props)
    {
        this.props = {...this.props, ...props};
    }    

    state = {
        recipe: null
    }
    props = {
        currentRecipeId: 0,
        bookmark: () => {}
    }

    recipeEl = document.querySelector ('.recipe');

    setCurrentRecipeId (id)
    {
        this.props.currentRecipeId = id;

        this.fetchRecipeAndRender ();
    }

    async fetchRecipeAndRender ()
    {
        this.recipeEl.innerHTML = `<div class="spinner">
        <svg>
          <use href="src/img/icons.svg#icon-loader"></use>
        </svg>
      </div>`;


        try {
            const res = await fetch (`${baseUrl}/${this.props.currentRecipeId}`)
            
            if (!res.ok)
                throw Error ('Something went wrong');

            const data = await res.json ();

            const { recipe }  = data.data;

            recipe.ingredients = recipe.ingredients.map (ing => ing.quantity ? ing : ({...ing, quantity: 1}));

            this.state.recipe = recipe;

            this.render ();

        }catch (error)
        {
            console.error (error);
            this.recipeEl.innerHTML = `<div class="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>No recipes found for your query. Please try again!</p>
          </div> `
        }
    }

    render ()
    {
        const { title, image_url, cooking_time, servings, ingredients, publisher, source_url} = this.state.recipe;

        this.recipeEl.innerHTML =  `
            <figure class="recipe__fig">
            <img src="${image_url}" alt="Tomato" class="recipe__img" />
            <h1 class="recipe__title">
              <span>${title}</span>
            </h1>
          </figure>
  
          <div class="recipe__details">
            <div class="recipe__info">
            <i class="fa-regular fa-clock icon-left"></i>
              <span class="recipe__info-data recipe__info-data--minutes">${cooking_time.toFixed()}</span>
              <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
            <i class="fa-solid fa-users icon-left"></i>
              <span class="recipe__info-data recipe__info-data--people">${servings}</span>
              <span class="recipe__info-text">servings</span>
  
              <div class="recipe__info-buttons">
                ${this.state.recipe.servings > 1 ? `<button class="btn--tiny btn--decrease-servings">
                <i class="fa-solid fa-circle-minus servings-btn"></i>
                </button>` : ''}
                ${this.state.recipe.servings < 8 ? `<button class="btn--tiny btn--increase-servings">
                <i class="fa-solid fa-circle-plus servings-btn"></i>
                </button>` : ''}
              </div>
            </div>
  
            <div class="recipe__user-generated">
            <i class="fa-regular fa-user main-user-icon"></i>
            </div>
            <button class="btn--round bookmark-btn">
            <i class="fa-solid fa-bookmark bookmark-icon"></i>
            </button>
          </div>
  
          <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
            ${ingredients.map (ing => `
            <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="src/img/icons.svg#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ing.quantity}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
                </div>
              </li>
              `).join ('')}
              <
            </ul>
          </div>
  
          <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span class="recipe__publisher">${publisher}</span>. Please check out
              directions at their website.
            </p>
            <a
              class="btn--small recipe__btn"
              href="${source_url}"
              target="_blank"
            >
              <span>Directions</span>
              <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-right"></use>
              </svg>
            </a>
          </div>`;


          document.querySelector ('.recipe__info-buttons').addEventListener ('click', function ({target})
          {
            if (target.closest ('.btn--decrease-servings'))
                this.decreaseServing ();
            else 
                this.increaseServing ();

          }.bind (this));

          document.querySelector ('.bookmark-btn').addEventListener ('click', function ()
          {
            this.props.bookmark (this.state.recipe);
          }.bind (this))
    }

    setServing (val)
    {
        const multiplier = val / this.state.recipe.servings;
        this.state.recipe.cooking_time *= multiplier;
        this.state.recipe.ingredients = this.state.recipe.ingredients.map (ing => ({...ing, quantity: ing.quantity * multiplier}));
        this.state.recipe.servings = val;
        this.render ();
    }
    increaseServing ()
    {
        this.setServing (this.state.recipe.servings + 1);
    }
    decreaseServing ()
    {
        this.setServing (this.state.recipe.servings - 1);
    }
}