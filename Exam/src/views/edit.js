import { html } from '../../node_modules/lit-html/lit-html.js'
import { getOfferByOd, updateOffer } from '../api/data.js'

const editTemplate = (offer, onSubmit) => html`<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="title" id="job-title" placeholder="Title" .value=${offer.title}/>
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" .value=${offer.imageUrl}/>
            <input type="text" name="category" id="job-category" placeholder="Category" .value=${offer.category}/>
            <textarea id="job-description" name="description" placeholder="Description" .value=${offer.description} rows="4" cols="50"></textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" .value=${offer.requirements} rows="4"
                cols="50"></textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" .value=${offer.salary}/>

            <button type="submit">post</button>
        </form>
    </div>
</section>`

export async function editPage(ctx) {
    const offer = await getOfferByOd(ctx.params.id)
    ctx.render(editTemplate(offer, onSubmit))

    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)

        const offer = {
            title: formData.get('title'),
            imageUrl: formData.get('imageUrl'),
            category: formData.get('category'),
            description: formData.get('description'),
            requirements: formData.get('requirements'),
            salary: formData.get('salary')
        }

        if (offer.title == '' || offer.imageUrl == '' || offer.category == '' || offer.description == '' || offer.requirements == '' || offer.salary == '') {
            return alert('All fields are required!')
        }

        await updateOffer(ctx.params.id, offer)
        event.target.reset()
        ctx.page.redirect('/offers/' + ctx.params.id)
    }
}