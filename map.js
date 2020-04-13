
var mymap = L.map('mapid').setView([0, 0], 1);

/*L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
             maxZoom: 18,
             attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
             id: 'mapbox/streets-v11',
             tileSize: 512,
             zoomOffset: -1
       }).addTo(mymap);
*/

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>',
}).addTo(mymap);

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
				L.marker([data[i].lat, data[i].lon]).addTo(mymap).bindPopup("<b>" + data[i].info + "</b><br /><a href='" + data[i].url + "'>See More Here!</a>").openPopup();
			};
		});

var popup = L.popup();

//function onMapClick(e) { popup
//                         .setLatLng(e.latlng)
//                         .setContent("You clicked the map at " + e.latlng.toString())
//                         .openOn(mymap);
//	}

mymap.on('click', onMapClick);

