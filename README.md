# i18n

[![Build Status](https://travis-ci.org/hexojs/i18n.svg?branch=master)](https://travis-ci.org/hexojs/i18n)  [![NPM version](https://badge.fury.io/js/hexo-i18n.svg)](http://badge.fury.io/js/hexo-i18n) [![Coverage Status](https://img.shields.io/coveralls/hexojs/i18n.svg)](https://coveralls.io/r/hexojs/i18n?branch=master)

i18n module for [Hexo].

## Installation

``` bash
$ npm install hexo-i18n --save
```

## Usage

``` js
var i18n = new require('hexo-i18n')({
  languages: ['zh-TW', 'en']
});

i18n.load('en', {
  ok: 'OK',
  name: 'My name is %1$s %2$s.',
  index: {
    title: 'Home'
  },
  video: {
    zero: 'No videos',
    one: 'A video',
    other: '%d videos'
  }
});

i18n.load('zh-TW', {
  name: '我的名字是 %2$s %1$s。',
  index: {
    title: '首頁'
  },
  video: {
    zero: '沒有影片',
    one: '一部影片',
    other: '%d 部影片'
  }
});

var __ = i18n.__();
var _p = i18n._p();

__('ok') // OK
__('index.title') // 首頁
__('name', '大呆', '王') // 我的名字是王大呆
_p('video', 0) // 沒有影片
_p('video', 1) // 一部影片
_p('video', 10) // 10 部影片
```

## License

MIT

[Hexo]: http://hexo.io/