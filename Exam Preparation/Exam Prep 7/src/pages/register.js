
import { register } from "../../services/requests.js"
import { html, verifyInput } from "../utils.js"


let template = (onSubmit) => html `

        <section id="registerPage">
            <form class="registerForm" @submit=${onSubmit}>
                <img src="./images/logo.png" alt="logo" />
                <h2>Register</h2>
                <div class="on-dark">
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div class="on-dark">
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <div class="on-dark">
                    <label for="repeatPassword">Repeat Password:</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Register</button>

                <p class="field">
                    <span>If you have profile click <a href="/login">here</a></span>
                </p>
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
            ctx.page.redirect("/catalog")
        }
    }
}