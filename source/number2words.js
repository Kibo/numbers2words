/**
 * It converts a numeric value to words.
 * @class
 * @public
 * @constructor
 * @param {String} localeName 
 */
var T2W = function( localeName ) {	
	if(typeof(this._locales[localeName]) == 'undefined' || this._locales[localeName] == null){
		throw {
			name : "LocaleNameException",
			message : "Locale is not exist.",
			obj:localeName
		};	
	}
			
	this._locale = localeName;	
	this._tokenLength = T2W.DEFAULT_LENGTH_OF_TOKEN;
};

/**
 * Numeral system
 * @constant
 * @type {number}
 */
T2W.RADIX = 10;

/**
 * Default length of token
 * @constant
 * @type {number}
 */
T2W.DEFAULT_LENGTH_OF_TOKEN = 3;

/**
 * Translate number to words
 * @public
 * @param {integer} value
 * @return{Array}
 * @example 
 * this.toWords( 1234 )
 * // one thousand two hundred thirty four
 */
T2W.prototype.toWords = function( number ){		
	var tokens = this.tokenize(number, this._tokenLength);
	var words = [];
		
	// iterate array from the back	
	for(var i = tokens.length; i-- > 0; ){
		words.push(this._locales[this._locale].translate( this.tokenize(tokens[i], 1), i));			
	}
	
	return words;
};

/**
 * Split number to tokens
 * @param {number} number
 * @param {number} tokenLength - count of chars in one token
 * @return {Array}
 * 
 */
T2W.prototype.tokenize = function( number, tokenLength ){
	
	if(!Number.isInteger(number)){
		throw {
			name:"NumberFormatExceprion",
			message:"Number is not Integer.",
			obj:number
		};
	}
	
	if(number === 0){
		return [0];
	}
	
	var tokens = [];
	var base = Math.pow( T2W.RADIX, tokenLength );
	while( number ){    
    	tokens.push( number % base );
    	number = parseInt( number / base, T2W.RADIX );    
	}
	return tokens;
};

/**
 * Get array with default value
 * @param {*} val
 * @param {number} length
 * @return {array}
 */
T2W.prototype.initArray = function( val, length ){
	
};

/**
 * Available locales
 * @private
 */
T2W.prototype._locales = {};

