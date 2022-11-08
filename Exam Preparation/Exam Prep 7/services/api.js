

let defaultGetaway = "http://localhost:3030"


export async function sendRequest(url, options) {

    try {
        let response = await fetch(defaultGetaway + url, options)

        if (response.ok == false) {
            let error = await response.json()
            throw new Error(error.message)
        }

        try {
            let data = response.json()
            return data 
        } catch(err) {
            return response
        }
        
    } catch(err) {
        console.log(err.meesage)
        throw err
    }
}




