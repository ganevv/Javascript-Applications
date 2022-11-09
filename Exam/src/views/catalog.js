import { html } from '../../node_modules/lit-html/lit-html.js'
import { getAllOffers } from '../api/data.js'

const catalogTemplate = (offers) => html` 
<section id="dashboard">
    <h2>Job Offers</h2>
    ${offers.length == 0 
    ? html `<h2>No offers yet.</h2>`
    : offers.map(offerCard)}
</section>`

const offerCard = (offer) => html `
<div class="offer">
        <img src="${offer.imageUrl}" alt="example2" />
        <p>
            <strong>Title: </strong><span class="title">${offer.title}</span>
        </p>
        <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
        <a class="details-btn" href="/offers/${offer._id}">Details</a>
    </div>
`


export async function catalogPage(ctx) {
    const offers = await getAllOffers()
    ctx.render(catalogTemplate(offers))
}