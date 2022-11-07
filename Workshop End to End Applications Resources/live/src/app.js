import page from './lib/page.mjs'
import { addLogout } from './middlewares/logout.js'
import { addRender } from './middlewares/render.js'
import { homeView } from './views/home.js'
import { loginView } from './views/login.js'

const main = document.getElementById('main')

page(addLogout())
page(addRender(main))
page('/index.html', '/')
page('/', homeView)
page('/login', loginView)

page.start()


