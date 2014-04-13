# Number to Words (JavaScript)
It converts a numeric value to words.

There are a lot of exceptions in the inflection of words in different languages. 
So I decided to use the [Strategy design pattern](http://en.wikipedia.org/wiki/Strategy_pattern) for this type of problem.
Anyone can implements to your locale vocabulary.

###Locale
 - us_US
 - cs_CZ
 
Just create a locale file for another language.
 
###Example
 - 1234 -> one thousand two hundred thirty four
 - 1234 -> tisícdvěstětřicetčtyři
 
###Locale
TODO