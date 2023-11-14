import recipePreview from "./recipePreview.js"

export default class Bookmarks {

    constructor (props)
    {
        this.props = {...this.props, ...props};

        this.bookmarksEl.addEventListener ('click', function ({target})
        {
            const preview = target.closest ('.preview');
            if (preview)
                this.props.setCurrentRecipeId (preview.dataset.id);
            
        }.bind(this));
    }
    props = {
        bookmarks: [],
        currentRecipeId: 0,
        setCurrentRecipeId: () => {}
    }

    bookmarksEl = document.querySelector (".bookmarks__list");

    render ()
    {
        if (this.props.bookmarks.length <= 0)
        return;

       this.bookmarksEl.innerHTML = this.props.bookmarks.map (recipe => recipePreview (recipe, this.props.currentRecipeId)).join ('')
        
        
    }

}