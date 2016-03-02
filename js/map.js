// apiKey = "AIzaSyBTupUb0468KWAZEPYP1R9k0zpJ_Br0RpA";
// apiURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBTupUb0468KWAZEPYP1R9k0zpJ_Br0RpA";

function initMap(){
  var sectMap = document.getElementsByClassName('result-map')[0];
  var map = new google.maps.Map(sectMap, {
     center: {lat: 32.7833, lng: -79.9333},
     zoom: 8
   });
}



// initMap: function (){
//   var sectMap = document.getElementsByClassName('result-map')[0];
//   var map = new google.maps.Map(sectMap, {
//      center: {lat: 32.7833, lng: -79.9333},
//      zoom: 8
//    });
// },

// myMap: function(el){
//   myData.map(function(el) {
//     return {
//       lat: el.venue.latitude,
//       lng: el.venue.longitude
//     };
//   });
// },
