import { html } from '../lib/lit-html.js'

const homeTemplate = () => html`
<h>Home page</h1>
<p>Welcome to our site!</p>`

export function homeView(ctx){
    ctx.render(homeTemplate())
}