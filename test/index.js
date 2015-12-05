'use strict';

var should = require('chai').should();

describe('i18n', function() {
  var Ctor = require('../lib/i18n');

  var i18n = new Ctor({
    languages: ['zh-TW', 'en']
  });

  // Load fixtures
  i18n.set('en', {
    ok: 'OK',
    add: 'Add',
    name: 'My name is %1$s %2$s.',
    index: {
      title: 'Home',
      video: {
        zero: 'No videos',
        one: 'A video',
        other: '%d videos'
      }
    }
  });

  i18n.set('zh-TW', {
    add: '新增',
    name: '我的名字是%2$s%1$s。',
    index: {
      title: '首頁',
      video: {
        zero: '沒有影片',
        one: '一部影片',
        other: '%d 部影片'
      }
    }
  });

  it('construCtor', function() {
    var i18n = new Ctor();
    i18n.languages.should.eql(['default']);

    i18n = new Ctor({
      languages: 'en'
    });

    i18n.languages.should.eql(['en']);

    i18n = new Ctor({
      languages: ['zh-TW', 'en']
    });

    i18n.languages.should.eql(['zh-TW', 'en']);
  });

  it('set()', function() {
    var i18n = new Ctor();

    i18n.set('en', {
      yes: 'Yes',
      no: 'No',
      index: {
        title: 'Home',
        author: {
          name: 'John'
        }
      }
    });

    i18n.data.en.should.eql({
      yes: 'Yes',
      no: 'No',
      'index.title': 'Home',
      'index.author.name': 'John'
    });
  });

  it('set() - lang must be a string', function() {
    try {
      i18n.set();
    } catch (err) {
      err.should.have.property('message', 'lang must be a string!');
    }
  });

  it('set() - data is required', function() {
    try {
      i18n.set('en');
    } catch (err) {
      err.should.have.property('message', 'data is required!');
    }
  });

  it('get() - default languages', function() {
    var result = i18n.get();

    result.should.eql({
      add: '新增',
      'index.title': '首頁',
      'index.video.zero': '沒有影片',
      'index.video.one': '一部影片',
      'index.video.other': '%d 部影片',
      name: '我的名字是%2$s%1$s。',
      ok: 'OK'
    });
  });

  it('get() - custom languages', function() {
    var result = i18n.get('en');

    result.should.eql({
      add: 'Add',
      'index.title': 'Home',
      'index.video.zero': 'No videos',
      'index.video.one': 'A video',
      'index.video.other': '%d videos',
      name: 'My name is %1$s %2$s.',
      ok: 'OK'
    });
  });

  it('remove()', function() {
    var i18n = new Ctor();

    i18n.set('en', {});
    i18n.remove('en');

    should.not.exist(i18n.data.en);
  });

  it('remove() - lang must be a string', function() {
    try {
      i18n.remove();
    } catch (err) {
      err.should.have.property('message', 'lang must be a string!');
    }
  });

  it('list()', function() {
    i18n.list().should.have.members(['en', 'zh-TW']);
  });

  it('__() - default languages', function() {
    var __ = i18n.__();

    __().should.eql('');
    __('add').should.eql('新增');
    __('ok').should.eql('OK');
    __('index.title').should.eql('首頁');
    __('name', '大呆', '王').should.eql('我的名字是王大呆。');
    __('Hello world').should.eql('Hello world');
  });

  it('__() - custom languages', function() {
    var __ = i18n.__('en');

    __('add').should.eql('Add');
    __('ok').should.eql('OK');
    __('index.title').should.eql('Home');
    __('name', 'John', 'Doe').should.eql('My name is John Doe.');
  });

  it('_p() - default languages', function() {
    var _p = i18n._p();

    _p().should.eql('');
    _p('ok').should.eql('OK');
    _p('index.video', 0).should.eql('沒有影片');
    _p('index.video', 1).should.eql('一部影片');
    _p('index.video', 10).should.eql('10 部影片');
    _p('Hello world').should.eql('Hello world');
  });

  it('_p() - custom languages', function() {
    var _p = i18n._p('en');

    _p('ok').should.eql('OK');
    _p('index.video', 0).should.eql('No videos');
    _p('index.video', 1).should.eql('A video');
    _p('index.video', 10).should.eql('10 videos');
  });
});
