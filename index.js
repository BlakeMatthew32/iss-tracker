const issBaseUrl = 'https://api.wheretheiss.at/v1/satellites/25544?units=miles'

const map = L.map('map')
const icon = L.icon({
    iconUrl: 'images/International_Space_Station.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
});
const marker = L.marker([0, 0], icon).addTo(map)

async function getIssData() {
    const res = await fetch(issBaseUrl)
    const data = await res.json()
    return {
        lat: data.latitude,
        lon: data.longitude
    }
    
}

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

setInterval(updateIssPos, 5000)

async function updateIssPos() {
    const {lat, lon} = await getIssData()
    map.setView([lat, lon], 4) // (coords, zoom level)
    marker.setLatLng([lat, lon])
}

updateIssPos()