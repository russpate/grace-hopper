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
      var url = bandade.mainURL + searchTerm.replace(" ","+") + '&format=json&app_id=bandade';
      bandade.getLocationData(url);
    });
  },
  addToDom: function (item) {
    $('.search-result').append('');
    _.each(item, function (el){
      console.log(el);
      var tmpl = _.template(templates.searchResultsTemplate);
      $('.search-result').append(tmpl(el));
    });
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
  }
}; //end of bandade obj

// apiUrl = "http://api.bandsintown.com/events/search?location=Charleston,SC&radius=20&format=json&app_id=bandade";
