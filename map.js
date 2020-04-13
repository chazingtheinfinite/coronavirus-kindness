
// Define the heart marlker
var heartMarker = L.icon({
	iconUrl: 'imgs/kindness-marker.png',
        iconSize:     [32, 48],
        iconAnchor:   [22, 94],
        popupAnchor:  [-3, -76]
});

// Initialize the basemap to the container div
var mymap = L.map('mapid').setView([0, 0], 1);

// Set the basemap
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>',
}).addTo(mymap);

// Load all data and set to the map
d3.csv("data.csv", function(d) {
	return {
        	lat : d.latitude,
		lon : d.longitude,
		info : d.information,
		url : d.url
		};
		}).then(function(data) {
			for(var i = 0; i < data.length; i++){
				console.log(data[i]);
				L.marker([data[i].lat, data[i].lon], {icon: heartMarker}).addTo(mymap).bindPopup("<b>" + data[i].info + "</b><br /><a href='" + data[i].url + "'>See More Here!</a>").openPopup();
			};
		});


