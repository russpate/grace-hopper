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
    $('#bandadeform').on('submit',  function (event) {
      event.preventDefault();
      var searchTerm = $("#bandade-search-input").val();
      var url = bandade.mainURL + searchTerm.replace(" ","") + '&format=json&app_id=bandade';
      bandade.getLocationData(url);
    });
  },

  addToDom: function (location, $target) {
    $target.html('');
    var htmlInsert = "";
    _.each(location, function(item, idx) {
        htmlInsert += "<p>" + "Artist: " + "</p>" + item.artists[0].name;
    });
    $target.append(htmlInsert);
  },

  getLocationData: function (url) {
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'jsonp',
      success: function (location) {
        window.glob = location;
        bandade.addToDom(location, $('.main'));
      }
    });
  },



}; //end of banade obj

// apiUrl = "http://api.bandsintown.com/events/search?location=Charleston,SC&radius=20&format=json&app_id=bandade";
