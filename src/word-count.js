const $ = require('jquery');
const host = require('./config.js').hostUrl;
const apiHelper = require('./helpers/apiHelper');
const htmlHelper = require('./helpers/htmlHelper');

class wordCount {
  static getTopWord(){
    apiHelper.getTopUsedWordApi()
      .then(wordCount.appendTopWord)
  }

  static appendTopWord(data) {
    const topWord = Object.keys(data['word'])[0];
    const times = data['word'][topWord];

    $('.top-heading').append(`${topWord} (${times})`)
  }

  static buildFrequency() {
    const downcaseWords = htmlHelper.cleanText();

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
      htmlHelper.appendStyles(word, frequency);
      wordCount.postWords(word, frequency)
    }
  }

  static postToApi(word) {
    let data = { word: { value: word } };
    apiHelper.postApi(data)
  }

  static postWords(word, frequency) {
    for (let j = 0; j < frequency; j++) {
      wordCount.postToApi(word)
    }
  }
}

module.exports = wordCount;
