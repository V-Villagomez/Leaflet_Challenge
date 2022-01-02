// Creating the map object
var myMap = L.map("map", {
    center: [39.49, -98.34],
    zoom: 5
  });

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
});
quakeMap.addTo(myMap);

// Connect to geojson using D3
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(url, function(data) {
// Create functions: markers with size corresponding to quake mag by their size and depth by color (higher mag appear larger and greater depth appear darker in color)
    function markerSize(mag) {
        return mag * 4;
    };
    function getColor(depth) {
        switch(true) {
            case depth > 90:
                return "red";
            case depth > 70:
                return "orangered";
            case depth > 50:
                return "orange";
            case depth > 30:
                return "goldenrod"
            case depth > 10:
                return "yellow";
            default:
                return "greenyellow"
        }
    }
})



// Create popups that provide add'l info about the quake when a marker is clicked
        

// Create a legend that will provide context for map data (data point)
    

//legend.addTo(myMap);
  
//});

