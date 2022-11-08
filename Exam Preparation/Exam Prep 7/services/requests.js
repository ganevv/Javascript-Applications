
import { getUserData, endPoints, setUserData} from "../src/utils.js"
import { sendRequest } from "./api.js"


function createOptions(method = "get", body) {

    const options = {
        method,
        headers: {}
    }

    let user = getUserData()
    if(user) {
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

export async function remove(itemId) {
    return await sendRequest(endPoints.delete + itemId, createOptions("delete"))
    
}

export async function getMyPosts(userId) {

    let url = `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
    return await sendRequest(url, createOptions())
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
    let result = get(endPoints.logout)
    return result 
}

export function donate(postId) {
    let result = post(endPoints.donate, {postId})
    return result 
}

export async function donations(petId) {

    let donationUrl = `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`
    let result = await get(donationUrl)
    console.log(result)
    return result 

}