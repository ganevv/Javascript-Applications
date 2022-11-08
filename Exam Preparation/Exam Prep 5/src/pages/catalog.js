
import { get } from "../services/requests.js"
import { html, endPoints } from "../utils.js"


let template = (games) => html `

        <section id="catalog-page">
            <h1>All Games</h1>
            <!-- Display div: with information about every game (if any) -->

            ${ games.length == 0 ? html `<h3 class="no-articles">No articles yet</h3>` :
            games.map ( game => html `
                <div class="allGames">
                    <div class="allGames-info">
                        <img src=${game.imageUrl}>
                        <h6>${game.category}</h6>
                        <h2>${game.title}</h2>
                        <a href="/details/${game._id}" class="details-button">Details</a>
                    </div>
                </div>
            `)}
            <!-- Display paragraph: If there is no games  -->
        </section>
`

export async function showCatalog(ctx) {
    let articles = await get(endPoints.catalog)
    ctx.render(template(articles))
}

