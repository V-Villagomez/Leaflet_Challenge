// Creating the map object
var myMap = L.map("map", {
    center: [39.49, -98.34],
    zoom: 5
  });

// //var quakes = L.layerGroup();

// Adding the tile layer
var quakeMap = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution:
        "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/light-v10",
      accessToken: API_KEY
}).addTo(myMap);

function getColor(mag) {
    switch(true) {
        case mag > 90:
            return "red";
        case mag > 70:
            return "orangered";
        case mag > 50:
            return "orange";
        case mag > 30:
            return "goldenrod"
        case mag > 10:
            return "yellow";
        default:
            return "greenyellow"
    }
}

// Adjust radius with a mag of 0
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

// Connect to geojson using D3
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(url).then(function(data) {
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
            radius: getRadius(feature.properties.mag),
            fillColor: getColor(feature.properties.mag),
            fillOpacity: 0.7,
            color: "black",
            stroke: true,
            weight: 1
        });
    },
    // Create popups that provide add'l info about the quake when a marker is clicked
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>Location: " + feature.properties.place + "</h3><hr><p>Date: "
        + new Date(feature.properties.time) + "</p><hr><p>Magnitude: " + feature.properties.mag + "</p>");
    }
}).addTo(myMap);

// Create a legend that will provide context for map data (data point)
var legend = L.control({position: "bottomright"});
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend"),
    mag = [-10, 10, 30, 50, 70, 90];
    
    div.innerHTML += "<h3 style='text-align: center'>Mag</h3>"
  for (var i =0; i < mag.length; i++) {
    div.innerHTML += 
    '<i style="background:' + getColor(mag[i] + 1) + '"></i> ' +
        mag[i] + (mag[i + 1] ? '&ndash;' + mag[i + 1] + '<br>' : '+');
      }
    return div;
  };

legend.addTo(myMap);
  
});


