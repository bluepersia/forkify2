import { baseUrl, apiKey } from '../utility.js';

export default class Search {
    constructor (props)
    {
        this.props = {...this.props, ...props};

        document.querySelector ('.search').addEventListener ('submit', this.handleSubmit.bind (this));
    }

    props = {
        setResults: () => {}
    }

    async handleSubmit (e)
    {
        e.preventDefault ();
        const formData = new FormData (e.target);

        const recipeName = formData.get ('name');
        try 
        {
            const res = await fetch (`${baseUrl}?search=${recipeName}&key=${apiKey}`);
            const data = await res.json ();

            this.props.setResults (data.data.recipes);

            if (!res.ok)
                throw Error ('Something went wrong. Oops!');

        }
        catch (err)
        {
            console.error (err);
        }
    }
}