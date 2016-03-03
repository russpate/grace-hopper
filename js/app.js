$(document).ready(function() {
  bandade.init();
});
var bandadeArray = "";
var bandade = {
  mainURL:'http://api.bandsintown.com/events/search?location=',
  eventLocationStore: [],
  init: function () {
    bandade.initStyling();
    bandade.initEvents();
    // initMap();
  },
  initStyling: function () {
  },
  initEvents: function () {
    $('#bandadeform').on('submit', bandade.locationSearch);
    $('#artist').on('submit', bandade.filterArtist);
    $('#venue').on('submit', bandade.filterVenue);
    $('#radius').on('submit', bandade.filterRadius);
  },

  locationSearch: function () {
    event.preventDefault();
    $('.search-result').removeClass('inactive');
    bandade.getLocationData(bandade.createLocationURL());
  },

  createLocationURL: function () {
    var searchTerm = $("#bandade-search-input").val();
    var locationURL = bandade.mainURL + searchTerm.replace(" ","+") + '&per_page=100&format=json&app_id=bandade';
    return locationURL;
  },

  addToDom: function (item) {
    $('.main').html('');
    _.each(item, function (el){
      var tmpl = _.template(templates.searchResultsTemplate);
      $('.main').append(tmpl(el));
    });
  },

  filterArtist: function () {
     event.preventDefault();
     var artistArray = bandadeArray.filter(function (el) {
     return $("#artist-input").val() === el.artists[0].name;
   });
     bandade.addToDom (artistArray);
  },

  filterVenue: function (){
      event.preventDefault();
      var venueArray = bandadeArray.filter(function (el) {
      return $("#venue-input").val() === el.venue.name;
    });
      bandade.addToDom (venueArray);
  },

  filterRadius: function (){
    event.preventDefault();
    var radiusSearch = $('#radius-input').val();
    var finalLocation = bandade.createLocationURL();
    var radiusURL = finalLocation + "&radius=" + radiusSearch;
    bandade.getVenueData(radiusURL);
  },

  // filterArtists: function () {
  //     event.preventDefault();
  //      var artistSearch = $('#artist-input').val();
  //      var finalLocation = bandade.createLocationURL();
  //      var artistURL = finalLocation + "&artists[]=" + artistSearch.replace(" ","");
  //      bandade.getArtistData(artistURL);
  //  },

  getLocationData: function (url) {
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'jsonp',
      success: function (location) {
        var coords = location.map(function(el) {
         return { lat: el.venue.latitude, lng: el.venue.longitude, title: el.venue.name };
       });
       bandade.eventLocationStore = [];
       bandade.eventLocationStore.push(coords);
       bandade.eventLocationStore[0].slice(0,10).forEach(function(coord,idx) {

         var marker = new google.maps.Marker({
           position: coord,
           map: map,
           title: coord.title
         });
       }),
       map.setOptions({center:bandade.eventLocationStore[0][0]});
       // reset map.setOptions with a center,
        window.glob = location;
        bandadeArray = location; //creating array of all data
        bandade.addToDom(location, $('.main'));
      }
    });
  },

  getVenueData: function (url) {
   $.ajax({
     url: url,
     method: 'GET',
     dataType: 'jsonp',
     success: function (radius) {
       bandade.addToDom(radius, $('.main'));
     }
   });
 },

}; //end of bandade obj


// apiUrl = "http://api.bandsintown.com/events/search?location=Charleston,SC&radius=20&format=json&app_id=bandade";
