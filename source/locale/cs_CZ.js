T2W.prototype._locales[ 'cs_CZ' ] = {
	
	TOKEN_LENGTH:3,
	
	SINGLE_INDEX: 0,
	TENS_INDEX: 1,
	HUNDRED_INDEX: 2,

	dictionary: {		
		ones:		[ "", "jedna", "dvě", "tři", "čtyři", "pět", "šest", "sedm", "osm", "devět" ],
		teens:		[ "deset", "jedenáct", "dvanáct", "třináct", "čtrnáct", "patnáct", "šestnáct", "sedmnáct", "osmnáct", "devatenáct" ],
		tens:		[ "", "", "dvacet", "třicet", "čtyřicet", "padesát", "šedesát", "sedmdesát", "osmdesát", "devadesát" ],
		hundreds:	[ "", "sto", "dvěstě", "třista", "čtyřista", "pětset", "šestset", "sedmset", "osmset", "devětset" ],
		
		thousends: [ "jedentisíc", "dvatisíce", "třitisíce", "čtyřitisíce", "pěttisíc", "šesttisíc", "sedmtisíc", "osmtisíc", "devěttisíc" ],		
		millions: [ "jedenmilión", "dvamilióny", "třimilióny", "čtyřimilióny", "pětmiliónů", "šestmiliónů", "sedmmiliónů", "osmmiliónů", "devěmiliónů"],
		radix:["", "tisíc", "miliónů"]
	},

	/**
	 * Translate numbers to words
	 * @param {array} numbers
	 * @param {number} index
	 * @return {string}
	 */
	translate: function( numbers ) {
		
		// TODO check max value
		
		var words = '';
		for(var idx = 0, max = numbers.length; idx < max; idx++){				
			words +=  this._getThreeDigits( this.parent.tokenize( numbers[idx], 1 ), idx);	
		}
		
		return words;								
	},
	
	/**
	 * TODO
 	 * @param {Array} numbers
 	 * @param {number} index
 	 * @return {string}
	 */
	_getThreeDigits:function(numbers, index){
		
		if(numbers[this.SINGLE_INDEX] === 0 && numbers.length === 1){
			return "nula"; // TODO
		}
										
		var h = '';
		var t = '';
		var s = '';
		var r = '';
		
		if(numbers[this.HUNDRED_INDEX]){
			h = this._getHundreds(numbers[this.HUNDRED_INDEX]);
		}
		
		if( numbers[ this.TENS_INDEX ] ){			
			t = this._getTeens( numbers[this.SINGLE_INDEX] );			
		}
							
		if( numbers[ this.TENS_INDEX ] >=2 ){
			t = this._getTens( numbers[this.TENS_INDEX] ) + this._getSingles( numbers[this.SINGLE_INDEX] ); 	
		}
								
		if( !numbers[ this.TENS_INDEX ] ){
			s = this._getSingles( numbers[this.SINGLE_INDEX] );
		}
									
		return h + t + s;		
	},

	_getSingles: function( number ) {			
		return this.dictionary.ones[ number ];			
	},

	_getTens: function( number ) {		
		return this.dictionary.tens[ number ];				
	},
	
	_getTeens: function(number){
		return this.dictionary.teens[ number ];
	},
	
	_getHundreds: function( number ) {		
		return this.dictionary.hundreds[ number ];
	}	
};

