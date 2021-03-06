/**
 * online-branch-exist <https://github.com/tunnckoCore/online-branch-exist>
 *
 * Copyright (c) 2014-2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var test = require('assertit');
var onlineExist = require('./index');

test('online-branch-exist:', function() {
  test('should throw', function() {
    test('TypeError if `callback` is not a function', function(done) {
      function fixture() {
        onlineExist();
      }
      test.throws(fixture, TypeError);
      test.throws(fixture, /expect `callback` to be function/);
      done();
    });
    test('TypeError if `pattern` is not a string', function(done) {
      function fixture() {
        onlineExist({some: true}, function() {});
      }
      test.throws(fixture, TypeError);
      test.throws(fixture, /expect `pattern` to be string/);
      done();
    });
    test('TypeError if `opts` is not an object', function(done) {
      function fixture() {
        onlineExist('foo/bar#baz', 'qux', function() {});
      }
      test.throws(fixture, TypeError);
      test.throws(fixture, /expect `opts` to be object/);
      done();
    });
    test('Error if not valid `pattern` given', function(done) {
      function fixture() {
        onlineExist('foobar', function() {});
      }
      test.throws(fixture, Error);
      test.throws(fixture, /expect `pattern` to be `user\/repo\#branch`/);
      done();
    });
    test('Error if valid `pattern`, but no branch/tag given', function(done) {
      function fixture() {
        onlineExist('foo/bar', function() {});
      }
      test.throws(fixture, Error);
      test.throws(fixture, /should give a branch or tag in `pattern`/);
      done();
    });
  });
  test('should onlineExist(pattern, cb) check if `branch` exist then `tag`', function() {
    test('should return `true` if branch exist', function(done) {
      onlineExist('tunnckoCore/koa-better-body#master', function(err, res) {
        test.equal(err, null);
        test.equal(res, true);
        done();
      });
    });
    test('should return `true` if tag exist', function(done) {
      onlineExist('tunnckoCore/koa-better-body#v1.0.16', function(err, res) {
        test.equal(err, null);
        test.equal(res, true);
        done();
      });
    });
    test('should return `false` if branch or tag not exists', function(done) {
      onlineExist('tunnckoCore/koa-better-body#asfsdfdsf', function(err, res) {
        test.equal(err, null);
        test.equal(res, false);
        done();
      });
    });
  });
  // test('should have `opts.token` option for Github Access Token api', function(done) {
  //   // atm
  // });
  test('should have `.tag` and `.branch` methods', function() {
    test('should have `.tag` method', function(done) {
      onlineExist.tag('tunnckoCore/koa-better-body#v1.0.16', function(err, res) {
        test.equal(err, null);
        test.equal(res, true);
        done();
      });
    });
    test('should have `.branch` method', function(done) {
      onlineExist.branch('tunnckoCore/koa-better-body#master', function(err, res) {
        test.equal(err, null);
        test.equal(res, true);
        done();
      });
    });
  });
});
