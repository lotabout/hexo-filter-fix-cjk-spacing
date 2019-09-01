Hexo will add extra space of continous lines with CJK characters.

```
.....中文结尾
中文顶格...

will result in

.....中文结尾 中文顶格...
             `- note the space here
```

This plugin will fix that.

# Usage

```bash
$ npm install hexo-filter-fix-cjk-spacing --save
```

If you want to disable this plugin, add the following line in your
`_config.yml`:

```
fix_cjk_spacing: false
```

Note that Hexo' [marked.js](https://github.com/hexojs/hexo-renderer-marked)
uses GitHub flavored markdown which will parse every line break in markdown
into `<br>`. Use the following to disabled it:

```js
marked:
  breaks: false
```

# The problem

In markdown, if we write several lines continuously, it will be parsed as a
whole block:

```
line 1
line 2
line 3

// will be parsed as

<p>line 1
line 2
line 3</p>
```

That means line breaks are kept and all the three lines are treated as a whole
paragraph.

However, the browser will convert the line break in a `<p>` into a single
space, so when we see the previous content in a browser, it will look like:

```
line 1 line 2 line 3
```

That is OK except when we use Chinese. There is no concept of space in
Chinese, so when we write:

```
中文第一行
中文接上行

// will show as

中文第一行 中文接上行
//        `- not the space here
```

It is really frustrating! So there are two major solutions:

1. Fixing the markdown parsing code to treat it correctly.
2. Write the whole paragraph in a long line.

The first option is actually not so pratical. This 'bug' exist for so long and
still not fixed. The second will be so boring and un-friendly.

So here comes our solution with `hexo`: Write a filter to merge chinese lines
automatically before parsing!

# The use case

Only the following situation are dealt with:

```
...<chinese character>[should contains no spaces]
[zero or more spaces|tab]<chinese character>

.....中文结尾
中文顶格...

// are modified to
.....中文结尾中文顶格...
//           `- note no space here
```

Note that the content in fenced code block will *not* be changed. But indented
code blocks *will* be changed
