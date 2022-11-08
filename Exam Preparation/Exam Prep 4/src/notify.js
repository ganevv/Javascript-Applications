const container = document.getElementById('errorBox')
const spamn = container.querySelector('span')

export function notify(message) {
    spamn.textContent = message
    container.style.display = 'block'

    setTimeout(() => container.style.display = 'none', 3000)
}