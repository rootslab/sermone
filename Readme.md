###Sermone
[![build status](https://secure.travis-ci.org/rootslab/sermone.png?branch=master)](http://travis-ci.org/rootslab/sermone) 
[![NPM version](https://badge.fury.io/js/sermone.png)](http://badge.fury.io/js/sermone)

[![NPM](https://nodei.co/npm/sermone.png?downloads=true&stars=true)](https://nodei.co/npm/sermone/)

[![NPM](https://nodei.co/npm-dl/sermone.png)](https://nodei.co/npm/sermone/)

> _Sermone_, a __Redis__ command encoder.

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

###Sample Usage

```javascript
var Sermone  = require( 'sermone' );
Sermone.encode( 'CMD', 'KEY', [ 1, 2, 3 ], function () {} );
```
> See [examples](example/).

###Methods

> Arguments within [ ] are optional.

```javascript
/*
 * return an hash:
 * {
 *  bulks : Number
 *  , cmd : String
 *  , ecmd : String || Buffer ( RESTORE cmd )
 *  , fn : Function
 * }
 */
Sermone#encode( String cmd [, Function fn ] ) : Object

Sermone#encode( String cmd [, String key [, Function fn ] ] ) : Object

Sermone#encode( String cmd [, String key [, Object object [, Function fn ] ] ] ) : Object

Sermone#encode( String cmd [, String key [, Array array [, Function fn ] ] ] ) : Object

```

------------------------------------------------------------------------


### MIT License

> Copyright (c) 2014 &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

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
> SOFTWARE OR THE USE OR OTHER DEALINGS IN T