#!/usr/bin/env node

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Sermone = require( '../' )
    , cmd = 'LRANGE'
    , key = 'KEY'
    , args = [ 0, 99 ]
    , fn = function ( v ) { return v; }
    , zn = function ( v ) { return v; }
    , i = 0
    , l = 1024 * 1024
    , stime = 0
    , etime = 0
    , result = null
    , gbits = 0
    ;

log( '- run LRANGE encoding %d times', l );

stime = Date.now();

for ( ; i < l; ++i ) {
    result = Sermone.encode( cmd, key, args[ 0 ], args[ 1 ], fn, zn );
};

etime = ( Date.now() - stime ) / 1000;

gbits = result.ecmd.length * l / 128 / 1024 / 1024;

log( '- time elapsed: %d secs', etime );

log( '- total data encoded: %d Gbits', gbits.toFixed( 3 ) );

log( '- data encoding rate: %d Gbit/sec', ( gbits / etime ).toFixed( 3 ) );

log( '- operation rate: %d Kops/sec', ( l / etime / 1024 ).toFixed( 2 ) );