/*
 * Sermone, Redis Protocol Encoder for commands.
 *
 * Copyright(c) 2015 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.version = require( '../package' ).version;
exports.Sermone = ( function () {
    var emptyFn = function () {}
        , Bolgia = require( 'bolgia' )
        , doString =  Bolgia.doString
        , reveal = Bolgia.reveal
        , ooo = Bolgia.circles
        , onum = ooo.num
        , ostr = ooo.str
        , oarr = ooo.arr
        , oobj = ooo.obj
        , ofun = ooo.fun
        , onul = ooo.nul
        , ound = ooo.und
        , bconcat = Buffer.concat 
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
        // encode a command with arguments
        , encode = function ( cmd, key, obj, fn, zn ) {
            var list = [ 1, '$' + cmd.length, cmd ]
                , btype = doString( obj )
                , bulks = 0
                , ecmd = null
                , raw = null
                , encodeArgs = function () {
                    var k = null
                        , v = 0
                        , o = 0
                        , olen = 0
                        ;
                    add( String( key ), list );
                    switch ( btype ) {
                        case ostr:
                            add( obj, list );
                        break;
                        case onum:
                            add( String( obj ), list );
                        break;
                        case ofun:
                        case onul:
                        case ound:
                            zn = fn;
                            fn = obj;
                        break;
                        case oarr:
                            // NOTE: only indexed arrays
                            olen = obj.length;
                            for ( ; o < olen; ) {
                                v = obj[ o++ ];
                                if ( ! isBuffer( v ) ) add( String( v ), list );
                                else {
                                    // we don't expect other Buffers as args, then break.
                                    raw = v;
                                    ++list[ 0 ];
                                    break;
                                }
                            }
                        break;
                        case oobj:
                            for ( k in obj ) add( k, list ) & add( String( obj[ k ] ), list );
                        break;
                    }
                }
                ;

            // key argument is interpreted as a null value for format function
            if ( key === undefined || key === null ) zn = obj;
            else if ( typeof key === 'function' ) ( ( fn = key ) & ( zn = obj ) );
            else encodeArgs();

            bulks = list[ 0 ];
            list[ 0 ] = '*' + bulks;
            list[ list.length - 1 ] += crlf;
            ecmd = list.join( crlf );

            return {
                bulks : bulks
                , cmd : cmd
                , ecmd : raw ? bconcat( [
                    /* 
                     * NOTE: RESTORE gets a single Buffer as the last argument,
                     * like a reply from DUMP. We can't convert it to a string,
                     * because of encoding; chars like '\' are not properly escaped.
                     */
                    new Buffer( ecmd )
                    , new Buffer( '$' + raw.length + crlf )
                    , raw
                    , new Buffer( crlf )
                ] ) : ecmd
                , fn : typeof fn === 'function' ? fn : reveal
                , zn : typeof zn === 'function' ? zn : emptyFn
            };
        }
        ;

        return { encode : encode };

} )();