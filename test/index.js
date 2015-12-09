var LZString = require("lz-string");

var string = "This is my compression test.";
console.info("Size of sample is: " + string.length);
var compressed = LZString.compress(string);
console.info("Size of compressed sample is: " + compressed.length);
string = LZString.decompress(compressed);
console.info("Sample is: " + string);
