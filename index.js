const projectName = 'random-quote-machine';
let quotesData;
let currentQuote = '';
let currentAuthor = '';

// AJAX stands for Asynchronous JavaScript And XML:
// - Read data from a web server after the page has loaded
// - Update a web page without reloading the page
// - Send data to a web server in the background

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url:
'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
      }
    }
  });
}

// Here is created a random number for the array of the JSON file
function getRandomQuote() {
  return quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
}

// Here main function to update the quote
function getQuote() {
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;
  
  // Action to add a tweet with the quote on the screen
  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );

  // Action to add a tumbrl with the quote on the screen
  $('#tumblr-quote').attr(
    'href',
    'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
      encodeURIComponent(currentAuthor) +
      '&content=' +
      encodeURIComponent(currentQuote) +
      '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
  );
  
  // Animations part
  $('.quote-text').animate({ opacity: 0 }, 100, function () {
    $(this).animate({ opacity: 1 }, 200);
    $('#text').text(randomQuote.quote);
  });

  $('.quote-author').animate({ opacity: 0 }, 100, function () {
    $(this).animate({ opacity: 1 }, 200);
    $('#author').html(randomQuote.author);
  });
}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);
});
