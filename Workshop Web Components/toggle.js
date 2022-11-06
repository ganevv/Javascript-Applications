const template = document.getElementById('toggle-article')

class ToggleArticle extends HTMLElement {
    #root

    constructor() {
        super()
        this.#root = this.attachShadow({ mode: 'closed' })
    }

    connectedCallback() {
        this.#root.appendChild(template.content.cloneNode(true))
        this.#root.querySelector('button').addEventListener('click', this.toggle.bind(this))
    }

    attributeChangedCallback(name, old, value) {
        if (name == 'info' && this.#root.querySelector('p')) {
            if (value == 'true') {
                this.#root.querySelector('button').textContent = 'Hide Info'
                this.#root.querySelector('p').style.display = 'block'
            } else {
                this.#root.querySelector('button').textContent = 'Show More'
                this.#root.querySelector('p').style.display = 'none'
            }
        }
    }

    static get observedAttributes() {
        return ['info']
    }

    toggle() {
        if (this.getAttribute('info') == 'true') {
            this.removeAttribute('info')
        } else {
            this.setAttribute('info', 'true')
        }
    }
}

window.customElements.define('toggle-article', ToggleArticle)