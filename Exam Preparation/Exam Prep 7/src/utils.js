import page from "../node_modules/page/page.mjs"
import { html, render } from "../node_modules/lit-html/lit-html.js"


let endPoints = {
    login: "/users/login",
    register: "/users/register",
    logout: "/users/logout",
    dashboard: "/data/pets?sortBy=_createdOn%20desc&distinct=name",
    create: "/data/pets/",
    details: "/data/pets/",
    edit: "/data/pets/",
    delete: "/data/pets/",
    donate: "/data/donations"
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

    if (user) {
        document.getElementById("create").style.display = "inline"
        document.getElementById("logout").style.display = "inline"

        document.getElementById("login").style.display = "none"
        document.getElementById("register").style.display = "none"

    } else {

        document.getElementById("create").style.display = "none"
        document.getElementById("logout").style.display = "none"

        document.getElementById("login").style.display = "inline"
        document.getElementById("register").style.display = "inline"
    }


}