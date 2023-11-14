import Search from './components/Search.js';
import Results from './components/Results.js';
import Recipe from './components/Recipe.js';
import Bookmarks from './components/Bookmarks.js';

class App 
{
    search = new Search ({setResults: this.setResults.bind (this)});
    results = new Results ({setCurrentRecipeId:this.setCurrentRecipeId.bind(this)});
    recipe = new Recipe ({bookmark:this.bookmark.bind (this)});
    bookmarks = new Bookmarks ({setCurrentRecipeId:this.setCurrentRecipeId.bind(this)});

    state = {
        currentRecipeId: 0,
        bookmarks: []
    }

    bookmark (recipe)
    {
        if (this.state.bookmarks.find (bookmark => bookmark.id == recipe.id))
            this.state.bookmarks = this.state.bookmarks.filter (bookmark => bookmark.id != recipe.id);
        else 
            this.state.bookmarks = [...this.state.bookmarks, recipe];
        
        this.bookmarks.props.bookmarks = this.state.bookmarks;
        this.bookmarks.render ();
    }

    setCurrentRecipeId (id)
    {
        this.state.currentRecipeId = id;

        this.results.props.currentRecipeId = id;
        this.results.render ();

        this.bookmarks.props.currentRecipeId = id;
        this.bookmarks.render ();

        this.recipe.setCurrentRecipeId (id);
    }

    setResults (results)
    {
        this.results.props.results = results;
        this.results.render ();
    }
}

new App ();