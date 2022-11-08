

import { donations, get } from "../../services/requests.js"
import { html, endPoints, getUserData} from "../utils.js"


let template = (pet, isOwner, canDonate) => html `

        <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src=${pet.image}>
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${pet.name}</h1>
                        <h3>Breed: ${pet.breed}</h3>
                        <h4>Age: ${pet.age}</h4>
                        <h4>Weight: ${pet.weight}</h4>
                        <h4 class="donation">Donation: 0$</h4>
                    </div>
                    <!-- if there is no registered user, do not display div-->
                    <div class="actionBtn">
                        <!-- Only for registered user and creator of the pets-->

                        ${ isOwner ? html `
                        <a href="/edit/${pet._id}" class="edit">Edit</a>
                        <a href="/delete/${pet._id}" class="remove">Delete</a>
                        ` : "" }

                        <!--(Bonus Part) Only for no creator and user-->
                        ${ canDonate ? html `<a href="/donate/${pet._id}" class="donate">Donate</a>` : "" }
                        
                    </div>
                </div>
            </div>
        </section>

   
`


export async function showDetails(ctx) {

    let animalId = ctx.params.animalId

    let pet = await get(endPoints.details + animalId)
    let user = getUserData()
    let isOwner = user?._id == pet._ownerId
    let canDonate = user != undefined && !isOwner ? true : undefined
    let currentDonations = await donations(pet._id)

    console.log(currentDonations)

    

    // console.log(pet._ownerId)
    // //console.log(user._id)
    // console.log(canDonate)
    // console.log(currentDonations)


    ctx.render(template(pet, isOwner, canDonate))

  
}

