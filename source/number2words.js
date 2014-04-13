/**
 * It converts a numeric value to words.
 * @class
 * @public
 * @constructor
 * @param {Object} locale
 * @param {number} tokenLength
 */
var T2W = function(locale, tokenLength) {
	this.tokenLength = tokenLength || 3;
	this.locale = locale;
};

/**
 * Numeral system
 * @constant
 * @type {number}
 */
T2W.RADIX = 10;

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
		
	if (!this._isLocaleValid( this.locale )) {
		throw {
			name : "ValidationException",
			message : "Locale is not valid.",
			obj:locale
		};
	}
	
	var tokens = this.tokenize(number, this.tokenLength);
	var words = [];
		
	// iterate array from the back	
	for(var i = tokens.length; i-- > 0; ){
		words.push(this.locale.translate( this.tokenize(tokens[i], 1), i));			
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
	
	var tokens = [];
	var base = Math.pow( T2W.RADIX, tokenLength );
	while( number ){    
    	tokens.push( number % base );
    	number = parseInt( number / base, T2W.RADIX );    
	}
	return tokens;
};

/**
 * Check if locale is valid
 * @private
 * @param {Object} locale
 * @return {boolean}
 */
T2W.prototype._isLocaleValid = function(locale){
	// TODO
	return true;
};

