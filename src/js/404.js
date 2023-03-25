const Quote = require('inspirational-quotes');
const quoteText = document.getElementById('quote');

quoteText.innerText = Quote.getQuote().text;