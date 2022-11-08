

import { donate as makeDonation } from "../../services/requests.js"

export function donate(ctx) {
    let petid = ctx.params.animalId
    makeDonation(petid)
}