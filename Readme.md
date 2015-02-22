###Sermone

[![NPM VERSION](http://img.shields.io/npm/v/sermone.svg?style=flat)](https://www.npmjs.org/package/sermone)
[![CODACY BADGE](https://img.shields.io/codacy/b18ed7d95b0a4707a0ff7b88b30d3def.svg?style=flat)](https://www.codacy.com/public/44gatti/sermone)
[![CODECLIMATE](http://img.shields.io/codeclimate/github/rootslab/sermone.svg?style=flat)](https://codeclimate.com/github/rootslab/sermone)
[![CODECLIMATE-TEST-COVERAGE](https://img.shields.io/codeclimate/coverage/github/rootslab/sermone.svg?style=flat)](https://codeclimate.com/github/rootslab/sermone)
[![LICENSE](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/rootslab/sermone#mit-license)

[![TRAVIS CI BUILD](http://img.shields.io/travis/rootslab/sermone.svg?style=flat)](http://travis-ci.org/rootslab/sermone)
[![BUILD STATUS](http://img.shields.io/david/rootslab/sermone.svg?style=flat)](https://david-dm.org/rootslab/sermone)
[![DEVDEPENDENCY STATUS](http://img.shields.io/david/dev/rootslab/sermone.svg?style=flat)](https://david-dm.org/rootslab/sermone#info=devDependencies)
[![NPM DOWNLOADS](http://img.shields.io/npm/dm/sermone.svg?style=flat)](http://npm-stat.com/charts.html?package=sermone)

[![NPM GRAPH1](https://nodei.co/npm-dl/sermone.png)](https://nodei.co/npm/sermone/)

[![NPM GRAPH2](https://nodei.co/npm/sermone.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/sermone/)

[![status](https://sourcegraph.com/api/repos/github.com/rootslab/sermone/.badges/status.png)](https://sourcegraph.com/github.com/rootslab/sermone)
[![views](https://sourcegraph.com/api/repos/github.com/rootslab/sermone/.counters/views.png)](https://sourcegraph.com/github.com/rootslab/sermone)
[![views 24h](https://sourcegraph.com/api/repos/github.com/rootslab/sermone/.counters/views-24h.png)](https://sourcegraph.com/github.com/rootslab/sermone)

> **_Sermone_**, a __Redis__ protocol encoder for commands.

> Try __[Syllabus](https://github.com/rootslab/syllabus)__ a collection of mix-ins for __Redis__ commands, builded upon **_Sermone.encode_**.

###Install

```bash
$ npm install sermone [-g]
// clone repo
$ git clone git@github.com:rootslab/sermone.git
```

> __require__ returns an hash/obj.

```javascript
var Sermone  = require( 'sermone' );
```

###Run Tests

```bash
$ cd sermone/
$ npm test
```

###Run Benchmark

```bash
$ cd sermone/
$ npm run bench
```

###Sample Usage

```javascript
var Sermone  = require( 'sermone' );
Sermone.encode( 'CMD', 'KEY', [ 1, 2, 3 ], function () {} );
```
> See [examples](example/).

###Methods

> Arguments within [ ] are optional, '|' indicates multiple type for an argument.

```javascript
/*
 * Encode a Redis command.
 *
 * NOTE: 'cmd' and 'key' arguments should be strings, however,
 * for convenience, 'key' is converted to String before encoding,
 * then you can use Numbers for keys without problems.
 *
 * It returns an hash:
 * {
 *  bulks : Number
 *  , cmd : String
 *  , ecmd : String | Buffer ( RESTORE cmd )
 *  , fn : Function
 *  , zn : Function
 * }
 */
Sermone#encode( String cmd [, Function fn [, Function zn ] ] ) : Object

Sermone#encode( String cmd [, String key [, Function fn [, Function zn ] ] ] ) : Object

Sermone#encode( String cmd [, String key [, Object object [, Function fn [, Function zn ] ] ] ] ) : Object

Sermone#encode( String cmd [, String key [, Array array [, Function fn [, Function zn ] ] ] ] ) : Object

```

------------------------------------------------------------------------


### MIT License

> Copyright (c) 2015 &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> 'Software'), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:

> __The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.__

> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![GA](https://ga-beacon.appspot.com/UA-53998692-1/sermone/Readme?pixel)](https://github.com/igrigorik/ga-beacon)