
import { remove } from "../../services/requests.js"


export async function deletePost(ctx) {
    let postId = ctx.params.animalid
    await remove(postId)
    ctx.page.redirect("/catalog")
}