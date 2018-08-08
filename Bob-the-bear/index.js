// process.stdin.resume();
// process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

// process.stdin.on('data', function (data) {
//     input_stdin += data;
// });


// process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    input_stdin_array=[
        5,
        [4, 4, 2, 2, 4],
        [1, 4, 1, 6, 4]
    ];
    console.log(new Solver(input_stdin_array).solve());
    // process.stdout.write(""+(new Solver(input_stdin_array).solve())+"\n");
// });

function Solver(inputs) {

    this.inputs = inputs;
    this.repo = "";
    this.cost = 0;
    this.dict = {};
    this.chosenLevels = {};
    this.bitstring
    this.processData = function(){
        this.inputs[1] = this.inputs[1].split(' ').map(Number);
        this.inputs[2] = this.inputs[2].split(' ').map(Number);
        this.inputs.splice(3,1);
    }
    this.unionLength = function(arr1,arr2){
        var m = arr1.length, n = arr2.length, i=0,j=0;
        var ret = [];
        while(i<m && j<m){
            if(arr1[i] < arr2[j]){
                ret.push(arr1[i]);
                i++;
            }else if(arr2[j] < arr1[i]){
                ret.push(arr2[j]);
                j++;
            }
            else{
                ret.push(arr2[j]);
                i++;
                j++;
            }
        }
        while(i<m){
            ret.push(arr1[i]);
            i++;
        }
        while(j<n){
            ret.push(arr2[j]);
            j++;
        }
        return ret.length;
    }
    this.solve = function () {
        this.processData();
        var time_length_pair = [];
        var freq_at_start_time = {};
        for(var i=0;i<this.inputs[0];i++){
            time_length_pair.push({'start':this.inputs[2][i], 
            'length':this.inputs[1][i], 
            'finish':this.inputs[2][i]+this.inputs[1][i]});
        }
        time_length_pair.sort(function(a,b){
            if(a.start === b.start){
                return a.length-b.length;
            }
            return a.start-b.start;
        });
        freq_at_start_time = time_length_pair.reduce(function(p, c, i){
            if(p[c.start]){
               p[c.start].push(i);
            }else{
                p[c.start] = [i];
            }
            return p;
        },{});
        
        var freq_at_start_time_keys = Object.keys(freq_at_start_time);
        for(var i=0;i<freq_at_start_time_keys.length-1;i++){
            var next_start_time = freq_at_start_time_keys[i+1];
            var array_concat =[];
            freq_at_start_time[freq_at_start_time_keys[i]].forEach(function(key,index){
                if(time_length_pair[key].finish>=next_start_time){
                    array_concat.push(key);
                }
            });
            freq_at_start_time[next_start_time]= 
                array_concat.concat(freq_at_start_time[next_start_time]);
            array_concat = [];
        }
        //now select two array with maximum unique element.
        var freq_map = freq_at_start_time_keys.sort(function(a,b){
            if(freq_at_start_time[a].length === freq_at_start_time[b].length){
                return b-a;
            }
            return -freq_at_start_time[a].length + freq_at_start_time[b].length;
        });
        var maximum = 0, upperBound=this.inputs[0],lowerBound=this.inputs[0]<2?this.inputs[0]:2;
        if(lowerBound == upperBound){
            return lowerBound;
        }
        ///////////////////
        for(var i=0;i<freq_map.length;i++){
            var selectedElement1 = freq_at_start_time[freq_map[i]];
            var sELength1 = selectedElement1.length;
            if(sELength1 > lowerBound){
                lowerBound = sELength1;
            }
            for(var j=i;j<freq_map.length; j++){
                var selectedElement2 = freq_at_start_time[freq_map[j]];
                var sELength2 = selectedElement2.length;
                if(sELength1+sELength2 <= lowerBound){
                    break;
                }
                var total = this.unionLength(selectedElement1,selectedElement2);
                if(total > maximum){
                    maximum = total;
                    lowerBound = maximum; 
                }
            }
            if(maximum == upperBound){
                return maximum;
            }
        }
        return maximum;
    }
}
/*
11000
11000
01000
01110
00110
00111
00111

11000
01000
01110
00110
00111

11
1111
0001111
0001111
0000011
*/