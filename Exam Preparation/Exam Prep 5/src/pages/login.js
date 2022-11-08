
import { login } from "../services/requests.js"
import { html, verifyInput } from "../utils.js"


let template = (onSubmit) => html `
        <section id="login-page" class="auth">
            <form id="login" @submit=${onSubmit}>
                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Login</h1>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">
                    <label for="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password">
                    <input type="submit" class="btn submit" value="Login">
                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </div>
            </form>
        </section>
`


export function loginUser(ctx) {
    ctx.render(template(onSubmit))

    async function onSubmit(event){
        event.preventDefault()

        let formInfo = new FormData(event.target)

        if (!verifyInput(formInfo)) {
            return
        } else {
            let email = formInfo.get("email")
            let password = formInfo.get("password")

            await login(
                email, 
                password
            )

            event.target.clear
            ctx.nav()
            ctx.page.redirect("/")
        }
    }
}