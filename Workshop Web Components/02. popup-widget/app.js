const template = document.getElementById('popup-template')

class InfoPopup extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        const img = this.getAttribute('img')
        if (img) {
            this.shadowRoot.querySelector('img').src = img
        }
    }
}

customElements.define('info-popup', InfoPopup)