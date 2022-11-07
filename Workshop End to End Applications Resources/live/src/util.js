export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'))
}

export function setUserData(data) {
    return sessionStorage.setItem('userData', JSON.stringify(data))
}

export function clearUserData() {
    return sessionStorage.removeItem('userData')
}

export function bindForm(callback){
    return function(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        const asObject = Object.fromEntries([...formData.entries()])
        callback(asObject)
    }
}