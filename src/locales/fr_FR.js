/**
 * fr_FR locale
 * @constructor
 */
T2W.FR_FR = function(){};

/**
 * Translator dictionary
 * @constant
 * @type {Object}
 */
T2W.FR_FR.DICTIONARY = {
	zero		:"zéro",
	ones		:[ "", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf" ],
	teens		:[ "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf" ],
	tens		:[ "", "", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix" ],
	hundred		:"cent",
    radix: ["", ["mille"], ["million"]],
	delimiters	:["-", "et", "-et-"]
};

/**
 * Token length
 * @constant
 * @type {number}
 */
T2W.FR_FR.TOKEN_LENGTH = 3;

/**
 * Max numbers for this locale
 * @constant
 * @type {number}
 */
T2W.FR_FR.MAX_NUMBERS = 9;

/**
 * Translate numbers to words
 * @public
 * @param {array} numbers
 * @param {number} index
 * @return {string}
 */
T2W.FR_FR.prototype.translate = function( numbers ) {	
	
	// Check max value	
	if(numbers.length * T2W.FR_FR.TOKEN_LENGTH > T2W.FR_FR.MAX_NUMBERS){
		throw {
			name : "Error",
			message : "The length of numbers is longer than the maximum value(" + T2W.FR_FR.MAX_NUMBERS + ")."		
		};	
	}		
	
	// Deal with zero value	
	if(numbers[T2W.SINGLE_INDEX] === 0 && numbers.length === 1){
		return T2W.FR_FR.DICTIONARY.zero;
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
 * It solves exceptions in the French language.
 * @param {Array} numbers
 * @param {number} index
 * @param {number} max - length of tokens
 * @return {string}
 */
T2W.FR_FR.prototype._getTrio = function( numbers, index, max){																				
	var hundred = '';
	var ten = '';
	var single = '';
	var radix = this._getRadix(numbers, index);
	

	if(numbers[T2W.HUNDRED_INDEX]){
		hundred = numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX] 
			? this._getOnes( numbers[ T2W.HUNDRED_INDEX ] ) + " " + T2W.FR_FR.DICTIONARY.hundred + " "
			: this._getOnes( numbers[ T2W.HUNDRED_INDEX ] ) + " " + T2W.FR_FR.DICTIONARY.hundred;
	}

	if(numbers[T2W.HUNDRED_INDEX] == 1){
		hundred = numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX] 
			? T2W.FR_FR.DICTIONARY.hundred + ' '
			: T2W.FR_FR.DICTIONARY.hundred;
	}

	if(numbers[T2W.HUNDRED_INDEX] == 1 && numbers[T2W.TEN_INDEX] == 0 && numbers[T2W.SINGLE_INDEX] == 1){
		hundred = numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX] 
			? T2W.FR_FR.DICTIONARY.hundred + T2W.FR_FR.DICTIONARY.delimiters[2]
			: T2W.FR_FR.DICTIONARY.hundred;
	}
	
	if( numbers[ T2W.TEN_INDEX ] ){			
		ten = this._getTeens( numbers[T2W.SINGLE_INDEX]);			
	}
						
	if( numbers[ T2W.TEN_INDEX ] >=2 ){
		ten = numbers[T2W.SINGLE_INDEX] 
			? this._getTens( numbers[T2W.TEN_INDEX]) + T2W.FR_FR.DICTIONARY.delimiters[0] + this._getOnes( numbers[T2W.SINGLE_INDEX]) 
			: this._getTens( numbers[T2W.TEN_INDEX]); 	
	}
						
	if( numbers[ T2W.TEN_INDEX ] >=2 && numbers[ T2W.SINGLE_INDEX ] ==1 ){
		ten = this._getTens( numbers[T2W.TEN_INDEX]) + T2W.FR_FR.DICTIONARY.delimiters[2] + this._getOnes( numbers[T2W.SINGLE_INDEX]);
	}
			
							
	if( !numbers[ T2W.TEN_INDEX ] ){
		single = this._getOnes( numbers[T2W.SINGLE_INDEX]);
	}
				
	if(index+1 < max && (numbers[T2W.HUNDRED_INDEX] || numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX]) ){
		hundred = ' ' + hundred;
	}
	
	if( index === 0 && index+2 < max && !numbers[ T2W.HUNDRED_INDEX ] && (numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX] )){
		hundred	 = ' ';		
	}

	if( index === 1 && numbers[T2W.TEN_INDEX] == undefined && numbers[T2W.SINGLE_INDEX] === 1 )
	{
		return radix;
	}
	else							
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
T2W.FR_FR.prototype._getOnes = function( number) {			
	return T2W.FR_FR.DICTIONARY.ones[ number ];			
};

/**
 * Get tens
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @return {string}
 */
T2W.FR_FR.prototype._getTens = function( number ) {	
	return T2W.FR_FR.DICTIONARY.tens[ number ];				
};

/**
 * Get teens
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @return {string}
 */
T2W.FR_FR.prototype._getTeens = function(number ){
	return T2W.FR_FR.DICTIONARY.teens[ number ];
};

/**
 * Get radix
 * convert radix to words
 * @private
 * @param {Array} numbers
 * @param {number} index
 * @return {string}
 */
T2W.FR_FR.prototype._getRadix = function( numbers, index ) {	
	var radix = '';
	if( index > 0 && (numbers[T2W.HUNDRED_INDEX] || numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX]))
		radix = ' ' + T2W.FR_FR.DICTIONARY.radix[ index ];			
	
	if( index === 1 && numbers[T2W.TEN_INDEX] == undefined && numbers[T2W.SINGLE_INDEX] === 1 )
		radix = T2W.FR_FR.DICTIONARY.radix[ index ];			
	
	if( index === 2 && ( numbers[T2W.TEN_INDEX] > 0 || numbers[T2W.SINGLE_INDEX] > 1 ) )
		radix = radix + 's';

	return radix;
};
