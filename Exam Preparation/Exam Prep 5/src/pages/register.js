
import { register } from "../services/requests.js"
import { html, verifyInput } from "../utils.js"


let template = (onSubmit) => html `
        <section id="register-page" class="content auth">
            <form id="register" @submit=${onSubmit}>
                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Register</h1>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com">

                    <label for="pass">Password:</label>
                    <input type="password" name="password" id="register-password">

                    <label for="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password">

                    <input class="btn submit" type="submit" value="Register">

                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </div>
            </form>
        </section>
`


export function registerUser(ctx) {
    ctx.render(template(onSubmit))

    async function onSubmit(event){
        event.preventDefault()

        let formInfo = new FormData(event.target)

        if (!verifyInput(formInfo)) {
            return
        } else {
            let email = formInfo.get("email")
            let password = formInfo.get("password")

            await register(
                email, 
                password
            )
    
            ctx.nav()
            ctx.page.redirect("/")
        }
    }
}