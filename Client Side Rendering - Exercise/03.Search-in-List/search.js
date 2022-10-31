import { html, render } from "./node_modules/lit-html/lit-html.js"
import { towns } from "./towns.js"

let cardTemplate = html`
<ul>
   ${towns.map((item) => {
   return html`<li id="${item}">${item}</li>`
})}
</ul>
`

let card = document.getElementById('towns')
render(cardTemplate, card)

document.querySelector('button').addEventListener('click', search)

function search() {
   let text = document.getElementById('searchText').value
   let result = towns.filter(t => {
      if (t.includes(text)) {
         let match = document.getElementById(`${t}`)
         match.setAttribute('class', 'active')
         return t
      }
   })
   let resultHtml = document.getElementById('result')
   resultHtml.textContent = `${result.length} matches found`
}
