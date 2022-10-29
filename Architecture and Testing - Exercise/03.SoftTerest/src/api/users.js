import { get, post } from './api.js'

const endpoints = {
    'login': '/users/login',
    'register': '/users/register',
    'logout': '/users/logout',
}

export async function login(email, passsword) {
    const user = await post(endpoints.login, { email, passsword })
    localStorage.setItem('user', JSON.stringify(user))
}
export async function register(email, passsword) {
    const user = await post(endpoints.login, { email, passsword })
    localStorage.setItem('user', JSON.stringify(user))
}
export async function logout() {
    get(endpoints.logout)
    localStorage.removeItem('user')
}