import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllBooks, searchBooks } from "../api/data.js"
import { bookPreview } from "./common.js"

let searchTemplate = (books, onSubmit, params = '') => html`
<section id="search-page" class="dashboard">
    <h1>Search</h1>
    <from @submit=${onSubmit}>
        <input type="text" name="search" value=${params}>
        <input type="submit" value=Search>
        </from>

        ${books.length == 0
        ? html`<p class="no-books">No results!</p>`
        : html`<ul class="other-books-list">${books.map(bookPreview)}</ul>`} 
</section>
`

export async function searchPage(ctx) {
    let params = ctx.querystring.split('=')[1]
    let books = []

    if (params) {
        books = await searchBooks(decodeURIComponent(params))
    } else {
        books = await getAllBooks()
    }
    ctx.render(searchTemplate(books, onSubmit, params))

    function onSubmit(event) {
        event.preventDefault()
        let formData = new FormData(event.target)
        let search = formData.get('search')

        if (search) {
            ctx.page.redirect('/search?query=' + encodeURIComponent(search))
        }
    }
}