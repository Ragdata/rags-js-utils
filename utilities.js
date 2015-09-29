/**
 * String prototype alias for ucwords()
 *
 * @returns {string}
 */
String.prototype.ucwords = function(){ return ucwords( this ); };
/**
 * String prototype alias for ucfirst()
 *
 * @returns {string}
 */
String.prototype.ucfirst = function(){ return ucfirst( this ); };
/**
 * String prototype alias for plural()
 *
 * @param   {number}    [items]     Number of Items (defining plural state) - defaults to 0
 * @param   {string}    [suffix]    String Suffix - defaults to 's'
 * @param   {number}    [offset]    Number of characters to strip from end before applying suffix - normally negative
 *
 * @returns {string}
 */
String.prototype.plural = function( items, suffix, offset ){ return plural( this, items, suffix, offset ); };
/**
 * String prototype alias for lpad()
 *
 * @param   {number}    [size]      Final String Size   - defaults to 1
 * @param   {string}    [char]      Pad Character       - defaults to '0'
 *
 * @returns {string}
 */
String.prototype.lpad = function( size, char ){ return lpad( this, size, char ); };
/**
 * String prototype alias for number_format()
 *
 * @param   {number}    [prec]      Decimal Precision   - defaults to 0
 * @param   {string}    [dec]       Decimal Character   - defaults to '.'
 * @param   {string}    [sep]       Thousands Separator - defaults to ','
 *
 * @returns {string}
 */
String.prototype.number_format = function( prec, dec, sep ){ return number_format( this, prec, dec, sep ); };
/**
 * Left-Pad a string ... built with zero-padding numbers in mind
 *
 * @param   {string|number} string      String to Left-Pad
 * @param   {number}        [size]      Final String Size   - defaults to 1
 * @param   {string}        [char]      Pad Character       - defaults to '0'
 *
 * @returns {string|number}
 */
function lpad( string, size, char ){

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
 * @param   {string|number} number      'Number' to Format
 * @param   {number}        [prec]      Decimal Precision   - defaults to 0
 * @param   {string}        [dec]       Decimal Character   - defaults to '.'
 * @param   {string}        [sep]       Thousands Separator - defaults to ','
 *
 * @returns {string|number}
 */
function number_format( number, prec, dec, sep ){

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
/**
 * Pluralise a string
 *
 * @param   {string}    string      String to Pluralise
 * @param   {number}    [items]     Number of Items (defining plural state) - defaults to 0
 * @param   {string}    [suffix]    String Suffix - defaults to 's'
 * @param   {number}    [offset]    Number of characters to strip from end before applying suffix - normally negative
 *
 * @returns {string}
 */
function plural( string, items, suffix, offset ){

    items   = ( typeof items  !== 'undefined' ) ? items : 0 ;
    suffix  = ( typeof suffix !== 'undefined' ) ? suffix : 's' ;
    offset  = ( typeof offset !== 'undefined' ) ? offset : 0 ;

    if( items == 0 || items > 1 )
    {
        if( offset == 0 )
        {
            return string + suffix;
        }
        else
        {
            return string.slice( 0, offset ) + suffix;
        }
    }
    return string;
}
/**
 * Capitalise the first letter of a string
 *
 * @param   {string} string
 *
 * @returns {string}
 */
function ucfirst( string ){ return string.charAt( 0 ).toUpperCase() + string.slice( 1 ).toLowerCase(); }
/**
 * Capitalise the first letter of each word in a string
 *
 * @param   {string} string
 *
 * @returns {string}
 */
function ucwords( string ){ return string.replace( /\w+/g, function( string ){ return string.charAt( 0 ).toUpperCase() + string.slice( 1 ).toLowerCase(); } ); }