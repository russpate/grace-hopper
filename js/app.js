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
  //
  // This is what I was attempting for the template but
  // wasn't able to get it to work just yet.
  //
  // addToDom: function (data) {
  //   var tmpl = _.template(templates.searchResultsTemplate);
  //   $('.searchResult').html('');
  //   _.each(item, function (el)
  //   {$('.searchResult').append(tmpl(el));
  //   });
  // },
  addToDom: function (location, $target) {
    $target.html('');
    var htmlInsert = "";
    _.each(location, function(item, idx) {
        htmlInsert += "<div class = info-container>";
        htmlInsert += "<p>" + "Artist: "  + item.artists[0].name + "</p>";
        htmlInsert += "<p>" + "Venue: "  + item.venue.name + "</p>";
        htmlInsert += "<p>" + "Location: "  + item.venue.city + " " + item.venue.region + "</p>";
        htmlInsert += "<p>" + "Purchase Tickets: "  + item.ticket_url + "</p>";
        htmlInsert += "<p>" + "Time and Data: "  + item.datetime + "</p>";
        htmlInsert += "</div>";
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
