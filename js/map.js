
// apiKey = "AIzaSyBTupUb0468KWAZEPYP1R9k0zpJ_Br0RpA";
// apiURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBTupUb0468KWAZEPYP1R9k0zpJ_Br0RpA";
var marker;
function initMap(){
  //  var mapDiv = $('.result-map').append('');
  //  var map = new google.maps.Map(mapDiv, {
  //    center: {lat: 44.540, lng: -78.546},
  //    zoom: 8
  //  });
  var sectMap = document.getElementsByClassName('result-map')[0];
  map = new google.maps.Map(sectMap, {
     center: {lat: 44.540, lng: -78.546},
     zoom: 8
   });

marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: {lat: 59.327, lng: 18.067}
  });
  marker.addListener('click', toggleBounce);
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
