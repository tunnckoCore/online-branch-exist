/**
 * online-branch-exist <https://github.com/tunnckoCore/online-branch-exist>
 *
 * Copyright (c) 2014-2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var fs = require('fs');
var fmt = require('util').format;
var got = require('got');
var errs = require('handle-errors')('online-branch-exist');
var regex = require('github-short-url-regex')();
var isObject = require('is-plain-object');

var endpoint = 'https://api.github.com/repos/';
var format = '%s%s/%s/git/%s';
var cache = {};

function onlineExist(pattern, opts, callback) {
  var args = verify(pattern, opts, callback);
  opts = args.opts;
  callback = args.callback;

  var refs = 'refs/heads/' + cache.branch;
  request(refs, opts, function cb(err, res) {
    if (err) {
      callback(err);
      return;
    }
    if (res === false) {
      refs = 'refs/tags/' + cache.branch;
      request(refs, opts, callback);
      return;
    }
    callback(null, true);
  });
}

function checkHeadsOnline(pattern, opts, callback) {
  var args = verify(pattern, opts, callback);
  var refs = 'refs/heads/' + cache.branch;
  request(refs, args.opts, args.callback);
}

function checkTagsOnline(pattern, opts, callback) {
  var args = verify(pattern, opts, callback);
  var refs = 'refs/tags/' + cache.branch;
  request(refs, args.opts, args.callback);
}

function verify(pattern, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }
  if (typeof callback !== 'function') {
    errs.type('expect `callback` to be function');
  }
  if (typeof pattern !== 'string') {
    errs.type('expect `pattern` to be string');
    return;
  }
  if (!regex.test(pattern)) {
    errs.error('expect `pattern` to be `user/repo#branch`');
    return;
  }
  if (!isObject(opts)) {
    errs.type('expect `opts` to be object');
  }

  opts = typeof opts.token === 'string' ? {
    headers: {
      Authorization: 'token ' + opts.token
    }
  } : undefined;

  memo(regex.exec(pattern));

  if (!cache.branch) {
    errs.error('should give a branch or tag in `pattern`');
  }

  return {
    opts: opts,
    callback: callback
  }
}

function memo(match) {
  cache = {
    user: match[1],
    repo: match[2],
    branch: match[3]
  };
}

function request(refs, opts, callback) {
  var url = fmt(format, endpoint, cache.user, cache.repo, refs);

  got.get(url, opts, function(err, res) {
    if (err && err.code !== 404) {
      callback(err);
      return;
    }

    res = res ? JSON.parse(res) : {};
    if (res.ref === refs) {
      callback(null, true);
      return;
    }

    callback(null, false);
  });
}

/**
 * Expose package
 */

module.exports = onlineExist;
onlineExist.branch = exports.branch = checkHeadsOnline;
onlineExist.tag = exports.tag = checkTagsOnline;
