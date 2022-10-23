function getInfo() {

    let baseUrl = 'http://localhost:3030/jsonstore/bus/businfo'
    let input = document.getElementById('stopId')
    let ulElements = document.getElementById('buses')
    let stopDiv = document.getElementById('stopName')

    fetch(`${baseUrl}/${input.value}`)
        .then(response => response.json())
        .then(data => {
            let buses = data.buses
            let name = data.name

            stopDiv.textContent = name
            ulElements.innerHTML = ''
            Object.keys(buses).forEach(bus => {
                let liElement = document.createElement('li')
                liElement.textContent = `Bus ${bus} arrives in ${buses[bus]} minutes`
                ulElements.appendChild(liElement)
            })
        })
        .catch(error => {
            stopDiv.textContent = 'Error'
            ulElements.innerHTML = ''
        })
}