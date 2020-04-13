
// Define the heart marlker
var heartMarker = L.icon({
	iconUrl: 'img/kindness-marker.png',
        iconSize:     [32, 48],
        //iconAnchor:   [22, 94],
        popupAnchor:  [0, 0]
});

// Initialize the basemap to the container div
var mymap = L.map('mapid').setView([0, 0], 2);

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
		title: d.title,
		info : d.information,
		date: d.date,
		url : d.url
		};
		}).then(function(data) {
			for(var i = 0; i < data.length; i++){
				console.log(data[i]);
				if (data[i].lat == "" || data[i].lon == "") continue;
				L.marker([data[i].lat, data[i].lon], {icon: heartMarker}).addTo(mymap).bindPopup("<b><a href='" + data[i].url + "'>" + data[i].title + "</a></b><br>Date: " + data[i].date + "<br>" + data[i].info).openPopup();
			};
		});


const reader = require('g-sheets-api');
const readerOptions = {
	sheetId: '1gPzJmXBSq8SPVccbsu4g5tYZQZi0ac0u2c2hOFRPx2I',
	returnAllResults: true
};

reader(readerOptions, results => {
	console.log(results);
});
//https://docs.google.com/spreadsheets/d/1gPzJmXBSq8SPVccbsu4g5tYZQZi0ac0u2c2hOFRPx2I/edit?usp=sharing
