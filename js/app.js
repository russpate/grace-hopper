$(document).ready(function() {
  bandade.init();
});

var bandade = {
  mainURL:'http://api.bandsintown.com/events/search?location=',
  init: function () {
    bandade.initStyling();
    bandade.initEvents();
    // initMap();
  },
  initStyling: function () {
  },
  initEvents: function () {
    $('#bandadeform').on('submit',  function (event) {
      event.preventDefault();
      $('.search-result').removeClass('inactive');
      var searchTerm = $("#bandade-search-input").val();
      var url = bandade.mainURL + searchTerm.replace(" ","+") + '&per_page=100&format=json&app_id=bandade';
      bandade.getLocationData(url);
    });
  },
  addToDom: function (item) {
    $('.search-result').html('');
    _.each(item, function (el){
      console.log(el);
      var tmpl = _.template(templates.searchResultsTemplate);
      $('.search-result').append(tmpl(el));
    });
  },
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

  getLocationData: function (url) {
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'jsonp',
      success: function (location) {
        window.glob = location;
        // map.data.loadGeoJson(url);
        bandade.addToDom(location, $('.main'));
      }
    });
  }
}; //end of bandade obj

// apiUrl = "http://api.bandsintown.com/events/search?location=Charleston,SC&radius=20&format=json&app_id=bandade";
