import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as postsService from "../api/posts.js";

const dashboardTemplate = (posts, ctx) => html`
  <section id="dashboard-page">
    <h1 class="title">All Posts</h1>
    <div class="all-posts">
      ${posts.length > 0
        ? posts.map(cardTemplate)
        : html`
        <h1 class="title no-posts-title">No posts yet!</h1>`
      }
    </div>
  </section>
`;

const cardTemplate = (post) => html`
  <div class="post">
    <h2 class="post-title">${post.title}</h2>
    <img class="post-image" src=${post.imageUrl}>
    <div class="btn-wrapper">
      <a href="/details/${post._id}" class="details-btn btn">Details</a>
    </div>
  </div>
`;

export async function dashboardPage(ctx) {
  const posts = await postsService.getDashboard();
  ctx.render(dashboardTemplate(posts, ctx));
}
