import { html } from '../../node_modules/lit-html/lit-html.js'
import { deleteOffer, getOfferByOd } from '../api/data.js'
import { getUserData } from '../util.js'

const detailsTemplate = (offer, isOwner, deleteCurrentOffer ) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src="${offer.imageUrl}" alt="example1" />
        <p id="details-title">${offer.title}</p>
        <p id="details-category">
            Category: <span id="categories">${offer.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${offer.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${offer.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${offer.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">1</strong></p>

        ${isOwner 
        ? html `
        <div id="action-buttons">
        <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
        <a @click=${deleteCurrentOffer} href="" id="delete-btn">Delete</a>
        </div>`
        : ''}
        ${!isOwner 
        ? html `
        <div id="action-buttons">
        <a href="" id="apply-btn">Apply</a>
        </div>`
        : ''}
    </div>
</section>`



export async function detailsPage(ctx) {
    const offer = await getOfferByOd(ctx.params.id)
    const userData = getUserData()
    const isOwner = userData?.id == offer._ownerId
    const applyButton = 
    ctx.render(detailsTemplate(offer, isOwner, deleteCurrentOffer))

    async function deleteCurrentOffer() {
        const notification = confirm(`Are you sure you want to delete ${offer._id}`)

        if (notification) {
            await deleteOffer(ctx.params.id)
            ctx.page.redirect('/offers')
        }
    }
}