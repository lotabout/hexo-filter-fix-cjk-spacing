'use strict';

module.exports = function(content) {
  function join_cjk(text) {
    return text.replace(/([\u4E00-\u9FA5])(\n|\r\n)([\u4E00-\u9FA5])/, "$1$3");
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
