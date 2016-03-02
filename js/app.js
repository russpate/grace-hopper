$(document).ready(function() {
  bandade.init();
});

var bandade = {
  mainURL:'http://api.bandsintown.com/events/search?location=',
  init: function () {
    bandade.initStyling();
    bandade.initEvents();
  },
  initStyling: function () {
  },
  initEvents: function () {
    $('#bandadeform').on('submit', bandade.locationSearch);
    $('#artist').on('submit', bandade.filterArtist);
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

   filterArtist: function () {
     event.preventDefault();
      var artistSearch = $('#artist-input').val();
      var finalLocation = bandade.createLocationURL();
      var artistURL = finalLocation + "&artists[]=" + artistSearch.replace(" ","");
      bandade.getArtistData(artistURL);
  },

  addToDom: function (item) {
    $('.main').html('');
    _.each(item, function (el){
      console.log(el);
      var tmpl = _.template(templates.searchResultsTemplate);
      $('.main').append(tmpl(el));
    });
  },
  getLocationData: function (url) {
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'jsonp',
      success: function (location) {
        bandade.addToDom(location, $('.main'));
      }
    });
  },
  getArtistData: function (url) {
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'jsonp',
      success: function (artist) {
        window.glob = artist;
        bandade.addToDom(artist, $('.main'));
      }
    });
  },
}; //end of bandade obj

// apiUrl = "http://api.bandsintown.com/events/search?location=Charleston,SC&radius=20&format=json&app_id=bandade";
