var number = process.argv[2];
// your code goes here
let numMap = {
    1000: "M",
    500: "D",
    100:"C",
    50:"L",
    10:"X",
    5:"V",
    1:"I",
}
////////////
let digits = Math.floor(Math.log10(number))+1;
let divide = digits >=4? 1000: Math.pow(10,digits-1);
var whatCharHowMuch = [];
while(number > 0){
    let currentDigit = Math.floor(number/divide);
    number = number%divide;
    if(divide<1000){
        switch(currentDigit){
            case 1:;case 2:;case 3: 
                whatCharHowMuch.push({char:numMap[divide],num:currentDigit});
                break;
            case 4: whatCharHowMuch.push({char:numMap[divide],num:1});
            case 5: whatCharHowMuch.push({char:numMap[divide*5],num:1});
                break;
            case 6:;case 7:;case 8: 
                whatCharHowMuch.push({char:numMap[divide*5],num:1});
                whatCharHowMuch.push({char:numMap[divide], num:currentDigit-5});
                break;
            case 9:
                whatCharHowMuch.push({char:numMap[divide],num:1});
                whatCharHowMuch.push({char:numMap[divide*10], num:1});
        }
    }else{
        whatCharHowMuch.push({char:numMap[divide],num:currentDigit});
    }
    divide /= 10;
}
console.log(whatCharHowMuch.reduce(function(p,c){
    for(var i=0;i<c.num;i++) p+=c.char;
    return p;
},""));