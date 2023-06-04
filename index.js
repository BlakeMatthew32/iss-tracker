const issBaseUrl = 'https://api.wheretheiss.at/v1/satellites/25544?units=miles'
let firstCycle = true

const iconSize = {
    width: 15,
    height: 10
}

// create the map

const map = L.map('map')
const icon = L.icon({
    iconUrl: 'images/iss1000.png',
    iconSize: [iconSize.width, iconSize.height],
    iconAnchor: [iconSize.width/2, iconSize.height/2],
});

const marker = L.marker([0, 0], {icon: icon}).addTo(map)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// get the ISS data

async function getIssData() {
    const res = await fetch(issBaseUrl)
    const data = await res.json()
    return {
        lat: data.latitude,
        lon: data.longitude
    }
    
}

// update ISS postion on the map 

async function updateIssPos() {
    const {lat, lon} = await getIssData()
    const zoomLevel = map.getZoom() + 1
    const width = iconSize.width * zoomLevel
    const height = iconSize.height * zoomLevel

    if(firstCycle) {
        map.setView([lat, lon], 4) // (coords, zoom level)
        firstCycle = false
    }

    icon.options.iconSize = [width, height]
    icon.options.iconAnchor = [width/2, height/2]
    
    marker.setLatLng([lat, lon])
    marker.setIcon(icon)
}

updateIssPos()
setInterval(updateIssPos, 1500)




/** tested using the p5 canvas to enable a line to be draw from the points of the iss location. **/


// const mappa = new Mappa("Leaflet")

// let myMap, canvas, issIcon

// const options = {
//     lat: 0,
//     lng: 0,
//     zoom: 1.5,
//     style: "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
// }

// let y = 0
// let x = 0

// function preload() {
//     issIcon = loadImage('images/iss1000.png')
// }

// async function setup() {
//     canvas = createCanvas(800, 600)
//     myMap = await mappa.tileMap(options)
//     myMap.overlay(canvas)
//     getData()
//     setInterval(getData, 3000)
// }

// function getData() {
//     loadJSON(issBaseUrl, gotData)
// }

// function gotData(data) {
//     const pix = myMap.latLngToPixel(data.latitude, data.longitude)
//     x = pix.x
//     y = pix.y
//   }

  
// function draw() {
//     // image(issIcon, x, y, 50, 32)
//     point(x, y)
//   }