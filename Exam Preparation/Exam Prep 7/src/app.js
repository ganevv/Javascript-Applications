
//pages 
import { showAllPets } from "./pages/catalog.js"
import { createPost } from "./pages/create.js"
import { deletePost } from "./pages/delete.js"
import { showDetails } from "./pages/details.js"
import { editPost } from "./pages/edit.js"
import { showHome } from "./pages/home.js"
import { loginUser } from "./pages/login.js"
import { registerUser } from "./pages/register.js"


//services and managers 
import { clearUserData, page, render, userNav } from "./utils.js"
import { logOut } from "../services/requests.js"
import { donate } from "./pages/donate.js"


let main = document.getElementById("content")
document.getElementById("logout").addEventListener("click", () => {
    logOut()
    clearUserData()
    userNav()
    page.redirect("/")
})


//routes
page(decorateCtx)
page("/", showHome)
page("/login", loginUser)
page("/register", registerUser)
page("/catalog", showAllPets)
page("/create", createPost)
page("/details/:animalId", showDetails)
page("/edit/:animalId", editPost)
page("/delete/:animalid", deletePost)
page("/donate/:animalId", donate)


page.start()
userNav()


function decorateCtx(ctx, next) {
    ctx.render = (template) => render(template, main)
    ctx.nav = userNav
    next()
}