const input = 'tracn'
const pattern = 't^a^'
const tokens = pattern.split('^');
const stringMap = [];
let ret = false;
tokens.forEach((t,i)=>{
    if(!t){
        if(i === 0){
            stringMap.push([-1]);
        }else{
            stringMap.push([input.length]);
        }
        return;
    }
    stringMap[i] = [];
    let pos = input.indexOf(t, 0);
    if(pos === -1) ret = true;
    while(pos !== - 1){
        stringMap[i].push(pos);
        pos = input.indexOf(t, pos+1);
    }
});
if(ret){
    console.log(0);
}
console.log(stringMap);
const indexArr = [];
let goOn = true;
let flag = false;

console.log(flag);
