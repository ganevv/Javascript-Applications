
import { get, put } from "../../services/requests.js"
import { html, endPoints, verifyInput } from "../utils.js"


let template = (post, onSubmit) => html `

        <section id="editPage">
            <form class="editForm" @submit=${onSubmit}>
                <img src="./images/editpage-dog.jpg">
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" .value=${post.name}>
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" .value=${post.breed}>
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" .value=${post.age}>
                        <!-- <input name="age" id="age" type="text" value=${`${post.years} years`}> -->
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" .value=${post.weight}>
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" .value=${post.image}>
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
        </section>

`


export async function editPost(ctx) {

    let postId = ctx.params.animalId

    let pet = await get(endPoints.details + postId)
    ctx.render(template(pet, onSubmit))

    async function onSubmit(event) {
        event.preventDefault()

        let formData = new FormData(event.target)

        if (!verifyInput(formData)) {
            return 
        } else {

            let data = {
                name: formData.get("name"),
                breed: formData.get("breed"),
                age: formData.get("age"),
                weight: formData.get("weight"),
                image: formData.get("image")
            }

            await put(endPoints.edit + postId, data)
            ctx.page.redirect("/catalog")
        }
    }
}