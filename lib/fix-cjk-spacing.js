'use strict';

/*
  Regular Expressions
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

  2000-206F General Punctuation
  3000-303F 中日韓符號和標點
  3040-309F 日文平假名 (V)
  30A0-30FF 日文片假名 (V)
  3100-312F 注音字母 (V)
  31C0-31EF 中日韓筆畫
  31F0-31FF 日文片假名語音擴展
  3200-32FF 帶圈中日韓字母和月份 (V)
  3400-4DBF 中日韓統一表意文字擴展 A (V)
  4E00-9FFF 中日韓統一表意文字 (V)
  AC00-D7AF 諺文音節 (韓文)
  F900-FAFF 中日韓兼容表意文字 (V)
  FF00-FFEE Halfwidth and Fullwidth Forms
  http://unicode-table.com/cn/
  copied from https://github.com/huei90/pangu.node/blob/master/pangunode.js
*/


var cjk_chars = "([\u2000-\u206f\u3000-\u312F\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af\uf900-\ufaff\uff00-\uffee])";
var cjk_lines = new RegExp(cjk_chars+ "((?:\n|\r\n)[ \t]*)(?=" + cjk_chars+ ")", 'g');

module.exports = function(content) {

  function join_cjk(text) {
    return text.replace(cjk_lines, "$1");
  }

  function fix_cjk_spacing(content) {
    var regx_backtick = /(\s*)(`{3,}|~{3,}) *(.*) *\n([\s\S]+?)\s*\2(\n+|$)/g;
    var tmp_array;
    var start_index = 0;
    var new_content = [];
    while ((tmp_array = regx_backtick.exec(content)) !== null) {
      // add all
      new_content.push(join_cjk(content.substr(start_index, tmp_array.index - start_index)));

      // add code block
      new_content.push(tmp_array[0]);
      start_index = regx_backtick.lastIndex;
    }

    new_content.push(join_cjk(content.substr(start_index)));
    return new_content.join('');
  }

  return fix_cjk_spacing(content);
};
