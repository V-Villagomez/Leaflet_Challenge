// Creating the map object
var myMap = L.map("map", {
    center: [39.49, -98.34],
    zoom: 5
  });

// Adding the tile layer
L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/light-v10",
      accessToken: API_KEY
}).addTo(myMap);

// Connect to geojson using D3
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(url, function(data) {
    // Create functions: markers with size corresponding to quake mag by their size and depth by color (higher mag appear larger and greater depth appear darker in color)
    for (var i = 0; i < data.features.length; i++) {
        
        // Excerpt coordinates, magnitude,location name and date of earthquakes
        var coord = data.features[i].geometry.coordinates;
        var mag = data.features[i].properties.mag;
        var loc_name = data.features[i].properties.place;
        var date = new Date(data.features[i].properties.time);
    
    // Circle markers
    L.circle([coord[1], coord[0]], {
        color: "#E3E3E3",
        weight: 1,
        fillColor: getColor(mag),
        fillOpacity: 0.5,
        radius: mag * 50000 // Adjust radius size
    }).bindPopup("<h1>" + loc_name + "</h1><hr><h3> Magnitude: " + mag + "</h3>" + "<p>" + date + "</p>") // Add tooltip
    .addTo(myMap);}

    
    // Create popups that provide add'l info about the quake when a marker is clicked
    
    
    // Create a legend that will provide context for map data (data point)

  
});

