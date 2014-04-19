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
			name : "LocaleException",
			message : "Locale with name '" + localeName + "' is not exist."		
		};	
	}
			
	this._locale = localeName;
	this._locales[this._locale].parent = this;
	this._tokenLength = this._locales[this._locale].TOKEN_LENGTH || T2W.DEFAULT_TOKEN_LENGTH; 		
};

/**
 * Numeral system
 * @constant
 * @type {number}
 */
T2W.RADIX = 10;

/**
 * Default token length
 * @constant
 * @type {number}
 */
T2W.DEFAULT_TOKEN_LENGTH = 1;

/**
 * Translate number to words
 * @public
 * @param {integer} value
 * @return{string}
 * @example 
 * this.toWords( 1234 )
 * // one thousand two hundred thirty four
 */
T2W.prototype.toWords = function( number ){
	
	if(typeof this._locales[this._locale].translate != 'function'){
		throw {
			name:"LocaleExceprion",
			message: "Locale '" + this._locale + "' has not function with name 'translate'."			
		};
	}
			
	return this._locales[this._locale].translate( this.tokenize(number, this._tokenLength));
};

/**
 * Split number to tokens
 * @param {number} number
 * @param {number} tokenLength - count of numbers in one token
 * @return {Array}
 * 
 */
T2W.prototype.tokenize = function( number, tokenLength ){
	
	if(!Number.isInteger(number)){
		throw {
			name:"NumberFormatExceprion",
			message: "'" + number + "' is not Integer."	
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
 * Available locales
 * @private
 */
T2W.prototype._locales = {};

