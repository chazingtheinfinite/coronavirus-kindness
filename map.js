// This is the published Google Sheet from which the data are obtained.
var publishedData = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSx-MgeekVffmrTB7oA7AhlGP7aEpcZIDnFBLCBQL5mEUKNnYVzoR-hT_kMuA6sIEdlLmyihIJ1oO49/pub?gid=1652908691&single=true&output=csv';

// Define the heart marlker
var heartMarker = L.icon({
	iconUrl: 'img/kindness-marker.png',
        iconSize:     [32, 48],
        //iconAnchor:   [0, 2],
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
//d3.csv("data.csv", function(d) {
d3.csv(publishedData, function(d) {
	return {
        	lat : d.latitude,
		lon : d.longitude,
		title: d.title,
		info : d.information,
		date: d.date,
		url : d.url,
		giver : d.giver,
		recipient : d.recipient,
		contribute: d.contribute
		};
		}).then(function(data) {
			for(var i = 0; i < data.length; i++){
				console.log(data[i]);
				if (data[i].lat == "" || data[i].lon == "") continue;

				var contributeHtml = '';
				if (data[i].contribute != "") {
					// Add a button to the popup box					
					contributeHtml = "<br><br>Want to help? &nbsp; <a href='" + data[i].contribute + "' target='_blank'><button class='button-small'><b>Contribute</b></button></a>";
					
					// Append this article to the contribution DIV
					document.getElementById('contribute').innerHTML += "<tr><td><a href='" + data[i].contribute + "' target='_blank'><button class='button'><b>Contribute</b></button></a></td><td id='towrap' word-wrap='break-word'><b><a href='" + data[i].url + "' target='_blank'>" + data[i].title + "</a></b></td></tr><br>";
				}
				// Create the Marker!
				L.marker([data[i].lat, data[i].lon], {icon: heartMarker}).addTo(mymap).bindPopup("<b><a href='" + data[i].url + "' target='_blank'>" + data[i].title + "</a></b><br>Date: " + data[i].date + "<br>" + data[i].giver + " &#8594; " + data[i].recipient + "<br>"+ data[i].info + contributeHtml).openPopup();
			};
			
			// After parsing all entries, we need to close the table in the contribution section!
			document.getElementById('contribute').innerHTML += "</table>";

			// Wrap wording in all table descriptions
			document.getElementById("towrap").style.wordWrap = "break-word";
		});



