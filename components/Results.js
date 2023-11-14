import recipePreview from "./recipePreview.js";

export default class Results 
{
    constructor (props)
    {
        this.props = {...this.props, ...props}

        document.querySelector ('.pagination').addEventListener ('click', function ({target})
        {
            if (target.closest ('.pagination__btn--prev'))
                this.prevPage ();
            else if (target.closest ('.pagination__btn--next'))
                this.nextPage ();
        }.bind (this))
    }

    resultsEl = document.querySelector ('.results');

    state = {
        currentPage: 1
    }
    props = { 
        results: [],
        currentRecipeId: 0
    }

    prevPage ()
    {
        this.state.currentPage -= 1;
        this.render ();
    }
    nextPage ()
    {
        this.state.currentPage += 1;
        this.render ();
    }

    render (currentRecipeId = 0)
    {
        const {currentPage } = this.state;
        const { results } = this.props;

        const totalPages = Math.ceil (results.length / 10);
        
        const endIndex = currentPage * 10;
        const startIndex = endIndex - 10;

        this.resultsEl.innerHTML = results.slice (startIndex, endIndex).map (recipe => recipePreview (recipe, this.props.currentRecipeId));
    
        this.resultsEl.addEventListener ('click', function ({target})
        {
            this.props.setCurrentRecipeId (target.closest ('.preview').dataset.id);
        }.bind(this));

        let paginationHTML = ``;

        if (currentPage > 1)
            paginationHTML += `
        <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
      </button>`

        if (currentPage < totalPages)
            paginationHTML += `
        <button class="btn--inline pagination__btn--next">
            <span>Page 3</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button> `

        
    }
}