## [![npm][npmjs-img]][npmjs-url] [![mit license][license-img]][license-url] [![build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![deps status][daviddm-img]][daviddm-url]

> Async (with callback api) check through github api if branch/tag/release exists in the `user/repo`, you can use `user/repo[#branch]` for the check

## Install
```
npm i --save online-branch-exist
npm test
```


## API
> For more use-cases see the [tests](./test.js)

### [onlineBranch](./index.js#L20)
> using `user/repo#branch` you can check if `tag` or `branch` exists

- `pattern` **{String}**
- `callback` **{Function}**

**Example:**

```js
var onlineExist = require('online-branch-exist');

// first will check if branch exists
// if not exist, will check if tg which name `master` exists
// at last if not exist will return `false`
onlineExist('tunnckoCore/koa-better-body#master', function(err, res) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(res);
  //=> true
})
```

### [.branch](./index.js#L33)
> Checks that given `branch` exists in github repo, using `user/repo#branch` string pattern  
> Actually same as above.

- `pattern` **{String}**
- `callback` **{Function}**

**Example:**

```js
var onlineExist = require('online-branch-exist');

onlineExist.branch('koajs/koa#proxy', function(err, res) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(res);
  //=> true
})
```

### [.tag](./index.js#L37)
> Checks that given `tag` exists in github repo, using `user/repo#tag` string pattern

- `pattern` **{String}**
- `callback` **{Function}**

**Example:**

```js
var onlineExist = require('online-branch-exist');

onlineExist.tag('hybridables/handle-arguments#v2.0.0', function(err, res) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(res);
  //=> true
})
```


## Author
**Charlike Mike Reagent**
+ [gratipay/tunnckoCore][author-gratipay]
+ [twitter/tunnckoCore][author-twitter]
+ [github/tunnckoCore][author-github]
+ [npmjs/tunnckoCore][author-npmjs]
+ [more ...][contrib-more]


## License [![MIT license][license-img]][license-url]
Copyright (c) 2014-2015 [Charlike Mike Reagent][contrib-more], [contributors][contrib-graf].  
Released under the [`MIT`][license-url] license.


[npmjs-url]: http://npm.im/online-branch-exist
[npmjs-img]: https://img.shields.io/npm/v/online-branch-exist.svg?style=flat&label=online-branch-exist

[coveralls-url]: https://coveralls.io/r/tunnckoCore/online-branch-exist?branch=master
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/online-branch-exist.svg?style=flat

[license-url]: https://github.com/tunnckoCore/online-branch-exist/blob/master/license.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat

[travis-url]: https://travis-ci.org/tunnckoCore/online-branch-exist
[travis-img]: https://img.shields.io/travis/tunnckoCore/online-branch-exist.svg?style=flat

[daviddm-url]: https://david-dm.org/tunnckoCore/online-branch-exist
[daviddm-img]: https://img.shields.io/david/tunnckoCore/online-branch-exist.svg?style=flat

[author-gratipay]: https://gratipay.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-npmjs]: https://npmjs.org/~tunnckocore

[contrib-more]: http://j.mp/1stW47C
[contrib-graf]: https://github.com/tunnckoCore/online-branch-exist/graphs/contributors

***

_Powered and automated by [kdf](https://github.com/tunnckoCore), February 27, 2015_