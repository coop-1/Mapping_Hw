var myMap = L.map("map", {
    center: [45.52, -122.67],
    zoom: 13
  });

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: "pk.eyJ1IjoiY29vcC0xIiwiYSI6ImNrNjhrcmdodTA2M2IzbHBqcnVlcTR3M2oifQ.THZRNilABJpszDqpWxQO6Q"
  }).addTo(myMap);



d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson',function(response){
    
    //0 is iterable in loop

    var latitude = response.features[0]['geometry']['coordinates'][1];
    var longitude = response.features[0]['geometry']['coordinates'][0];

    var magnitude = response.features[0]['properties']['mag'];
    var place = response.features[0]['properties']['place'];

    console.log(response.features[0])
    console.log(latitude)
    console.log(longitude)
    console.log(magnitude)

});

