
import { get } from "../../services/requests.js"
import { html, endPoints, getUserData } from "../utils.js"


let template = (pets, getUserData) => html `

        <section id="dashboard">
            <h2 class="dashboard-title">Services for every animal</h2>
            <div class="animals-dashboard">

            ${ pets.length == 0 ? html `
                <div>
                    <p class="no-pets">No pets in dashboard</p>
                </div>`: pets.map( pet => html `

                <div class="animals-board">
                    <article class="service-img">
                        <img class="animal-image-cover" src=${pet.image}>
                    </article>
                    <h2 class="name">${pet.name}</h2>
                    <h3 class="breed">${pet.breed}</h3>
                    
                    ${getUserData() == "undefined" ? "" : 
                    html `
                    
                    <div class="action">
                        <a class="btn" href="/details/${pet._id}">Details</a>
                    </div>
                    `
                    }

                </div>
                `)}
            </div>
        </section>`

export async function showAllPets(ctx) {
    let pets = await get(endPoints.dashboard)
    ctx.render(template(pets, getUserData))
}

