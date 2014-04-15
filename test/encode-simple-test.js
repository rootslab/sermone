#!/usr/bin/env node

/* 
 * Sermone#encode simple test
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Sermone = require( '../' )
    , echoFn = function ( v ) { return v; }
    , other = [ 'ARG1', 'ARG2', 'ARG3' ]
    , args = [ 'CMD', 'ARG0', other, echoFn ]
    , result = Sermone.encode.apply( this, args )
    , bulks = args.length + other.length - 1 - 1
    , pcmd = '*5\\r\\n$3\\r\\nCMD\\r\\n$4\\r\\nARG0\\r\\n$4\\r\\nARG1\\r\\n$4\\r\\nARG2\\r\\n$4\\r\\nARG3\\r\\n'
    , ecmd = "*5\r\n$3\r\nCMD\r\n$4\r\nARG0\r\n$4\r\nARG1\r\n$4\r\nARG2\r\n$4\r\nARG3\r\n"
    ;

log( '- test encode with args:', args );

log( '- check reply.bulks, should be:', bulks );
assert.equal( result.bulks, bulks, 'wrong bulks result!' );

log( '- check reply.cmd, should be:', args[ 0 ] );
assert.equal( result.cmd, args[ 0 ], 'wrong cmd result!' );

log( '- check reply.fn, should be echoFn: %s', echoFn );
assert.equal( result.fn( 'echo' ), echoFn( 'echo' ), 'wrong fn result!' );

log( '- check reply.ecmd, should be: "%s"', pcmd );
assert.equal( result.ecmd, ecmd, 'wrong encoded cmd result: "' + result.ecmd + '"' );