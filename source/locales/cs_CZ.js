/**
 * cs_CZ locale
 * @constructor
 */
T2W.CS_CZ = function(){};

/**
 * Translator dictionary
 * @constant
 * @type {Object}
 */
T2W.CS_CZ.DICTIONARY = {
	zero		:"nula",
	ones		:[
					[ "", "jedna", "dvě", "tři", "čtyři", "pět", "šest", "sedm", "osm", "devět" ],
					[ "", "jedentisíc", "dvatisíce", "třitisíce", "čtyřitisíce", "pěttisíc", "šesttisíc", "sedmtisíc", "osmtisíc", "devěttisíc" ],
					[ "", "jedenmilión", "dvamilióny", "třimilióny", "čtyřimilióny", "pětmiliónů", "šestmiliónů", "sedmmiliónů", "osmmiliónů", "devěmiliónů"]					
				],
	teens		:[ "deset", "jedenáct", "dvanáct", "třináct", "čtrnáct", "patnáct", "šestnáct", "sedmnáct", "osmnáct", "devatenáct" ],
	tens		:[ "", "", "dvacet", "třicet", "čtyřicet", "padesát", "šedesát", "sedmdesát", "osmdesát", "devadesát" ],
	hundreds	:[ "", "sto", "dvěstě", "třista", "čtyřista", "pětset", "šestset", "sedmset", "osmset", "devětset" ],

	radix:["", "tisíc", "miliónů"]	
};

/**
 * Token length
 * @constant
 * @type {number}
 */
T2W.CS_CZ.TOKEN_LENGTH = 3;

/**
 * Max numbers for this locale
 * @constant
 * @type {number}
 */
T2W.CS_CZ.MAX_NUMBERS = 9;

/**
 * Translate numbers to words
 * @public
 * @param {array} numbers
 * @param {number} index
 * @return {string}
 */
T2W.CS_CZ.prototype.translate = function( numbers ) {	
	
	// Check max value	
	if(numbers.length * T2W.CS_CZ.TOKEN_LENGTH > T2W.CS_CZ.MAX_NUMBERS){
		throw {
			name : "Error",
			message : "The length of numbers is longer than the maximum value(" + T2W.CS_CZ.MAX_NUMBERS + ")."		
		};	
	}		
	
	// Deal with zero value	
	if(numbers[T2W.SINGLE_INDEX] === 0 && numbers.length === 1){
		return T2W.CS_CZ.DICTIONARY.zero;
	}
	
	var words = [];
	for(var idx = 0, max = numbers.length; idx < max; idx++){				
		words.unshift( this._getTrio( this.tokenize( numbers[idx], 1 ), idx) );	
	}
	
	return words.join("");								
};

/**
 * Converts first three numbers to words.
 * It solves exceptions in the Czech language.
 * @param {Array} numbers
 * @param {number} index
 * @return {string}
 */
T2W.CS_CZ.prototype._getTrio = function(numbers, index){																				
	var hundred = '';
	var ten = '';
	var single = '';
	var radix = this._getRadix( index );
	
	if(numbers[T2W.HUNDRED_INDEX]){
		hundred = this._getHundreds(numbers[T2W.HUNDRED_INDEX]);
	}
	
	if( numbers[ T2W.TEN_INDEX ] ){			
		ten = this._getTeens( numbers[T2W.SINGLE_INDEX]);			
	}
						
	if( numbers[ T2W.TEN_INDEX ] >=2 ){
		ten = this._getTens( numbers[T2W.TEN_INDEX]) + this._getOnes( numbers[T2W.SINGLE_INDEX], T2W.SINGLE_INDEX); 	
	}
							
	if( !numbers[ T2W.TEN_INDEX ] ){
		single = this._getOnes( numbers[T2W.SINGLE_INDEX], T2W.SINGLE_INDEX);
	}
	
	if(index > 0 && numbers.length === 1){
		single = this._getOnes( numbers[T2W.SINGLE_INDEX], index);
		radix = '';	
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
T2W.CS_CZ.prototype._getOnes = function( number, index ) {			
	return T2W.CS_CZ.DICTIONARY.ones[index][ number ];			
};

/**
 * Get tens
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @return {string}
 */
T2W.CS_CZ.prototype._getTens = function( number ) {		
	return T2W.CS_CZ.DICTIONARY.tens[ number ];				
};

/**
 * Get teens
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @return {string}
 */
T2W.CS_CZ.prototype._getTeens = function(number ){
	return T2W.CS_CZ.DICTIONARY.teens[ number ];
};

/**
 * Get hundreds
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @return {string}
 */
T2W.CS_CZ.prototype._getHundreds = function( number ) {		
	return T2W.CS_CZ.DICTIONARY.hundreds[ number ];
};

/**
 * Get radix
 * convert radix to words
 * @private
 * @param {number} index
 * @return {string}
 */
T2W.CS_CZ.prototype._getRadix = function( index ) {		
	return T2W.CS_CZ.DICTIONARY.radix[ index ];
};
