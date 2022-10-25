let loadBookButton = document.querySelector('#loadBooks')
let url = 'http://localhost:3030/jsonstore/collections/books'
let tbodyElement = document.getElementsByTagName('tbody')[0]
let formElement = document.getElementsByTagName('form')[0]

loadBookButton.addEventListener('click', loadBooks)

async function loadBooks() {
    try {
        let response = await fetch(url)

        if (response.status != 200) {
            throw new Error('problem loading data.')
        }

        let data = await response.json()

        let entries = Object.entries(data)
        tbodyElement.innerHTML = ''

        for (const [key, { author, title }] of entries) {
            let trElement = document.createElement('tr')
            let titleElement = document.createElement('td')
            titleElement.textContent = title
            let authorElement = document.createElement('td')
            authorElement.textContent = author

            trElement.appendChild(titleElement)
            trElement.appendChild(authorElement)

            let newElement = document.createElement('td')
            let editBtn = document.createElement('button')
            let deleteBtn = document.createElement('button')
            editBtn.textContent = 'Edit'
            deleteBtn.textContent = 'Delete'
            deleteBtn.addEventListener('click', remove)
            newElement.appendChild(editBtn)
            newElement.appendChild(deleteBtn)

            trElement.appendChild(newElement)
            tbodyElement.appendChild(trElement)

            function remove(e) {
                e.preventDefault()
                fetch(`${url}/${key}`, {
                    method: 'DELETE',
                })

                trElement.remove()
            }
        }

    } catch (error) {

    }
}