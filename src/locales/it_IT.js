/**
 * it_IT locale
 * @constructor
 */
T2W.IT_IT = function () { };

/**
 * Translator dictionary
 * @constant
 * @type {Object}
 */
T2W.IT_IT.DICTIONARY = {
    zero: "zero",
    ones: ["", ["uno", "", "un"], "due", "tre", "quattro", "cinque", "sei", "sette", "otto", "nove"],
    teens: ["dieci", "undici", "dodici", "tredici", "quattordici", "quindici", "sedici", "diciassette", "diciotto", "diciannove"],
    tens: ["", "", ["venti", "vent"], ["trenta", "trent"], ["quaranta", "quarant"], ["cinquanta", "cinquant"], ["sessanta", "sessant"], ["settanta", "settant"], ["ottanta", "ottant"], ["novanta", "novant"]],
    hundred: "cento",
    radix: ["", ["mille", "mila"], ["milione", "milioni"]]
};

/**
 * Token length
 * @constant
 * @type {number}
 */
T2W.IT_IT.TOKEN_LENGTH = 3;

/**
 * Max numbers for this locale
 * @constant
 * @type {number}
 */
T2W.IT_IT.MAX_NUMBERS = 9;

/**
 * Translate numbers to words
 * @public
 * @param {array} numbers
 * @param {number} index
 * @return {string}
 */
T2W.IT_IT.prototype.translate = function (numbers) {

    // Check max value
    if (numbers.length * T2W.IT_IT.TOKEN_LENGTH > T2W.IT_IT.MAX_NUMBERS) {
        throw {
            name: "Error",
            message: "The length of numbers is longer than the maximum value(" + T2W.IT_IT.MAX_NUMBERS + ")."
        };
    }

    // Deal with zero value
    if (numbers[T2W.SINGLE_INDEX] === 0 && numbers.length === 1) {
        return T2W.IT_IT.DICTIONARY.zero;
    }

    var words = [];
    for (var idx = 0, max = numbers.length; idx < max; idx++) {
        words.unshift(this._getTrio(this.tokenize(numbers[idx], 1), idx, max, words));
    }

    return words.join("");
};

/**
 * Converts first three numbers to words.
 * @private
 * @param {Array} numbers
 * @param {number} index
 * @param {number} max - length of tokens
 * @return {string}
 */
T2W.IT_IT.prototype._getTrio = function (numbers, index, max, formerWords) {
    var hundred = "";
    var ten = "";
    var single = "";
    var radix = this._getRadix(numbers, index);
    var result = "";

    if (numbers[T2W.HUNDRED_INDEX]) {
        hundred = this._getOnes(numbers[T2W.HUNDRED_INDEX], index, numbers[T2W.TEN_INDEX], false) + T2W.IT_IT.DICTIONARY.hundred;
    }

    if (numbers[T2W.TEN_INDEX]) {
        ten = this._getTeens(numbers[T2W.SINGLE_INDEX]);
    }

    if (numbers[T2W.TEN_INDEX] >= 2) {
        ten = numbers[T2W.SINGLE_INDEX]
            ? this._getTens(numbers[T2W.TEN_INDEX], numbers[T2W.SINGLE_INDEX]) + this._getOnes(numbers[T2W.SINGLE_INDEX])
            : this._getTens(numbers[T2W.TEN_INDEX]);
    }

    if (!numbers[T2W.TEN_INDEX]) {
        single = this._getOnes(numbers[T2W.SINGLE_INDEX], index, numbers[T2W.TEN_INDEX], true);
    }

    if (index >= 2) {
        single += " ";
    }

    result = hundred + ten + single + radix;

    if (index > 1 && formerWords.join("").length > 0) {
        result += " e ";
    }

    return result;
};

/**
 * Get ones
 * helper method to access the dictionary
 * @private
 * It solves exceptions in the Italian language.
 * @param {number} number
 * @param {number} index
 * @param {boolean} isSingle
 * @return {string}
 */
T2W.IT_IT.prototype._getOnes = function (number, index, tensOfNumber, isSingle) {
    if (number === 1) {
        if (index === 0 && isSingle) {
            return T2W.IT_IT.DICTIONARY.ones[number][0];
        } else if (index === 0) {
            return T2W.IT_IT.DICTIONARY.ones[number][1];
        }

        if (index === 1) {
            return T2W.IT_IT.DICTIONARY.ones[number][1];
        }

        if (index >= 2 && isSingle && tensOfNumber === undefined) {
            return T2W.IT_IT.DICTIONARY.ones[number][2];
        }

        return T2W.IT_IT.DICTIONARY.ones[number][0];
    }
    return T2W.IT_IT.DICTIONARY.ones[number];
};

/**
 * Get tens
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @return {string}
 */
T2W.IT_IT.prototype._getTens = function (number, unit) {
    if (unit === 1 || unit == 8) {
        return T2W.IT_IT.DICTIONARY.tens[number][1];
    }
    return T2W.IT_IT.DICTIONARY.tens[number][0];
};

/**
 * Get teens
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @return {string}
 */
T2W.IT_IT.prototype._getTeens = function (number) {
    return T2W.IT_IT.DICTIONARY.teens[number];
};

/**
 * Get radix
 * convert radix to words
 * @private
 * @param {Array} numbers
 * @param {number} index
 * @return {string}
 */
T2W.IT_IT.prototype._getRadix = function (numbers, index) {
    var radix = "";

    if (index > 0 && (numbers[T2W.HUNDRED_INDEX] || numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX])) {
        if (index === 1 && numbers.length === 1 && numbers[T2W.SINGLE_INDEX] === 1) {
            radix = T2W.IT_IT.DICTIONARY.radix[index][0];
        } else if (index === 1) {
            radix = T2W.IT_IT.DICTIONARY.radix[index][1];
        }

        if (index > 1 && numbers.length === 1 && numbers[T2W.SINGLE_INDEX] === 1) {
            radix = T2W.IT_IT.DICTIONARY.radix[index][0];
        } else if (index > 1) {
            radix = T2W.IT_IT.DICTIONARY.radix[index][1];
        }
    }

    return radix;
};
