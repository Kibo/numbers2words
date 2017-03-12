/**
 * id_ID locale
 * @constructor
 */
T2W.ID_ID = function(){};

/**
 * Translator dictionary
 * @constant
 * @type {Object}
 */
T2W.ID_ID.DICTIONARY = {
	zero		:"nol",
	ones		:[ "", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan" ],
	teens		:[ "sepuluh", "sebelas", "dua belas", "tiga belas", "empat belas", "lima belas", "enam belas", "tujuh belas", "delapan belas", "sembilan belas" ],
	tens		:[ "", "", "dua puluh", "tiga puluh", "empat puluh", "lima puluh", "enam puluh", "tujuh puluh", "delapan puluh", "sembilan puluh" ],
	hundred		:"ratus",
	radix		:["", "ribu", "juta"],
	delimiters	:[" ", '']
};

/**
 * Token length
 * @constant
 * @type {number}
 */
T2W.ID_ID.TOKEN_LENGTH = 3;

/**
 * Max numbers for this locale
 * @constant
 * @type {number}
 */
T2W.ID_ID.MAX_NUMBERS = 9;

/**
 * Translate numbers to words
 * @public
 * @param {array} numbers
 * @param {number} index
 * @return {string}
 */
T2W.ID_ID.prototype.translate = function( numbers ) {	
	
	// Check max value	
	if(numbers.length * T2W.ID_ID.TOKEN_LENGTH > T2W.ID_ID.MAX_NUMBERS){
		throw {
			name : "Error",
			message : "The length of numbers is longer than the maximum value(" + T2W.ID_ID.MAX_NUMBERS + ")."		
		};	
	}		
	
	// Deal with zero value	
	if(numbers[T2W.SINGLE_INDEX] === 0 && numbers.length === 1){
		return T2W.ID_ID.DICTIONARY.zero;
	}
	
	var words = [];
	for(var idx = 0, max = numbers.length; idx < max; idx++){				
		words.unshift( this._getTrio( this.tokenize( numbers[idx], 1 ), idx, max));	
	}
	
	return words.join("");								
};

/**
 * Converts first three numbers to words.
 * @private
 * It solves exceptions in the English language.
 * @param {Array} numbers
 * @param {number} index
 * @param {number} max - length of tokens
 * @return {string}
 */
T2W.ID_ID.prototype._getTrio = function( numbers, index, max){																				
	var hundred = '';
	var ten = '';
	var single = '';
	var radix = this._getRadix(numbers, index);
	
	if(numbers[T2W.HUNDRED_INDEX]){
        hundredPrefix = numbers[T2W.HUNDRED_INDEX] > 1 ? this._getOnes( numbers[ T2W.HUNDRED_INDEX ] ) + " " : "se"

		hundred = numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX] 
			? hundredPrefix + T2W.ID_ID.DICTIONARY.hundred + ' '
			: hundredPrefix + T2W.ID_ID.DICTIONARY.hundred;
	}
	
	if( numbers[ T2W.TEN_INDEX ] ){			
		ten = this._getTeens( numbers[T2W.SINGLE_INDEX]);			
	}
						
	if( numbers[ T2W.TEN_INDEX ] >=2 ){
		ten = numbers[T2W.SINGLE_INDEX] 
			? this._getTens( numbers[T2W.TEN_INDEX]) + T2W.ID_ID.DICTIONARY.delimiters[0] + this._getOnes( numbers[T2W.SINGLE_INDEX]) 
			: this._getTens( numbers[T2W.TEN_INDEX]); 	
	}
							
	if( !numbers[ T2W.TEN_INDEX ] ){
        if (index == max-1 && max == 2) {
			if (numbers[T2W.SINGLE_INDEX] == 1) {
				single = 'se';
				radix = radix.replace(' ', '');
			}
			else single = this._getOnes( numbers[T2W.SINGLE_INDEX]);
		} else {
			single = this._getOnes( numbers[T2W.SINGLE_INDEX]);
		}
	}
				
	if(index+1 < max && (numbers[T2W.HUNDRED_INDEX] || numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX]) ){
		hundred = ' ' + hundred;
	}
	
	if( index === 0 && index+1 < max && !numbers[ T2W.HUNDRED_INDEX ] && (numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX] )){
		hundred	 = ' ';		
	}
								
	return hundred + ten + single + radix;		
};

/**
 * Get ones
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @param {number} index
 * @return {string}
 */
T2W.ID_ID.prototype._getOnes = function( number) {			
	return T2W.ID_ID.DICTIONARY.ones[ number ];			
};

/**
 * Get tens
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @return {string}
 */
T2W.ID_ID.prototype._getTens = function( number ) {		
	return T2W.ID_ID.DICTIONARY.tens[ number ];				
};

/**
 * Get teens
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @return {string}
 */
T2W.ID_ID.prototype._getTeens = function(number ){
	return T2W.ID_ID.DICTIONARY.teens[ number ];
};

/**
 * Get radix
 * convert radix to words
 * @private
 * @param {Array} numbers
 * @param {number} index
 * @return {string}
 */
T2W.ID_ID.prototype._getRadix = function( numbers, index ) {		
	var radix = '';
	if( index > 0 && (numbers[T2W.HUNDRED_INDEX] || numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX])){	
		radix = ' ' + T2W.ID_ID.DICTIONARY.radix[ index ];			
	}
			
	return radix;
};