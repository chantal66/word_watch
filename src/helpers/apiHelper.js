const $ = require('jquery');
const host = require('../config.js').hostUrl;

class apiHelper {
  static getTopUsedWordApi() {
    return $.getJSON(`${host}/top_word`)
  }

  static postApi(data){
    $.post(`${host}/words`, data)
  }
}

module.exports = apiHelper;