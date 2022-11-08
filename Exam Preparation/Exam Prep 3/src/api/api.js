import { clearUserData, getAccessToken } from "../util.js"


const host = 'http://localhost:3030'

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    }

    const token = getAccessToken()
    if (token) {
        options.headers['X-Authorization'] = token
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(data)
    }

    try {
        const res = await fetch(host + url, options)

        if (res.ok == false) {
            if (res.status == 403) {
                clearUserData()
            }
            const error = await res.json()
            throw new Error(error.message)
        }

        if (res.status == 204) {
            return res
        } else {
            return res.json()
        }
    } catch (err) {
        alert(err.message)
        throw err
    }
}

export const get = request.bind(null, 'get')
export const post = request.bind(null, 'post')
export const put = request.bind(null, 'put')
export const del = request.bind(null, 'delete')