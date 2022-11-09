import { html, render } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'
import { logout } from './api/api.js'
import { getUserData } from './util.js'
import { catalogPage } from './views/catalog.js'
import { createPage } from './views/create.js'
import { detailsPage } from './views/details.js'
import { editPage } from './views/edit.js'
import { homePage } from './views/home.js'
import { loginPage } from './views/login.js'
import { registerPage } from './views/register.js'

const main = document.querySelector('main')

document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateContext)
page('/', homePage)
page('/offers', catalogPage)
page('/offers/:id', detailsPage)
page('/edit/:id', editPage)
page('/login', loginPage)
page('/register', registerPage)
page('/create', createPage)

navigationUpdate()
page.start()

function decorateContext(ctx, next) {
    ctx.render = renderMain
    ctx.navigationUpdate = navigationUpdate
    next()
}

function renderMain(content) {
    render(content, main)
}

function navigationUpdate() {
    const userData = getUserData()
    if (userData) {
        document.getElementById('user').style.display = 'block'
        document.getElementById('guest').style.display = 'none'
    } else {
        document.getElementById('user').style.display = 'none'
        document.getElementById('guest').style.display = 'block'
    }
}

function onLogout() {
    logout()
    navigationUpdate()
    page.redirect('/offers')
}