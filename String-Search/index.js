const fs = require('fs');
const string = fs.readFileSync('text.txt').toString();
const atob = require('atob');
const btoa = require('btoa');
const b64Search = require('./search');
console.log(string)
console.log('---------');
console.log(btoa(string));
console.log('-----------')
console.log(atob(btoa(string)));
const needles = ['containing', ' containing', '  containing'];
const ecNeedle = needles.map(needle=>btoa(needle));
console.log('---------');
console.log(ecNeedle);
for(var i=0;i<3;i++){
    let str = ''
    for(var j=0;j<i;j++){
        str += '.'
    }
    str += 'Lorem';
    console.log(btoa(str));
}
var Util = {
	toBinary: function(input, separator) {
		var result = "";
		for (var i = 0; i < input.length; i++) {
			var bin = input[i].charCodeAt().toString(2);
            result += Array(8 - bin.length + 1).join("0") + bin;
            separator && (result += separator);
		} 
		return result;
	},

	toAscii: function(input) {
		var result = "";
		var arr = input.match(/.{1,8}/g);
		for (var i = 0; i < arr.length; i++) {
			result += String.fromCharCode(parseInt(arr[i], 2).toString(10));
		}
		return result;
	}
}
/**
 * Size: 6k
 * 1) No contamination
 * 2) 2 bit pushed: first and last character contamination.
 * 3) 4 bit pushed: first and last character contamination.
 * 
 * Size: 6k + 2
 * 1) Last character contamination
 * 2) 2 bit pushed: first and last character contamination.
 * 3) 4 bit pushed: first character contamination
 * 
 * Size: 6k + 4
 * 1) Last Character Contamination
 * 2) 2 bit pushed: first character contamination.
 * 3) 4 bit pushed: first and last character contamination.
 */
const index = b64Search("lol",btoa(string));
console.log(index);