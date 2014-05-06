/*
 * Sermone, Redis Protocol Encoder
 *
 * Copyright(c) 2014 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.version = require( '../package' ).version;
exports.Sermone = ( function () {
    var log = console.log
    , echoFn = function ( voice ) { return voice; } 
    , Bolgia = require( 'bolgia' )
    , toString =  Bolgia.toString
    , ooo = Bolgia.circles
    , bblen = Buffer.byteLength
    , crlf = '\r\n'
    // encode a command with arguments
    , encode = function ( cmd, key, obj, fn ) {
        var list = []
            , l = list.push( 1, '$' + cmd.length, cmd )
            , btype = toString( obj )
            , bulks = 0
            , ecmd = null
            , raw = null
            , v = 0
            , vlen = 0
            , k = null
            , o = 0
            , olen = 0
            , vtype = null
            // build list of encoded values
            , add = function ( data ) {
                list[ l++ ] = '$' + bblen( data, 'utf8' );
                list[ l++ ] = data;
                ++list[ 0 ];
            }
            , addRaw = function ( data ) {
                list[ l++ ] = '$' + data.length;
                list[ l++ ] = data;
                ++list[ 0 ];
            }
            ;

        if ( key ) {
            if ( typeof key === 'function' ) {
                fn = key;
            } else {
                add( String( key ) );
                switch ( btype ) {
                    case ooo.num:
                        add( String( obj ) );
                    break;
                    case ooo.str:
                        add( obj );
                    break;
                    case ooo.arr:
                        // NOTE: only indexed arrays
                        olen = obj.length;
                        for ( ; o < olen; ) {
                            v = obj[ o++ ];
                            if ( v instanceof Buffer ) {
                                /* 
                                 * RESTORE gets a single Buffer as the last argument,
                                 * like a reply from DUMP.
                                 *
                                 * NOTE: I can't convert it to a string, because of 
                                 * encoding; chars like '\' are not properly escaped.
                                 * Then I have to send a raw buffer.
                                 * you don't expect multiple Buffers as args, then
                                 * break the 'for' cycle.
                                 */
                                raw = v;
                                vlen = v.length;
                                addRaw( new Buffer( vlen ) );
                                break;
                            }
                            add( String( v ) );
                        };
                    break;
                    case ooo.obj:
                        for ( k in obj ) {
                            add( k );
                            add( String( obj[ k ] ) );
                        };
                    break;
                    case ooo.fun:
                        fn = obj;
                    break;
                };
            }
        }
        bulks = list[ 0 ];
        list[ 0 ] = '*' + bulks;
        list[ list.length - 1 ] += crlf;
        ecmd = list.join( crlf );
        if ( raw ) {
            // substitute data placeholder
            ecmd = new Buffer( ecmd );
            raw.copy( ecmd, ecmd.length - vlen - 2 );
        }
        return {
            bulks : bulks
            , cmd : cmd
            , ecmd : ecmd
            , fn : ( typeof fn === 'function' ) ? fn : echoFn
        };
    }
    ;
    return {
       encode : encode
    };

} )();