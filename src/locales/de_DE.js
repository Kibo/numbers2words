/**
 * de_DE locale
 * @constructor
 */
T2W.DE_DE = function(){};

/**
 * Translator dictionary
 * @constant
 * @type {Object}
 */
T2W.DE_DE.DICTIONARY = {
    zero            : "Null",
    ones            : ["", ["eins", "ein", "eine"], "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"],
    teens           : ["zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"],
    tens            : ["", "", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"],
    hundred         : "hundert",
    radix           : ["", "tausend", ["Million", "Millionen"]],
    delimiters      : ["-", "und"]
};

/**
 * Token length
 * @constant
 * @type {number}
 */
T2W.DE_DE.TOKEN_LENGTH = 3;

/**
 * Max numbers for this locale
 * @constant
 * @type {number}
 */
T2W.DE_DE.MAX_NUMBERS = 9;

/**
 * Translate numbers to words
 * @public
 * @param {array} numbers
 * @param {number} index
 * @return {string}
 */
T2W.DE_DE.prototype.translate = function( numbers ) {

    // Check max value
    if (numbers.length * T2W.DE_DE.TOKEN_LENGTH > T2W.DE_DE.MAX_NUMBERS){
        throw {
            name : "Error",
            message : "The length of numbers is longer than the maximum value(" + T2W.DE_DE.MAX_NUMBERS + ")."
        };
    }

    // Deal with zero value
    if (numbers[T2W.SINGLE_INDEX] === 0 && numbers.length === 1) {
        return T2W.DE_DE.DICTIONARY.zero;
    }

    var words = [];
    for (var idx = 0, max = numbers.length; idx < max; idx++) {
        words.unshift( this._getTrio( this.tokenize( numbers[idx], 1 ), idx, max, words));
    }

    for (idx = 0, max = words.length; idx < max; idx++) {
        // The first letter of each word is written in uppercase
        if (max === 1 || idx !== max - 1 || !words[idx - 1]) {
            words[idx] = words[idx].substr(0, 1).toUpperCase() + words[idx].substr(1);
        }
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
T2W.DE_DE.prototype._getTrio = function( numbers, index, max, formerWords){
    var hundred = '';
    var ten = '';
    var single = '';
    var radix = this._getRadix(numbers, index);
    var result = '';

    if (numbers[T2W.HUNDRED_INDEX]) {
        hundred = this._getOnes( numbers[T2W.HUNDRED_INDEX], index, numbers[T2W.TEN_INDEX], false) + T2W.DE_DE.DICTIONARY.hundred;
    }

    if (numbers[T2W.TEN_INDEX]) {
        ten = this._getTeens( numbers[T2W.SINGLE_INDEX]);
    }

    if (numbers[T2W.TEN_INDEX] >= 2) {
        ten = numbers[T2W.SINGLE_INDEX]
            ? this._getOnes( numbers[T2W.SINGLE_INDEX], index, numbers[T2W.TEN_INDEX], false) + T2W.DE_DE.DICTIONARY.delimiters[1] + this._getTens( numbers[T2W.TEN_INDEX])
            : this._getTens( numbers[T2W.TEN_INDEX]);
    }

    if (!numbers[T2W.TEN_INDEX]) {
        single = this._getOnes( numbers[T2W.SINGLE_INDEX], index, numbers[T2W.TEN_INDEX], true);
    }

    if (index >= 2) {
        single += ' ';
    }


    result = hundred + ten + single + radix;

    //  && index >= 1
    if (index > 1 && formerWords.join('').length > 0) {
        result += ' ';
    }

    return result;
};

/**
 * Get ones
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @param {number} index
 * @param {boolean} isSingle
 * @return {string}
 */
T2W.DE_DE.prototype._getOnes = function( number, index, tensOfNumber, isSingle) {
    if (number === 1) {
        if (index === 0 && isSingle && (tensOfNumber === 0 || tensOfNumber === undefined)) {
            return T2W.DE_DE.DICTIONARY.ones[number][0];
        }

        if (index >= 2 && isSingle && tensOfNumber === undefined) {
            return T2W.DE_DE.DICTIONARY.ones[number][2];
        }

        return T2W.DE_DE.DICTIONARY.ones[number][1];
    }
    return T2W.DE_DE.DICTIONARY.ones[number];
};

/**
 * Get tens
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @return {string}
 */
T2W.DE_DE.prototype._getTens = function( number ) {
    return T2W.DE_DE.DICTIONARY.tens[number];
};

/**
 * Get teens
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @return {string}
 */
T2W.DE_DE.prototype._getTeens = function(number) {
    return T2W.DE_DE.DICTIONARY.teens[number];
};

/**
 * Get radix
 * convert radix to words
 * @private
 * @param {Array} numbers
 * @param {number} index
 * @return {string}
 */
T2W.DE_DE.prototype._getRadix = function( numbers, index ) {
    var radix = '';

    if (index > 0 && (numbers[T2W.HUNDRED_INDEX] || numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX])) {
        if (index === 1) {
            radix = T2W.DE_DE.DICTIONARY.radix[index];
        }

        if (index > 1 && numbers.length === 1 && numbers[T2W.SINGLE_INDEX]) {
            radix = T2W.DE_DE.DICTIONARY.radix[index][0];
        } else if (index > 1) {
            radix = T2W.DE_DE.DICTIONARY.radix[index][1];
        }
    }

    return radix;
};
