import { get, put } from "../services/requests.js"
import { html, endPoints, verifyInput } from "../utils.js"


let template = (game, onSubmit) => html `

        <section id="edit-page" class="auth">
            <form id="edit" @submit=${onSubmit}>
                <div class="container">

                    <h1>Edit Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" .value=${game.title}>

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" .value=${game.category}>

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${game.maxLevel}>

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" .value=${game.imageUrl}>

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary" .value=${game.summary}></textarea>
                    <input class="btn submit" type="submit" .value="Edit Game">
                    
                </div>
            </form>
        </section>
`


export async function editPost(ctx) {

    let gameInfo = await get(endPoints.details + ctx.params.gameId)
    ctx.render(template(gameInfo, onSubmit))

    async function onSubmit(event) {
        event.preventDefault()

        let formData = new FormData(event.target)

        if (!verifyInput(formData)) {
            return 
        } else {

            let data = {
                title: formData.get("title"),
                category: formData.get("category"),
                maxLevel: formData.get("maxLevel"),
                imageUrl: formData.get("imageUrl"),
                summary: formData.get("summary")
        
            }             

            await put(endPoints.edit + gameInfo._id, data)
            ctx.page.redirect(`/details/${gameInfo._id}`)
        }
    }
}