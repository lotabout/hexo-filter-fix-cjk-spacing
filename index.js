'use strict';

var fix_cjk_spacing = require('./lib/fix-cjk-spacing.js');

// configuration
var enabled = hexo.config.fix_cjk_spacing;

hexo.extend.filter.register('before_post_render', function(data) {
  if (enabled === undefined || enabled === true) {
    data.content = fix_cjk_spacing(data.content);
  }
});
