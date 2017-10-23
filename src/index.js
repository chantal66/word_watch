const $ = require('jquery');
const wordCount = require('./word-count');

document.addEventListener("DOMContentLoaded", () => {
  // have fun!
  // on click breakdown button submits text
  // on keyup enter
  wordCount.getTopWord();
  $('.break-down').on('click', wordCount.getText);
  $('.text-field').on('keyup', function(e) {
    if (e.keyCode === 13) {
      wordCount.getText()
    }
  })
});

