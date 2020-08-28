/**
 * es_ES locale
 * @constructor
 */
T2W.ES_ES = function(){};

/**
 * Translator dictionary
 * @constant
 * @type {Object}
 */
T2W.ES_ES.DICTIONARY = {
	zero		:"cero",
	ones		:[ "", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve" ],
	teens		:[ "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve" ],
	tens		:[ "", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa" ],
	hundreds		:["ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"],
    radix: ["", ["mil"], ["millón"]],
	delimiters	:[" ", " y "]
};

/**
 * Token length
 * @constant
 * @type {number}
 */
T2W.ES_ES.TOKEN_LENGTH = 3;

/**
 * Max numbers for this locale
 * @constant
 * @type {number}
 */
T2W.ES_ES.MAX_NUMBERS = 9;

/**
 * Translate numbers to words
 * @public
 * @param {array} numbers
 * @param {number} index
 * @return {string}
 */
T2W.ES_ES.prototype.translate = function( numbers ) {	
	
	// Check max value	
	if(numbers.length * T2W.ES_ES.TOKEN_LENGTH > T2W.ES_ES.MAX_NUMBERS){
		throw {
			name : "Error",
			message : "The length of numbers is longer than the maximum value(" + T2W.ES_ES.MAX_NUMBERS + ")."		
		};	
	}		
	
	// Deal with zero value	
	if(numbers[T2W.SINGLE_INDEX] === 0 && numbers.length === 1){
		return T2W.ES_ES.DICTIONARY.zero;
	}
	
	var words = [];
	for(var idx = 0, max = numbers.length; idx < max; idx++){				
		words.unshift( this._getTrio( this.tokenize( numbers[idx], 1 ), idx, max));	
	}
	
	if(words.join(""))
	return words.join("").trim();								
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
T2W.ES_ES.prototype._getTrio = function( numbers, index, max){																				
	var hundred = '';
	var ten = '';
	var single = '';
	var radix = this._getRadix(numbers, index);
	

	if(numbers[T2W.HUNDRED_INDEX]){
		hundred = numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX] 
			? this._getOnes( numbers[ T2W.HUNDRED_INDEX ] ) + " " + T2W.ES_ES.DICTIONARY.hundred + " "
			: this._getOnes( numbers[ T2W.HUNDRED_INDEX ] ) + " " + T2W.ES_ES.DICTIONARY.hundred;
	}

	if(numbers[T2W.HUNDRED_INDEX] == 1){
		hundred = numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX] 
			? T2W.ES_ES.DICTIONARY.hundred + ' '
			: T2W.ES_ES.DICTIONARY.hundred;
	}

	
	if( numbers[ T2W.TEN_INDEX ] ){			
		ten = this._getTeens( numbers[T2W.SINGLE_INDEX]);			
	}
						
	if( numbers[ T2W.TEN_INDEX ] >=2 ){
		ten = numbers[T2W.SINGLE_INDEX] 
			? this._getTens( numbers[T2W.TEN_INDEX]) + T2W.ES_ES.DICTIONARY.delimiters[1] + this._getOnes( numbers[T2W.SINGLE_INDEX]) 
			: this._getTens( numbers[T2W.TEN_INDEX]); 	
	}
						
	if( numbers[ T2W.TEN_INDEX ] >=2 && numbers[ T2W.SINGLE_INDEX ] ==1 ){
		ten = this._getTens( numbers[T2W.TEN_INDEX]) + T2W.ES_ES.DICTIONARY.delimiters[1] + this._getOnes( numbers[T2W.SINGLE_INDEX]);
	}
			
							
	if( !numbers[ T2W.TEN_INDEX ] ){
		single = this._getOnes( numbers[T2W.SINGLE_INDEX]);
	}

	
	if( numbers[ T2W.HUNDRED_INDEX ] ){			
		hundred = this._getHundreds( numbers[T2W.HUNDRED_INDEX]);			
	}
				
	if( index+1 < max && (numbers[T2W.HUNDRED_INDEX] || numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX]) ){
		hundred = ' ' + hundred;
	}

	if(index > 0 && numbers[T2W.TEN_INDEX] > 0 && numbers[T2W.SINGLE_INDEX] === 1)
		single = "";

	if( index === 0 && index+2 < max && !numbers[ T2W.HUNDRED_INDEX ] && (numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX] )){
		hundred	 = ' ';		
	}

	if( numbers[T2W.HUNDRED_INDEX] === 1 && (  numbers[T2W.TEN_INDEX] == undefined || numbers[T2W.TEN_INDEX] < 1 ) && numbers[T2W.SINGLE_INDEX] < 1 )
		hundred = "cien";

	if( numbers[T2W.HUNDRED_INDEX] > 0 && ( numbers[T2W.TEN_INDEX] > 0 || numbers[T2W.SINGLE_INDEX] > 0  ) )
		hundred = hundred + ' ';

	if( index === 1 && numbers[T2W.TEN_INDEX] == undefined && numbers[T2W.SINGLE_INDEX] === 1 )
	{
		return radix;
	}
	if( index > 0 && numbers[T2W.SINGLE_INDEX] === 1 && single == "uno")
		single = "un"
	if( index === 1 && numbers[T2W.SINGLE_INDEX] === 1)
		single = ""
	if( index === 0 && numbers[T2W.TEN_INDEX] === 2 && numbers[T2W.SINGLE_INDEX] === 1)
		return T2W.ES_ES.DICTIONARY.delimiters[0] + "veintiuno";
	if( index > 0 && numbers[T2W.TEN_INDEX] === 2 && numbers[T2W.SINGLE_INDEX] === 1)
		return T2W.ES_ES.DICTIONARY.delimiters[0] + "veintiún" + radix;
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
T2W.ES_ES.prototype._getOnes = function( number) {			
	return T2W.ES_ES.DICTIONARY.ones[ number ];			
};

/**
 * Get tens
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @return {string}
 */
T2W.ES_ES.prototype._getTens = function( number ) {	
	return T2W.ES_ES.DICTIONARY.tens[ number ];				
};

/**
 * Get teens
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @return {string}
 */
T2W.ES_ES.prototype._getTeens = function(number ){
	return T2W.ES_ES.DICTIONARY.teens[ number ];
};

/**
 * Get hundreds
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @return {string}	
 */
T2W.ES_ES.prototype._getHundreds = function(number ){
	return T2W.ES_ES.DICTIONARY.hundreds[ number - 1 ];
};

/**
 * Get radix
 * convert radix to words
 * @private
 * @param {Array} numbers
 * @param {number} index
 * @return {string}
 */
T2W.ES_ES.prototype._getRadix = function( numbers, index ) {	
	var radix = '';
	if( index > 0 && (numbers[T2W.HUNDRED_INDEX] || numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX]))
		radix = ' ' + T2W.ES_ES.DICTIONARY.radix[ index ];			
	
	if( index === 1 && numbers[T2W.TEN_INDEX] == undefined && numbers[T2W.SINGLE_INDEX] === 1 )
		radix = T2W.ES_ES.DICTIONARY.radix[ index ];			
	
	if( index === 2 && ( numbers[T2W.TEN_INDEX] > 0 || numbers[T2W.SINGLE_INDEX] > 1 ) )
	{
		radix = radix + 'es';
		radix = radix.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	}

	return radix;
};
