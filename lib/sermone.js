/*
 * Sermone, Redis Protocol Encoder
 *
 * Copyright(c) 2014 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.version = require( '../package' ).version;
exports.Sermone = ( function () {
    var emptyFn = function () {}
        , Bolgia = require( 'bolgia' )
        , toString =  Bolgia.toString
        , reveal = Bolgia.reveal
        , ooo = Bolgia.circles
        , onum = ooo.num
        , ostr = ooo.str
        , oarr = ooo.arr
        , oobj = ooo.obj
        , ofun = ooo.fun
        , onul = ooo.nul
        , ound = ooo.und
        , bblen = Buffer.byteLength
        , isBuffer = Buffer.isBuffer
        , crlf = '\r\n'
        // build list of encoded values
        , add = function ( data, arr ) {
            var len = arr.length
                ;
            arr[ len++ ] = '$' + bblen( data, 'utf8' );
            arr[ len++ ] = data;
            ++arr[ 0 ];
        }
        , addRaw = function ( data, arr ) {
            var len = arr.length
                ;
            arr[ len++ ] = '$' + data.length;
            arr[ len++ ] = data;
            ++arr[ 0 ];
        }
        // encode a command with arguments
        , encode = function ( cmd, key, obj, fn, zn ) {
            var list = [ 1, '$' + cmd.length, cmd ]
                , btype = toString( obj )
                , bulks = 0
                , ecmd = null
                , raw = null
                , v = 0
                , vlen = 0
                , k = null
                , o = 0
                , olen = 0
                , tkey = ! ( key === undefined || key === null )
                ;

            if ( tkey ) {
                if ( typeof key === 'function' ) {
                    fn = key;
                    zn = obj;
                } else {
                    add( String( key ), list );
                    switch ( btype ) {
                        case onum:
                            add( String( obj ), list );
                        break;
                        case ostr:
                            add( obj, list );
                        break;
                        case oarr:
                            // NOTE: only indexed arrays
                            olen = obj.length;
                            for ( ; o < olen; ) {
                                v = obj[ o++ ];
                                if ( isBuffer( v ) ) {
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
                                    addRaw( new Buffer( vlen ), list );
                                    break;
                                }
                                add( String( v ), list );
                            }
                        break;
                        case oobj:
                            for ( k in obj ) {
                                add( k, list );
                                add( String( obj[ k ] ), list );
                            }
                        break;
                        case ofun:
                        case onul:
                        case ound:
                            zn = fn;
                            fn = obj;
                        break;
                    }
                }
            } else if ( typeof obj === 'function' ) zn = obj;
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
                , fn : typeof fn === 'function' ? fn : reveal
                , zn : typeof zn === 'function' ? zn : emptyFn
            };
        }
        ;
        return {
           encode : encode
        };

} )();