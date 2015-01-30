/**
 * online-branch-exist <https://github.com/tunnckoCore/online-branch-exist>
 *
 * Copyright (c) 2014-2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var assert = require('assert');
var onlineExist = require('./index');

describe('online-branch-exist:', function() {
  describe('should have `.tag` and `.branch` methods', function() {
    it('should have `.tag` method', function(done) {
      onlineExist.tag('tunnckoCore/koa-better-body#v1.0.16', function(err, res) {
        assert.strictEqual(err, null);
        assert.strictEqual(res, true);
        done();
      });
    });
    it('should have `.branch` method', function(done) {
      onlineExist.branch('tunnckoCore/koa-better-body#master', function(err, res) {
        assert.strictEqual(err, null);
        assert.strictEqual(res, true);
        done();
      });
    });
  });
  describe('should throw', function() {
    it('Error when no arguments', function(done) {
      function fixture() {
        onlineExist();
      }
      assert.throws(fixture, Error);
      done();
    });
    it('Error when no `callback`', function(done) {
      function fixture() {
        onlineExist({some: true});
      }
      assert.throws(fixture, Error);
      done();
    });
    it('TypeError when `callback` not a function', function(done) {
      function fixture() {
        onlineExist({some: true}, [1, 2, 3]);
      }
      assert.throws(fixture, TypeError);
      done();
    });
  });
  describe('should pass error to callback', function() {
    it('TypeError when `pattern` not a string', function(done) {
      onlineExist({one: 'two'}, function(err, res) {
        assert.strictEqual(res, undefined);
        assert.strictEqual(err instanceof TypeError, true);
        assert.strictEqual(err.message, '[online-branch-exist] expect `pattern` be string');
        done();
      });
    });
    it('Error when `pattern` not a valid `user/repo#branch` pattern', function(done) {
      onlineExist('not valid pattern', function(err, res) {
        assert.strictEqual(res, undefined);
        assert.strictEqual(err instanceof Error, true);
        assert.strictEqual(err.message, '[online-branch-exist] expect `pattern` be `user/repo#branch`');
        done();
      });
    });
    it('Error when not existing user/org or repo in github', function(done) {
      onlineExist('dask4j3h5k34sah534/fjksdhf#master', function(err, res) {
        assert.strictEqual(res, undefined);
        assert.strictEqual(err instanceof Error, true);
        done();
      });
    });
  });
  describe('should work properly, err be `null`, res be boolean', function() {
    it('res should be `true`', function(done) {
      onlineExist('tunnckoCore/koa-better-body#v1.0.3', function(err, res) {
        assert.strictEqual(err, null);
        assert.strictEqual(res, true);
        done();
      });
    });
    it('res should be `false`', function(done) {
      onlineExist('tunnckoCore/koa-better-body#abcdefg', function(err, res) {
        assert.strictEqual(err, null);
        assert.strictEqual(res, false);
        done();
      });
    });
  });
});
