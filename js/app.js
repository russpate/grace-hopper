apiUrl = "http://api.bandsintown.com/events/search?location=Charleston,SC&radius=20&format=json&app_id=bandade";

$(document).ready(function() {
});
var appID = ("bandade");
var bandAde = {
  init: function(){

  },
  styling: function(){

  },
  events: function(){

  },
  getFromDom: function(){

  },
  addToDom: function(){

  },
  getData: function(url){
    $.ajax({
      url: url,
      method: 'GET',
      data: param,
      success: function (response) {
          // code goes here
      },
      error: function (err) {
        console.log(err);
      }
    });
  },

  submitSearch: function(){

  }
}; // bandAde Page Array
