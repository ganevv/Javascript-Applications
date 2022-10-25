function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', load)
    document.getElementById('btnCreate').addEventListener('click', create)
    document.getElementById('phonebook').addEventListener('click', remove)
}

let phoneBook = document.getElementById('phonebook')
let url = 'http://localhost:3030/jsonstore/phonebook'

function load() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            phoneBook.replaceChildren()
            Object.values(data).forEach(p => {
                let liElement = document.createElement('li')
                liElement.textContent = `${p.person}: ${p.phone}`
                let buttonDelete = document.createElement('button')
                buttonDelete.textContent = 'Delete'
                buttonDelete.setAttribute('id', p._id)
                liElement.appendChild(buttonDelete)
                phoneBook.appendChild(liElement)
            })
        })
}

function create() {
    let name = document.getElementById('person')
    let number = document.getElementById('phone')
    if (!name.value || !number.value) {
        return
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            person: name.value.trim(),
            phone: number.value.trim()
        })
    })
        .then(res => res.json())
        .catch(err => alert(err.message))

    name.value = ''
    number.value = ''
}

function remove(e) {
    let currentId = e.target.id
    if (e.target.textContent == 'Delete') {
        fetch(`${url}/${currentId}`, {
            method: 'DELETE'
        })
            .then(res => {
                load()
                return res.json()
            })
            .catch(err => alert(err.message))
    }
}

attachEvents();