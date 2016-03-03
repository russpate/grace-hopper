var templates = {};

templates.searchResultsTemplate = [
  "<div class='info-container'>",
    "<div class='bandade-artist'>",
      "<%= artists %>",
    "</div>",
      "<div class='bandade-venue'>Venue: ",
      "<%= venue %>",
    "</div>",
    "<div class='bandade-loc'>Location: ",
      "<%= city %>",
      "<%= region %>",
    "</div>",
    "<div class='bandade-time-date'> When: ",
      "<%= datetime %>",
      "<div class='bandade-tix'><a href='",
        "<%= ticket_url %>",
      "'>Purchase Tickets</a></p>",
      "</div>",
  "</div>"
].join("");
