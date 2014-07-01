#!/usr/bin/env node

var log = console.log
 	, assert = require( 'assert' )
    , util = require( 'util' )
    , Sermone = require( '../' )
    , cmd = 'COMMAND'
    , key = 'KEY'
    , args = []
    , fn = function ( v ) { return v; }
    , zn = function ( v ) { return v; }
    , a = 32
    , i = 0
    , l = 128 * 1024
    , stime = 0
    , etime = 0
    , result = null
    , gbits = 0
    ;

log( '- run a command encoding %d times, with %d arguments.', l, a );

for ( ; ~a; args[ --a ] = 'I\'M AN ARGUMENT, MY COUNTER IS ' + i );

stime = Date.now();

for ( ; i < l; ++i ) {
    result = Sermone.encode( cmd, key, args, fn, zn );
};

etime = ( Date.now() - stime ) / 1000;

gbits = result.ecmd.length * l / 128 / 1024 / 1024;

log( '- time elapsed: %d secs', etime );

log( '- data encoding rate: %d Gbit/sec', ( gbits / etime ).toFixed( 3 ) );

log( '- total data encoded: %d Gbits', gbits.toFixed( 3 ) );

log( '- operation rate: %d Kops/sec', ( l / etime / 1024 ).toFixed( 2 ) );