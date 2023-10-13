/**
 * It converts a numeric value to words.
 * @class
 * @public
 * @constructor
 * @param {String} localeName 
 */
var T2W = function( localeName ) {	
	var type = localeName, translator;
	
	// error if the constructor doesn't exist
	if( typeof T2W[ type ] !== "function" ) {
		throw {
			name : "Error",
			message : "Locale with name '" + type + "' doesn't exist."		
		};
	}
		
	translator = new T2W[ type ]();
	translator._tokenLength = T2W[ type ].TOKEN_LENGTH | T2W.DEFAULT_TOKEN_LENGTH;
	
	// Extends
	// Copy prototype methods from T2W to translator object 
	for (var key in T2W.prototype) {
		if( T2W.prototype.hasOwnProperty( key ) ) {
			if( translator[key] !== 'function' ){
				T2W[ type ].prototype[key] = T2W.prototype[key];
			}			
		}				
	}
	
	return translator;	
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
 * Single index
 * @constant
 * @type {number}
 */
T2W.SINGLE_INDEX = 0;

/**
 * Ten index
 * @constant
 * @type {number}
 */
T2W.TEN_INDEX = 1;

/**
 * Hundred index
 * @constant
 * @type {number}
 */
T2W.HUNDRED_INDEX = 2;

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
	
	if(typeof this.translate != 'function'){
		throw {
			name:"Error",
			message: "The function 'translate' is not implemented."			
		};
	}
				
	return this.translate( this.tokenize(number, this._tokenLength), Math.sign(number) > 0);
};

/**
 * Split number to tokens
 * @param {number} number
 * @param {number} tokenLength - count of numbers in one token
 * @return {Array}
 * @example 
 * this.tokenize( 1234, 1 ); // [4,3,2,1]
 * this.tokenize( 1234, 2 ); // [34,12]
 * this.tokenize( 1234, 3 ); // [234,1]
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

