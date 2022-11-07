import { login } from '../api/users.js'
import { html } from '../lib/lit-html.js'
import { bindForm } from '../util.js'


const loginTemplate = (onSubmit) => html`
<h1>Login</h1>
<form @submit=${onSubmit}>
    <label><span>Username:</span><input type="text" name"username"</label>
    <label><span>Password:</span><input type="password" name"password"</label>
    <button>Login</button>
</form>`

export function loginView(ctx) {
    ctx.render(loginTemplate(bindForm(onSubmit)))

    async function onSubmit({ username, password }){
        await login(username,password)
        ctx.page.redirect('/')
    }
}