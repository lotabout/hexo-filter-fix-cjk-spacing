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
[should contains no spaces]<chinese character>

.....中文结尾
中文顶格...

// are modified to
.....中文结尾中文顶格...
//           `- note no space here
```
