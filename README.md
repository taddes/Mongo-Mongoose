# Mongo-Mongoose Scraper
A web app that lets users view and leave comments on the latest news from TrekMovie.com. All articles are scraped from other sites.
<hr>
Link to the deployed app: https://immense-escarpment-69009.herokuapp.com/

This Node.js application makes use of the following npm packages: `express`, `express-handlebars`, `mongoose`, `body-parser`, `cheerio`, and `request`

All articles that are scraped, via `cheerio` are saved as a collection in MongoDB.

This app scrapes and displays the following information for each article:

 * Headline - the title of the article

 * URL - the url to the original article

A secondary aspect of the function is that a user can click on the title or link of a given article to add a note, including a note title and a note body contents.  This is saved as an additional collection in the MongoDB.

Hoped future development will include images, clickable links, storing and accessing past articles.

 
 
