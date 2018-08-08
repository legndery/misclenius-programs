const btoa = require('btoa');
/**
 * 
 * @param {String} needle 
 * @param {String} haystack
 * @param {Number} position 
 */
function b64Search(needle, haystack, position){
    /**
     * GROUPS OF 4
     * Size: 6k, 3->4
     * 1) No contamination
     * 2) 2 bit pushed: first and last character contamination. 
     * 1 extra char added at front. 2 character added at rear for padding. Remove first 2 and Last 3 
     * 3) 4 bit pushed: first and last character contamination. Remove first 3 and Last 2
     * 
     * Size: 6k + 2
     * 1) Last character contamination. Remove Last 3
     * 2) 2 bit pushed: first and last character contamination.
     * 3) 4 bit pushed: first character contamination
     * 
     * Size: 6k + 4
     * 1) Last Character Contamination
     * 2) 2 bit pushed: first character contamination.
     * 3) 4 bit pushed: first and last character contamination.
     */
    position = position || 0;
    let _case = 0;
    switch((needle.length*8)%6){
        case 0: _case=0;break;
        case 2: _case=1;break;
        case 4: _case=2;break;
    }
    const needles = [needle, '_'+needle, '__'+needle];
    /** @type {[String]} */
    let ecNeedles = needles.map(btoa);
    switch(_case){
        case 0:
        ecNeedles[1] = ecNeedles[1].substring(2,ecNeedles[1].length-3);
        ecNeedles[2] = ecNeedles[2].substring(3,ecNeedles[2].length-2);
        break;
        case 1:
        ecNeedles[0] = ecNeedles[0].substring(0,ecNeedles[0].length-3);
        ecNeedles[1] = ecNeedles[1].substring(2,ecNeedles[1].length-2);
        ecNeedles[2] = ecNeedles[2].substring(3,ecNeedles[2].length);
        break;
        case 2:
        ecNeedles[0] = ecNeedles[0].substring(0,ecNeedles[0].length-2);
        ecNeedles[1] = ecNeedles[1].substring(2,ecNeedles[1].length);
        ecNeedles[2] = ecNeedles[2].substring(3,ecNeedles[2].length-3);
        break;
    }
    const indexes = ecNeedles.map(n=> Number(haystack.indexOf(n, position)));
    const ret = indexes.reduce((p, c, i)=>{
        if(c>-1){
            if(p.index === null){
                p.index = c;
            }else{
                if(p.index > c){
                    p.index = c;
                }
            }
        }
        return p;
    },{index:null,term:''})
    return ret;
}
module.exports = b64Search;