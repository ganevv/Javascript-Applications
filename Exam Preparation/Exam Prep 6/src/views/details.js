import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as postsService from '../api/posts.js';


const detailsTemplate = (post, onDelete, user, onDonate) => html`
  <section id="details-page">
            <h1 class="title">Post Details</h1>
            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src= ${post.imageUrl} alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">${post.title}</h2>
                        <p class="post-description">Description: ${post.description}</p>
                        <p class="post-address">Address: ${post.address}</p>
                        <p class="post-number">Phone number: ${post.phone}</p>
                        <p class="donate-Item">Donate Materials: ${post.donations}</p>
                          ${post.isOwner? html `
                          <div class="btns">
                            <a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                            <a @click = ${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>
                          ` : checkIfLogged(user, post, onDonate)}
                        </div>

                    </div>
                </div>
            </div>
        </section>
  `;

export async function detailsPage(ctx) {
  const postId = ctx.params.id;
  const post = await postsService.getById(postId);
  post.donations = await postsService.getPostDonations(postId); 
  post.hasDonated = await postsService.getUserDonations(postId, ctx.user._id);
  if (ctx.user) {
    post.isOwner = ctx.user._id === post._ownerId;
  }
  ctx.render(detailsTemplate(post, onDelete, ctx.user, onDonate));

  async function onDelete(){
    const choice = confirm('Are you sure you want to delete this post?');

    if (choice) {
      await postsService.deleteById(postId);
      ctx.page.redirect('/'); 
    }
  }
  async function onDonate(){
    await postsService.donate({
      postId:post._id
    });
    post.donations = await postsService.getPostDonations(postId); 
    post.hasDonated = await postsService.getUserDonations(postId, ctx.user._id);
    ctx.render(detailsTemplate(post, onDelete, ctx.user, onDonate));
  }
}

 function checkIfLogged(user, post, onDonate){
  if (user && post.hasDonated === 0) {
    return html `<a @click = ${onDonate} href="javascript:void(0)" id = 'donateButton'  class="donate-btn btn">Donate</a>`;
  }
  return nothing;
}





