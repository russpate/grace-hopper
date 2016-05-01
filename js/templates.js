var templates = {};

templates.searchResultsTemplate = [
  "<div class='info-container'>",
    "<div class='event-info-wrap col-md-8 col-xs-12'>",
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
      "</div>",
    "</div>",
    "<div class='tix-wrap col-md-4 col-xs-12'>",
      "<div class='bandade-tix'><a href='",
        "<%= ticket_url %>",
      "'><button>Purchase Tickets</button></a></p>",
      "</div>",
    "</div>",
  "</div>"
].join("");

// templates.filterResultsTemplate = [
//   "<div class='info-container'>",
//     "<div class='bandade-artist'>",
//       "<%= artists[0].name %>",
//     "</div>",
//       "<div class='bandade-venue'>Venue: ",
//       "<%= venue.name %>",
//     "</div>",
//     "<div class='bandade-loc'>Location: ",
//       "<%= venue.city %>",
//       "<%= venue.region %>",
//     "</div>",
//     "<div class='bandade-time-date'> When: ",
//       "<%= datetime %>",
//       "<div class='bandade-tix'><a href='",
//         "<%= ticket_url %>",
//       "'>Purchase Tickets</a></p>",
//       "</div>",
//   "</div>"
// ].join("");
