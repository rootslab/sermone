#!/usr/bin/env node

/* 
 * Sermone#encode signature test
 *
 * Sermone#encode( String cmd [, Function fn [, Function zn ] ] ) : Object
 *
 * Sermone#encode( String cmd [, String key [, Function fn [, Function zn ] ] ] ) : Object
 *
 * Sermone#encode( String cmd [, String key [, Object object [, Function fn [, Function zn ] ] ] ] ) : Object
 *
 * Sermone#encode( String cmd [, String key [, Array array [, Function fn [, Function zn ] ] ] ] ) : Object
 */

var log = console.log
    , assert = require( 'assert' )
    , Bolgia = require( 'bolgia' )
    , Sermone = require( '../' )
    , reveal = Bolgia.reveal
    , encode = Sermone.encode
    , cmd = 'COMMAND'
    , key = 'KEY'
    , cback = function () { log( '+cback' ) }
    , format = function ( s ) { return s; }
    , r0 = encode( cmd )
    , r1 = encode( cmd, format, cback )
    , r2 = encode( cmd, key, format, cback )
    , r3 = encode( cmd, key, { KEY1 : 'VAL1', KEY2 : 'VAL2', KEY3 : 'VAL3' }, format, cback )
    , r4 = encode( cmd, key, [ 'ARG1', 'ARG2', 'ARG3' ], format, cback )
    // some cases
    , r5 = encode( cmd, key, 1 )
    , r6 = encode( cmd, key, 'string' )
    // like Redis RESTORE command
    , r7 = encode( cmd, key, [ 1000, new Buffer( 'àn-ùtf8-strìng' ) ] )
    // format fn === null or undefined
    , r8 = encode( cmd, null, cback )
    // expected results
    , e0 = '*1\r\n$7\r\nCOMMAND\r\n'
    , e1 = '*1\r\n$7\r\nCOMMAND\r\n'
    , e2 = '*2\r\n$7\r\nCOMMAND\r\n$3\r\nKEY\r\n'
    , e3 = '*8\r\n$7\r\nCOMMAND\r\n$3\r\nKEY\r\n$4\r\nKEY1\r\n$4\r\nVAL1\r\n$4\r\nKEY2\r\n$4\r\nVAL2\r\n$4\r\nKEY3\r\n$4\r\nVAL3\r\n'
    , e4 = '*5\r\n$7\r\nCOMMAND\r\n$3\r\nKEY\r\n$4\r\nARG1\r\n$4\r\nARG2\r\n$4\r\nARG3\r\n'
    , e5 = '*3\r\n$7\r\nCOMMAND\r\n$3\r\nKEY\r\n$1\r\n1\r\n'
    , e6 = '*3\r\n$7\r\nCOMMAND\r\n$3\r\nKEY\r\n$6\r\nstring\r\n'
    , e7 = '*4\r\n$7\r\nCOMMAND\r\n$3\r\nKEY\r\n$4\r\n1000\r\n$17\r\nàn-ùtf8-strìng\r\n'
    , e8 = '*1\r\n$7\r\nCOMMAND\r\n'
    , i = 0
    ;

log( '- test Sermone signatures, then properties of the resulting object/commands.' );

log( '- encoded %d commands using various Sermone signatures:', 9 );

log( '  > check encoded command "%d".', i++ );
assert.deepEqual( r0.ecmd, e0 );
assert.ok( ( typeof r0.fn === 'function' ) && ( r0.fn === reveal ) );
// for test coverage, check if empty function is set as callback, then execute returning a true value
assert.ok( ( typeof r0.zn === 'function' ) & ! r0.zn() );

log( '  > check encoded command "%d".', i++ );
assert.deepEqual( r1.ecmd, e1 );
assert.ok( ( typeof r1.fn === 'function' ) && ( r1.fn === format ) );
assert.ok( ( typeof r1.zn === 'function' ) && ( r1.zn === cback ) );

log( '  > check encoded command "%d".', i++ );
assert.deepEqual( r2.ecmd, e2 );
assert.ok( ( typeof r2.fn === 'function' ) && ( r2.fn === format ) );
assert.ok( ( typeof r2.zn === 'function' ) && ( r2.zn === cback ) );

log( '  > check encoded command "%d".', i++ );
assert.deepEqual( r3.ecmd, e3 );
assert.ok( ( typeof r3.fn === 'function' ) && ( r3.fn === format ) );
assert.ok( ( typeof r3.zn === 'function' ) && ( r3.zn === cback ) );

log( '  > check encoded command "%d".', i++ );
assert.deepEqual( r4.ecmd, e4 );
assert.ok( ( typeof r4.fn === 'function' ) && ( r4.fn === format ) );
assert.ok( ( typeof r4.zn === 'function' ) && ( r4.zn === cback ) );

log( '  > check encoded command "%d".', i++ );
assert.deepEqual( r5.ecmd, e5 );
assert.ok( ( typeof r5.fn === 'function' ) && ( r5.fn === reveal ) );
// emptyFn as callback
assert.ok( ( typeof r5.zn === 'function' ) && ! r5.zn() );

log( '  > check encoded command "%d".', i++ );
assert.deepEqual( r6.ecmd, e6 );
assert.ok( ( typeof r6.fn === 'function' ) && ( r6.fn === reveal ) );
// emptyFn as callback
assert.ok( ( typeof r6.zn === 'function' ) && ! r6.zn() );

log( '  > check encoded command "%d".', i++ );
assert.deepEqual( String( r7.ecmd ), e7 );
assert.ok( ( typeof r7.fn === 'function' ) && ( r7.fn === reveal ) );
// emptyFn as callback
assert.ok( ( typeof r7.zn === 'function' ) && ! r7.zn() );

log( '  > check encoded command "%d".', i++ );
assert.deepEqual( r8.ecmd, e8 );
assert.ok( ( typeof r8.fn === 'function' ) && ( r8.fn === reveal ) );
assert.ok( ( typeof r8.zn === 'function' ) && ( r8.zn === cback ) );

log( '- all tests passed!' );
