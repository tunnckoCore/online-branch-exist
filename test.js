/**
 * online-branch-exist <https://github.com/tunnckoCore/online-branch-exist>
 *
 * Copyright (c) 2014-2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var assert = require('assert');
var onlineBranchExist = require('./index');
onlineBranchExist('tunnckoCore/koa-better-body#master', function(err, res) {
-  console.log(res);
-})
