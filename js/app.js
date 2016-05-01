$(document).ready(function() {
  $('.result-map').sticky({topSpacing:15});
  bandade.init();
});
var bandadeArray = "";
var mappedArray ="";
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
    $('#back-button').on('click', bandade.backButton);
  },
  mappedArray: function(arr){
    return arr.map(function (el) {
      return{
        artists: el.artists[0].name,
        datetime: moment.utc(el.datetime).format("MMM Do, YYYY"),
        ticket_url: el.ticket_url,
        venue: el.venue.name,
        latitude: el.venue.latitude,
        longitude: el.venue.longitude,
        city: el.venue.city,
        region: el.venue.region
      };
    });
  },
  locationSearch: function () {
    event.preventDefault();
    $('.search-result').removeClass('inactive');
    bandade.getLocationData(bandade.createLocationURL());
    $('.search-results-info').text("All shows for: " + '"' + $("#bandade-search-input").val() + '"');
    $('.hero').css('height','25vh');
    $('#back-button').hide();
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
     console.log ("i'm working");
     var artistArray = mappedArray.filter(function (el) {
     return $("#artist-input").val().toLowerCase() === el.artists.toLowerCase();
   });
     bandade.addToDom (artistArray);
     $('.search-results-info').show();
     $('#back-button').show();
     $('.search-results-info').text("Search Results for: " + '"' + $("#artist-input").val()+ '"' + " in " + $("#bandade-search-input").val());
     $('#artist-input').val('');
  },

  filterVenue: function (){
      event.preventDefault();
      var venueArray = mappedArray.filter(function (el) {
      return $("#venue-input").val().toLowerCase() === el.venue.toLowerCase();
    });
      bandade.addToDom(venueArray);
      $('.search-results-info').show();
      $('#back-button').show();
      $('.search-results-info').text("Search Results for: " + '"' + $("#venue-input").val()+ '"' + " in " + $("#bandade-search-input").val());
      $('#venue-input').val('');
  },

  filterRadius: function (){
    event.preventDefault();
    var radiusSearch = $('#radius-input').val();
    var finalLocation = bandade.createLocationURL();
    var radiusURL = finalLocation + "&radius=" + radiusSearch.replace(" miles","");
    bandade.getVenueData(radiusURL);
    $('.search-results-info').show();
    $('#back-button').show();
    $('.search-results-info').text("Radius Search Results: " + '"' + $("#radius-input").val()+ '"');
    $('#radius-input').val('');

  },

  backButton: function () {
    event.preventDefault();
    $('.search-results-info').hide();
    bandade.locationSearch();
  },

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
           title: coord.title,
           animation: google.maps.Animation.DROP,
         });
         marker.addListener('click', toggleBounce);
       }),
       map.setOptions({center:bandade.eventLocationStore[0][0]})
       // reset map.setOptions with a center,
        window.glob = location;
        bandadeArray = location; //creating array of all data
        // bandade.addToDom(location, $('.main'));
        mappedArray = bandade.mappedArray(location);
        bandade.addToDom(mappedArray);
      }
    });
  },

  getVenueData: function (url) {
   $.ajax({
     url: url,
     method: 'GET',
     dataType: 'jsonp',
     success: function (radius) {
       bandade.addToDom(bandade.mappedArray(radius));
     }
   });
 },

}; //end of bandade obj


// apiUrl = "http://api.bandsintown.com/events/search?location=Charleston,SC&radius=20&format=json&app_id=bandade";
