var cjk_fix = require('../lib/fix-cjk-spacing');
var assert = require('assert');

describe('fix-cjk-spacing', function() {
  // test
  it('should work on continuous CJK lines.', function() {
    var data = "中文\n中文\n中文";
    var result = cjk_fix(data);
    var expected = "中文中文中文";
    assert.equal(result, expected);
  });

  it('should not work with ending that is not CJK.', function() {
    var data = "中文 \n中文.\n中文";
    var result = cjk_fix(data);
    var expected = "中文 \n中文.\n中文";
    assert.equal(result, expected);
  });

  it('should work with one CJK character line.', function() {
    var data = "中\n中\n中\n";
    var result = cjk_fix(data);
    var expected = "中中中\n";
    assert.equal(result, expected);
  });

  it('should work with CJK punctions.', function() {
    var data = "中《\n中文\n》\n，\n中文";
    var result = cjk_fix(data);
    var expected = "中《中文》，中文";
    assert.equal(result, expected);
  });

  it('should work with General Punctions.', function() {
    var data = "“\n”";
    var result = cjk_fix(data);
    var expected = "“”";
    assert.equal(result, expected);
  });

  it('should work with lists across lines(space)', function() {
    var data = "1. 中\n    文";
    var result = cjk_fix(data);
    var expected = "1. 中文";
    assert.equal(result, expected);
  });

  it('should work with lists across lines(tab)', function() {
    var data = "1. 中\n\t文";
    var result = cjk_fix(data);
    var expected = "1. 中文";
    assert.equal(result, expected);
  });

  it('should not replace backtick code block', function() {
    var data = "```\n中\n文```";
    var result = cjk_fix(data);
    var expected = "```\n中\n文```";
    assert.equal(result, expected);
  });
});
