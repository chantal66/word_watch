const $ = require('jquery');
const host = require('./config.js').host;


class wordCount {


  static getTopWord(){
    wordCount.getTopUsedWordApi()
      .then(wordCount.appendTopWord)
  }
  static getTopUsedWordApi() {
    return $.getJSON(`${host}/top_word`)
  }



  // getText from text area
  // build the frecuency of the words
  // append to html
}

