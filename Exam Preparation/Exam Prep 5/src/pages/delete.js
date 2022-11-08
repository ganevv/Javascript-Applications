
import { removeItem } from "../services/requests.js"


export async function deletePost(ctx) {
    await removeItem(ctx.params.gameId)
    ctx.page.redirect("/")
}