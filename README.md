# Number to Words (JavaScript)
It converts a numeric value to words.

##Example
```
var translator = new T2W("EN_US");
// one thousand two hundred thirty four
translator.toWords(1234)
```

##Now available locales
 - en_US
 - cs_CZ (0...999999999)
 
**Anyone can implements to your locale vocabulary**. For additional locale send pull request with locale file + tests.
 
**Locale object**
The locale object must implement method **translate**.
```
/**
 * Translate numbers to words
 * @public
 * @param {array} numbers
 * @param {number} index
 * @return {string}
 */
translate( numbers, index){
 // implement it
};
```
