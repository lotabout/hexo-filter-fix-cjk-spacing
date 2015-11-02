'use strict';

var fix_cjk_spacing = require('./lib/fix-cjk-spacing.js');
hexo.extend.filter.register('after_post_render', function(data) {
  data.content = fix_cjk_spacing(data.content);
});
