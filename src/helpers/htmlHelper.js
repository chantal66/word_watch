const $ = require('jquery');

class htmlHelper {
  static appendStyles(word, frequency) {
    $('article.word-count').append(`<span class='${word}-count'>${word}</span>`);
    $(`.${word}-count`).css('font-size', `${frequency}em`).css('margin', '2px')
  }

  static cleanText() {
    const text = $('.text-field').val();
    const words = text.replace(/('re)/g, " are").replace(/(\r\n|\n|\r)/gm," ").replace(/('m)/g, " am").replace(/('t)/g, " not").replace(/('ll)/g, " will").replace(/('em)/g, " them").replace(/[&\/\\#,+()$~%.'":*-?<>{}]/g, '').split(" ")
    return words.map((word) =>  {
      return word.toLowerCase()
    });
  }
}

module.exports = htmlHelper;