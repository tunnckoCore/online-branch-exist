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
var errs = require('handle-errors')('online-branch-exist', true);
var stringify = require('stringify-github-short-url');

var endpoint = 'https://api.github.com/repos';

module.exports = function onlineBranchExist(pattern, callback) {
  if (!pattern) {
    errs.error('should have `pattern` and be string');
  }

  if (!callback) {
    errs.error('should have `callback` and be function')
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

  var parse = stringify.parse(pattern);

  if (!parse.branch) {
    errs.error('expect to have `branch` in the pattern', callback);
    return;
  }

  var url = fmt('%s/%s/%s/branches', endpoint, parse.user, parse.repo);
  got.get(url, function(err, res) {
    if (err) {
      callback(err);
      return;
    }
    var data = JSON.parse(res).map(function(row) {
      return row.name;
    }).filter(function(name) {
      return name === parse.branch;
    });
    callback(null, data.length === 1 ? true : false);
  });
};
