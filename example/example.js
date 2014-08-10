var log = console.log
    , Sermone = require( '../' )
    , result = Sermone.encode( 'CMD', 'ARG0', [ 'ARG1', 'ARG2', 'ARG3' ] )
    ;

log( result );