/**
 * Capitalise the first letter of each word in a string
 *
 * @returns {string}
 */
String.prototype.ucwords = function(){ return this.replace( /\w+/g, function( str ){ return str.charAt( 0 ).toUpperCase() + str.slice( 1 ).toLowerCase(); } ); };
/**
 * Capitalise the first letter of a string
 *
 * @returns {string}
 */
String.prototype.ucfirst = function(){ return this.charAt( 0 ).toUpperCase() + this.slice( 1 ).toLowerCase(); };
/**
 * Pluralise a string
 *
 * @param   items   integer [optional - defaults to 0]
 * @param   suffix  string  [optional - defaults to 's']
 * @param   offset  integer [optional - would normally be a negative integer]
 *
 * @returns {string}
 */
String.prototype.plural = function( items, suffix, offset )
{
    items   = ( typeof items  !== 'undefined' ) ? items : 0 ;
    suffix  = ( typeof suffix !== 'undefined' ) ? suffix : 's' ;
    offset  = ( typeof offset !== 'undefined' ) ? offset : 0 ;

    if( items == 0 || items > 1 )
    {
        if( offset == 0 )
        {
            return this + suffix;
        }
        else
        {
            return this.slice( 0, offset ) + suffix;
        }
    }
    return this;
};
/**
 * String prototype alias for lpad()
 *
 * @param   size    integer     [optional - defaults to 1]
 * @param   char    mixed       [optional - defaults to '0']
 *
 * @returns {*|string}
 */
String.prototype.lpad = function( size, char ){ return lpad( this, size, char ); };
/**
 * String prototype alias for number_format()
 *
 * @param   prec    integer     [optional - defaults to 0]
 * @param   dec     string      [optional - defaults to '.']
 * @param   sep     string      [optional - defaults to ',']
 *
 * @returns {string}
 */
String.prototype.number_format = function( prec, dec, sep ){ return number_format( this, prec, dec, sep ); };
/**
 * Left-Pad a string ... built with zero-padding numbers in mind
 *
 * @param   string  mixed
 * @param   size    integer     [optional - defaults to 1]
 * @param   char    mixed       [optional - defaults to '0']
 *
 * @returns {*|string}
 */
function lpad( string, size, char )
{
    var a;
    var d;
    var dec;
    var sign;

    var s = string.toString();

    size = ( typeof size !== 'undefined' ) ? size : 1 ;
    char = ( typeof char !== 'undefined' ) ? char : '0' ;

    if( ( sign = s.indexOf('-') ) === 0 )
    {
        s = s.substr( 1 );
    }
    if( ( dec = s.indexOf('.') ) != -1 )
    {
        a = s.split('.');
        d = a[1];
        s = a[0];
    }

    while( s.length < size ) s = char + s ;

    s = ( sign === 0 ) ? '-' + s : s ;
    s = ( dec !== -1 ) ? s + '.' + d : s ;

    return s;
}
/**
 * Format a 'number' with grouped thousands
 *
 * @param   number  mixed
 * @param   prec    integer         [optional - defaults to 0]
 * @param   dec     string          [optional - defaults to '.']
 * @param   sep     string          [optional - defaults to ',']
 *
 * @returns {string}
 */
function number_format( number, prec, dec, sep )
{
    number = parseFloat( number );

    prec = ( typeof prec !== 'undefined' ) ? prec : 0 ;
    dec  = ( typeof dec  !== 'undefined' ) ? dec : '.' ;
    sep  = ( typeof sep  !== 'undefined' ) ? sep : ',' ;

    var roundedNumber = Math.round( Math.abs( number ) * ('1e' + prec) ) + '';
    var numberString  = ( prec ) ? roundedNumber.slice( 0, prec * -1 ) : roundedNumber ;
    var decimalString = ( prec ) ? roundedNumber.slice( prec * -1 ) : '' ;

    var formattedNumber = '';

    while( numberString.length > 3 )
    {
        formattedNumber += sep + numberString.slice( -3 );
        numberString = numberString.slice( 0, -3 );
    }
    return ( number < 0 ? '-' : '' ) + numberString + formattedNumber + ( decimalString ? ( dec + decimalString ) : '' );
}
