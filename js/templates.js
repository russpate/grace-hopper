var templates = {};

templates.searchResultsTemplate = [
  "<div class='info-container'>",
    "<p>Artist: ",
      "<%= item.artists[0].name %>",
    "</p>",
      "<p>Venue: ",
      "<%= item.venue.name %>",
    "</p>",
    "<p>Location: ",
      "<%= item.venue.city %>",
      "<%= item.venue.region %>",
    "</p>",
    "<p>Purchase Tickets: ",
      "<%= item.ticket_url %>",
    "</p>",
    "<p>Time and Data: ",
      "<%= item.datetime %>",
    "</p>",
  "</div>"
].join("");
