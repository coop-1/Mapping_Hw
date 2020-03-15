var bounds = [
  [-90, -180], //SW
  [90, 180] //NE
  ];

var map = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 5,
  maxBounds: bounds
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 12,
  minZoom: 2,
  id: "mapbox.light",
  continuousWorld: false,
  noWrap: true,
  accessToken: API_KEY
}).addTo(map);


d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson',function(response){


  var locations = [];

  for (i = 0; i < response['features'].length; i++){
    var temp = [];
    temp.push(response.features[i]);
    locations.push(temp)
  };

  function QuakeColor(mag){
    if (mag >= 5){
      return "#FF0000";}//red
    else if (mag >= 4 && mag <5){
      return "#A52A2A";}//'brown'
    else if (mag >= 3 && mag <4){
      return "#8B4513";}//saddlebrown
    else if (mag >= 2 && mag <3){
      return "#F4A460";}//sandybrown
    else if (mag >= 1 && mag <2){
        return "#DEB887"; }//burlywood
    else if (mag < 1){
        return "#FFF8DC";}//cornsilk
  };

  function QuakeRadius(mag) {
    if (mag <= 0) {
      return 1;}
    else
      return mag * 5;
  };

  map.on('overlayadd', function(){ $('.legend div').show() });

  L.geoJson(response, {
      // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, locations) {
      return L.circleMarker(locations)}
      ,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>Location: " + feature.properties.place + "</h3>Magnitude: " + feature.properties.mag + "<br>Type: " + feature.properties.type + "<br>Quake Timestamp: " + new Date(feature.properties.time))}
      ,
    style: function(feature){
      return {
        radius: QuakeRadius(feature.properties.mag),
        fillColor: QuakeColor(feature.properties.mag),
        fillOpacity: 1,
        weight: 2,
        color: 'white'
          
      }}}).addTo(map);
      
var legend = L.control({position: 'bottomright'});

legend.onAdd = function() {
  return L.DomUtil.create("div", "legend");
};
legend.addTo(map);

document.querySelector(".legend").innerHTML = [
  '<h4>Quake Magnitude (Richter Scale)</h4>',
  '<i style="background: #FF0000">Greater than 5</i></div>',
  '<div><span style="background: #A52A2A">Between 4 and 5</span></div>',
  '<div><i style="background: #8B4513">Between 3 and 4</i></div>',
  '<div><i style="background: #F4A460">Between 2 and 3</i></div>',
  '<div><i style="background: #DEB887">Between 1 and 2</i></div>',
  '<div><i style="background: #FFF8DC">Less than 1</i></div>'
].join("");

  
});
