import { showCatalog } from "./pages/catalog.js"
import { createPost } from "./pages/create.js"
import { deletePost } from "./pages/delete.js"
import { showDetails } from "./pages/details.js"
import { editPost } from "./pages/edit.js"
import { showHome } from "./pages/home.js"
import { loginUser } from "./pages/login.js"
import { registerUser } from "./pages/register.js"
import { logOut } from "./services/requests.js"
import { page, render, userNav } from "./utils.js"


let main = document.getElementById("main-content")

document.getElementById("logoutUser").addEventListener("click", () => {
    logOut()
})

page(pageDecorator)
page("/", showHome)
page("/login", loginUser)
page("/register", registerUser)
page("/catalog", showCatalog)
page("/create", createPost)
page("/details/:gameId", showDetails)
page("/edit/:gameId", editPost)
page("/delete/:gameId", deletePost )

page.start()
userNav()


function pageDecorator(ctx, next){
    ctx.render = (template) => render(template, main)
    ctx.nav = userNav

    next()
}

