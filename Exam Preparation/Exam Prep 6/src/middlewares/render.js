import { html, render } from "../../node_modules/lit-html/lit-html.js";

const navTemplate = (user) => html` 
 <h1><a href="/">Orphelp</a></h1>
  <nav>
                <a href="/dashboard">Dashboard</a>
                  ${user ? html `
                  <div id="user">
                    <a href="/posts">My Posts</a>
                    <a href="/create">Create Post</a>
                    <a href="/logout">Logout</a>
                </div>` : html `
                <div id="guest">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>
                `} 
            </nav>`;

const footerTemplate = () => html` 
  
  `;

 const header = document.getElementById("header"); 
 const root = document.getElementById("main-content"); 
 //const footer = document.getElementById("footer"); 

function ctxRender(content) {
  render(content, root);
}

export function addRender(ctx, next) {
 render(navTemplate(ctx.user), header);
 //render(footerTemplate(), footer);
  ctx.render = ctxRender;
  next();
}
