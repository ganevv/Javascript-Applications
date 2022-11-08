
import { getUserData, endPoints, setUserData, clearUserData} from "../utils.js"
import { sendRequest } from "./api.js"


function createOptions(method = "get", body) {

    const options = {
        method,
        headers: {}
    }

    let user = getUserData()
    if(user != undefined) {
        options.headers["X-Authorization"] = user.accessToken
    }

    if(body) {
        options.headers["Content-type"] = "application/json"
        options.body = JSON.stringify(body)
    }

    return options 
}


export async function get(url) {
    return await sendRequest(url, createOptions())
}

export async function post(url, data) {
    return await sendRequest(url, createOptions("post", data))
}

export async function put(url, data) {
    return await sendRequest(url, createOptions("put", data))
}

export async function removeItem(itemId) {
    console.log(itemId)
    return await sendRequest(endPoints.delete + itemId, createOptions("delete"))
    
}


export async function login(email, password) {

    let result = await post(endPoints.login, {email, password})
    setUserData(result)
    return result 
}


export async function register(email, password) {

    let result = await post(endPoints.register, {email, password})
    setUserData(result)
    return result 

}


export function logOut() {
    get(endPoints.logout)
    clearUserData()
    userNav()    
}


