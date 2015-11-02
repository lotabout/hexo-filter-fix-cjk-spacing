var cjk_fix = require('../lib/fix-cjk-spacing');    

describe('fix-cjk-spacing', function() {
  // test
  it('should work on continuous CJK lines.', function() {
    var data = "中文\n中文\n中文";
    var result = cjk_fix(data);
    var expected = "中文中文中文";
    console.assert(result === expected);
  });

  it('should not work with ending that is not CJK.', function() {
    var data = "中文 \n中文.\n中文";
    var result = cjk_fix(data);
    var expected = "中文 \n中文.\n中文";
    console.assert(result === expected);
  });

  it('should work with one CJK character line.', function() {
    var data = "中\n中\n中\n";
    var result = cjk_fix(data);
    var expected = "中中中\n";
    console.assert(result === expected);
  });

  it('should work with CJK punctions.', function() {
    var data = "中《\n中文\n》\n，\n中文";
    var result = cjk_fix(data);
    var expected = "中《中文》，中文";
    console.assert(result === expected);
  });

  it('should work with General Punctions.', function() {
    var data = "“\n”";
    var result = cjk_fix(data);
    var expected = "“”";
    console.assert(result === expected);
  });
});
