T2W.prototype._locales[ 'cs_CZ' ] = {

	SINGLE_INDEX: 0,
	TENS_INDEX: 1,
	HUNDRED_INDEX: 2,

	dictionary: {
		zero:		"nula",		
		ones:		[ "", "jedna", "dvě", "tři", "čtyři", "pět", "šest", "sedm", "osm", "devět" ],
		teens:		[ "deset", "jedenáct", "dvanáct", "třináct", "čtrnáct", "patnáct", "šestnáct", "sedmnáct", "osmnáct", "devatenáct" ],
		tens:		[ "", "", "dvacet", "třicet", "čtyřicet", "padesát", "šedesát", "sedmdesát", "osmdesát", "devadesát" ],
		hundreds:	[ "", "sto", "dvěstě", "třista", "čtyřista", "pětset", "šestset", "sedmset", "osmset", "devětset" ],
		
		thousends: [ "tisíc", "tisíce", "tisíce", "tisíce", "tisíc", "tisíc", "tisíc", "tisíc", "tisíc" ],
		radix: [ "", "tisíc", "stotisíc", "milión" ]
	},

	/**
	 * Translate numbers to words
	 * @param {array} numbers
	 * @param {number} index
	 * @return {string}
	 */
	translate: function( numbers, index ) {	
		
		if(numbers[this.SINGLE_INDEX] === 0 && numbers.length === 1){
			return this.dictionary.zero;
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

	/**
	 * @private
	 * @param {number} number
	 * @return {string}
	 */
	_getHundreds: function( number ) {		
		return this.dictionary.hundreds[ number ];
	},
	
	_getRadix:function(index){
		return this.dictionary.radix[index];
	}
};

