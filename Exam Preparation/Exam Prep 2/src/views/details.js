import { html } from "../../node_modules/lit-html/lit-html.js"
import { deleteBook, getBookById, getLikesByBookId, getMyLikesByBookId, likeBook } from "../api/data.js"
import { getUserData } from "../util.js"

let detailsTemplate = (book, isOwner, onDelete, likes, showLikeButton, onLike) => html`
<section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src=${book.imageUrl}></p>
                <div class="actions">
                    ${bookControlsTemplate(book, isOwner, onDelete)}
                    ${likesControlsTemplate(showLikeButton, onLike)}
                    <div class="likes">
                        <img class="hearts" src="../images/heart.png">
                        <span id="total-likes">Likes: ${likes}</span>
                    </div>
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>Feyre's survival rests upon her ability to hunt and kill – the forest where she lives is a cold,
                    bleak place in the long winter months. So when she spots a deer in the forest being pursued by a
                    wolf, she cannot resist fighting it for the flesh. But to do so, she must kill the predator and
                    killing something so precious comes at a price ...</p>
            </div>
        </section>`

let bookControlsTemplate = (book, isOwner, onDelete) => {
    if (isOwner) {
        return html`
        <a class="button" href="/edit/${book._id}">Edit</a>
        <a @clicl=${onDelete} class="button" href="javascript:void(0)">Delete</a>
        `
    } else {
        return null
    }
}

let likesControlsTemplate = (showLikeButton, onLike) => {
    if (showLikeButton) {
        return html`<a @clicl=${onLike} class="button" href="javascript:void(0)">Like</a>`
    } else {
        return null
    }
}

export async function detailsPage(ctx) {
    let userData = getUserData()
    let [book, likes, hasLike] = await Promise.all([
        getBookById(ctx.params.id),
        getLikesByBookId(ctx.params.id),
        userData ? getMyLikesByBookId(ctx.params.id, userData.id) : 0
    ])

    let isOwner = userData && userData.id == book._ownerId
    let showLikeButton = isOwner == false && hasLike == false && userData != null
    ctx.render(detailsTemplate(book, isOwner, onDelete, likes, showLikeButton, onLike))

    async function onDelete() {
        await deleteBook(ctx.params.id)
        ctx.page.redirect('/')
    }

    async function onLike() {
        await likeBook(ctx.params.id)
        ctx.page.redirect('/details/' + ctx.params.id)
    }
}