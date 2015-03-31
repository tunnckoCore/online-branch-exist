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
var stringify = require('stringify-github-short-url');

var endpoint = 'https://api.github.com/repos';

module.exports = onlineExist;

function onlineExist(pattern, token, callback) {
  onlineBranchExist(pattern, token, function(err, res) {
    if (err || res === false) {
      onlineTagExist(pattern, token, callback);
      return;
    }
    callback(null, res);
  });
}

onlineExist.tag = onlineTagExist;
onlineExist.branch = onlineBranchExist

function onlineBranchExist(pattern, token, callback) {
  core('branches', pattern, token, callback);
}

function onlineTagExist(pattern, token, callback) {
  core('tags', pattern, token, callback);
}

function core(type, pattern, token, callback) {
  if (!pattern) {
    errs.error('should have `pattern` and be string');
  }

  if (!token) {
    errs.error('should give Github Personal Access Token');
  }

  if (token !== true && typeof token !== 'string') {
    errs.type('expect `token` be string');
  }

  if (!callback) {
    errs.error('should have `callback` and be function');
  }

  if (typeof callback !== 'function') {
    errs.type('expect `callback` be function');
  }

  if (typeof pattern !== 'string') {
    errs.type('expect `pattern` be string', callback);
    return;
  }

  if (!stringify.regex().test(pattern)) {
    errs.error('expect `pattern` be `user/repo#branch`', callback);
    return;
  }

  if (['branches', 'tags'].indexOf(type) == -1) {
    errs.error('expect `type` be one of `branches` or `tags`');
  }

  var opts = token === true ? undefined : {
    headers: {
      'Authorization': 'token ' + token
    }
  };

  var parse = stringify.parse(pattern);
  var url = '';

  if (type == 'branches') {
    url = fmt('%s/%s/%s/%s/%s', endpoint, parse.user, parse.repo, 'git/refs/heads', parse.branch);
  } else if (type == 'tags') {
    url = fmt('%s/%s/%s/%s/%s', endpoint, parse.user, parse.repo, 'git/refs/tags', parse.branch);
  }

  got.get(url, opts, function(err, res) {
    if (err) {
      if (err.code == '404') {
        callback(null, false);
        return;
      } else {
        callback(err);
        return;
      }
    }
    var data = JSON.parse(res);
    if (data.ref && data.ref.indexOf(parse.branch) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
    return;
  });
}
