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


  static appendTopWord(data) {
    const topWord = Object.keys(data['word'])[0];
    const times = data['word'][topWord];

    $('.top-heading').append(`${topWord} (${times})`)
  }

  static cleanFormatText() {
    const text = $('.text-field').val();
    const words = text.replace(/('re)/g, " are").replace(/(\r\n|\n|\r)/gm," ").replace(/('m)/g, " am").replace(/('t)/g, " not").replace(/('ll)/g, " will").replace(/('em)/g, " them").replace(/[&\/\\#,+()$~%.'":*-?<>{}]/g, '').split(" ")
    return words.map((word) =>  {
      return word.toLowerCase()
    });
  }

  static buildFrequency() {
    const downcaseWords = wordCount.cleanFormatText();

    return downcaseWords.reduce((counterObject, word) => {
      if(!counterObject[word]) {
        counterObject[word] = 0
      }
      counterObject[word] += 1;
      return counterObject
    }, {})
  }
  static getText() {
    const result = wordCount.buildFrequency();
    wordCount.appendPostWords(result)
  }

  static appendPostWords(result) {
    const resultKeys = Object.keys(result);
    for (let i = 0; i < resultKeys.length; i++) {
      const word = resultKeys[i];
      const frequency = result[resultKeys[i]];
      wordCount.appendStyles(word, frequency);
      wordCount.postWords(word, frequency)
    }
  }

  static appendStyles(word, frequency) {
    $('article.word-count').append(`<span class='${word}-count'>${word}</span>`);
    $(`.${word}-count`).css('font-size', `${frequency}em`).css('margin', '3px')
  }

  static postToApi(word) {
    let data = { word: { value: word } };
    $.post(`${host}/words`, data)
  }


  static postWords(word, frequency) {
    for (let j = 0; j < frequency; j++) {
      wordCount.postToApi(word)
    }
  }






  // getText from text area
  // build the frecuency of the words
  // append to html
}

module.exports = wordCount;
