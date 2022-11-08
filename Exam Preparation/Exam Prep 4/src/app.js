import { html, render } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'
import { logout } from './api/api.js'
import { getUserData } from './util.js'
import { catalogView } from './views/catalog.js'
import { createView } from './views/create.js'
import { detailsView } from './views/details.js'
import { editView } from './views/edit.js'
import { homeView } from './views/home.js'
import { loginView } from './views/login.js'
import { profileView } from './views/profile.js'
import { registerView } from './views/register.js'

const main = document.querySelector('main')

document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateContext)
page('/', homeView)
page('/memes', catalogView)
page('/memes/:id', detailsView)
page('/edit/:id', editView)
page('/login', loginView)
page('/register', registerView)
page('/create', createView)
page('/profile', profileView)

updateNav()
page.start()

function decorateContext(ctx, next) {
    ctx.render = renderMain
    ctx.updateNav = updateNav
    next()
}
//can change templateResult with content!
function renderMain(templateResult) {
    render(templateResult, main)
}

function updateNav() {
    const userData = getUserData()
    if (userData) {
        document.querySelector('.user').style.display = 'block'
        document.querySelector('.guest').style.display = 'none'
        document.querySelector('.user span').textContent = `Welcome, ${userData.email}`
    } else {
        document.querySelector('.user').style.display = 'none'
        document.querySelector('.guest').style.display = 'block'
    }
}

function onLogout() {
    logout()
    updateNav()
    page.redirect('/')
}