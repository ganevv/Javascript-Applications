import page from "../node_modules/page/page.mjs"
import { html, render } from "../node_modules/lit-html/lit-html.js"


let endPoints = {
    home: "/data/games?sortBy=_createdOn%20desc&distinct=category",
    login: "/users/login",
    register: "/users/register",
    logout: "/users/logout",
    catalog: "/data/games?sortBy=_createdOn%20desc",
    create: "/data/games/",
    details: "/data/games/",
    edit: "/data/games/",
    delete: "/data/games/",
    comment: "/data/comments"
}

export {
    page,
    html,
    render,
    endPoints
}

export function getUserData() {
    let user = localStorage.getItem("userData")

    if (user) {
        return JSON.parse(user)
    }
    return undefined
}

export function setUserData(data) {
    localStorage.setItem("userData", JSON.stringify(data))
}

export function clearUserData() {
    localStorage.removeItem("userData")
}


export function verifyInput(data) {

    let details = [...data.values()]

    if (details.some( x => x.trim() == "")) {
        alert("All fields are required")
        return false 
    } 

    if (details.length == 3 && details[1] != details[2]) {
        alert("Passwords must match")
        return false
    }
    return true 
}


export function userNav() {

    let user = getUserData()

    if (user == undefined) {
        document.getElementById("guest").style.display = "inline"
        document.getElementById("user").style.display = "none"

    } else {

        document.getElementById("guest").style.display = "none"
        document.getElementById("user").style.display = "inline"
    }
}