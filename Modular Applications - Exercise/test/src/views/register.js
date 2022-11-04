import { html } from "../../node_modules/lit-html/lit-html.js"
import { register } from "../api/user.js"
import { createSubmitHandler } from "../util.js"

const registerTemplate = (onSubmit) => html`
<section id="login">
    <article>
        <h2>Login</h2>
        <form @submit=${onSubmit} id="loginForm">
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input type="submit" value="Login">
        </form>
    </article>
</section>
`

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)))
}

async function onSubmit(ctx, data, event) {
    await register(data.email, data.password)
    event.target.reset()
    ctx.page.redirect('/catalog')
}