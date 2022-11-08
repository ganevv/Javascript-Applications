

import { get, post} from "../services/requests.js"
import { html, endPoints, getUserData, verifyInput} from "../utils.js"


let template = (game, isOwner, canComment, onComment, postComments) => html `

        <section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src=${game.imageUrl} />
                    <h1>${game.title}</h1>
                    <span class="levels">MaxLevel: ${game.maxLevel1}</span>
                    <p class="type">${game.category}</p>
                </div>

                <p class="text">
                    ${game.summary}
                </p>

                <!-- Bonus ( for Guests and Users ) -->

                <div class="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        <!-- list all comments for current game (If any) -->

                        ${ postComments.length == 0 ? html `
                            <p class="no-comment">No comments.</p>
                        ` : postComments.map( item => html `
                            <li class="comment">
                                <p>Content: ${item.comment}</p>
                            </li>
                        `)}
                    </ul>
                    <!-- Display paragraph: If there are no games in the database -->
                </div>

                <!-- Edit/Delete buttons ( Only for creator of this game )  -->

                ${ isOwner ? html ` 
                    <div class="buttons">
                        <a href="/edit/${game._id}" class="button">Edit</a>
                        <a href="/delete/${game._id}" class="button">Delete</a>
                    </div>
                ` : ""} 

            </div>

            <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->

            ${ canComment ? html `
                <article class="create-comment">
                    <label>Add new comment:</label>
                    <form class="form" @submit =${onComment}>
                        <textarea name="comment" placeholder="Comment......"></textarea>
                        <input class="btn submit" type="submit" value="Add Comment">
                    </form>
                </article>
            `: ""}
        </section>
`


export async function showDetails(ctx) {

    let titleInfo = await get(endPoints.details + ctx.params.gameId)
    let user = getUserData()
    let isOwner = user?._id == titleInfo._ownerId
    let canComment = user != undefined && !isOwner ? true : false 
    let postComments = await getComments()


    ctx.render(template(titleInfo, isOwner, canComment, onComment, postComments))  

    async function onComment(event) {
        event.preventDefault()

        let formInfo = new FormData(event.target)

        if (!verifyInput(formInfo)) {
            return
        } else {

            const data = {
                gameId: titleInfo._id,
                comment: formInfo.get("comment")

            }
            
            await post(endPoints.comment, data)

            event.target.clear
            location.reload()
        }
    }

    function getComments() {
        return get(`/data/comments?where=gameId%3D%22${titleInfo._id}%22`)
    }
}


