
import { html, verifyInput, endPoints } from "../utils.js"
import { post } from "../../services/requests.js"


let template = (onSubmit) => html `

        <section id="createPage">
            <form class="createForm" @submit = ${onSubmit}>
                <img src="./images/cat-create.jpg">
                <div>
                    <h2>Create PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" placeholder="Max">
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" placeholder="Shiba Inu">
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" placeholder="2 years">
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" placeholder="5kg">
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" placeholder="./image/dog.jpeg">
                    </div>
                    <button class="btn" type="submit">Create Pet</button>
                </div>
            </form>
        </section>
`


export function createPost(ctx) {

    ctx.render(template(onSubmit))

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

            await post(endPoints.create, data)
            ctx.page.redirect("/catalog")
        }
    }
}


