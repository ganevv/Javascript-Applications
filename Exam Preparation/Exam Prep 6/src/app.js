import page from '../node_modules/page/page.mjs';
import { logout } from "./api/user.js";
import { addRender } from "./middlewares/render.js";
import { addSession } from "./middlewares/session.js";
import { dashboardPage } from "./views/dashboard.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { myPostsPage } from './views/myPosts.js';
page(addSession);
page(addRender);
 page("/", dashboardPage);
 page("/dashboard", dashboardPage);
 page("/create", createPage);
 page("/details/:id", detailsPage);
 page("/edit/:id", editPage);
 page("/login", loginPage);
 page("/register", registerPage);
 page('/posts', myPostsPage );
page("/logout", onLogout);
page.start();

function onLogout(ctx){
    logout();
    ctx.page.redirect('/dashboard');
}
