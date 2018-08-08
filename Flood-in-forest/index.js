/* @flow */
inputs = `85 28.3,-26 60 1 1,14 60 1 1,-8 60 1 1,20 60 1 1,-36 60 1 1,28 40 0 4,11 60 1 1,18 60 1 1,-12 40 0 4,-31 60 1 1,-3 60 1 1,-30 60 1 1,-17 60 1 1,20 40 0 4,3 60 1 1,-25 60 1 1,-7 60 1 1,-35 60 1 1,-1 60 1 1,-32 40 0 4,-2 60 1 1,6 60 1 1,16 60 1 1,-6 60 1 1,0 20 0 16,24 40 0 4,-16 40 0 4,-23 60 1 1,-20 40 0 4,7 60 1 1,9 60 1 1,-22 60 1 1,4 60 1 1,0 60 1 1,25 60 1 1,-11 60 1 1,19 60 1 1,-24 40 0 4,17 60 1 1,4 40 0 4,-10 60 1 1,1 60 1 1,8 40 0 4,-32 60 1 1,-29 60 1 1,22 60 1 1,-13 60 1 1,-8 40 0 4,23 60 1 1,-33 60 1 1,-16 60 1 1,-20 60 1 1,15 60 1 1,-14 60 1 1,-4 60 1 1,0 40 0 4,-27 60 1 1,-16 20 0 16,8 60 1 1,26 60 1 1,16 40 0 4,12 40 0 4,-19 60 1 1,-21 60 1 1,24 60 1 1,10 60 1 1,-8 20 0 16,-5 60 1 1,12 60 1 1,13 60 1 1,-9 60 1 1,-28 60 1 1,27 60 1 1,21 60 1 1,-15 60 1 1,0 0 0 1,5 60 1 1,-24 60 1 1,-4 40 0 4,8 20 0 16,-28 40 0 4,-18 60 1 1,-34 60 1 1,-12 60 1 1,2 60 1 1`.split(",");
console.log(
new Solver(inputs).solve()
);

function Solver(inputs){
    this.inputs= inputs.map(function(input){
        return input.split(" ").map(Number);
    });
    // console.log(this.inputs);
    this.trees = [];
    this.jumping_cap = 0;
    this.total_monkey = 0;
    this.treeMap = {};
    this.ecDist = function(x1,y1, x2,y2){
        return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
    }
    this.getTreemap = function(i,j){
        return this.treeMap[i+'x'+j] || this.treeMap[j+'x'+i];
    }
    this.isTreeViable = function(index){
        var tree1 = Object(this.trees[index]);
        var trees = [];
        trees[index] = tree1;

        for(var i=0;i<this.trees.length;i++){
            if(i == index) continue;
            var tree2 = Object(this.trees[i]);
            if(this.getTreemap(i,index)<=this.jumping_cap){
                var diff = Math.min(tree2.can_jump_from, tree2.monkey);
                tree2.can_jump_from -= diff;
                tree1.monkey += diff;
                tree2.monkey -= diff;
            }
            trees[i] = tree2;
        }
        if(index == 0)
        console.log(trees)
        if(tree1.monkey === this.total_monkey){
            
            return true;
        }
        return false;
    }

    this.solve = function(){
        var that = this;
        var num_trees = this.inputs[0][0];
        this.jumping_cap = this.inputs[0][1];
        this.inputs.splice(0,1);
        this.trees = this.inputs.map(function(input){
            that.total_monkey += input[2];
            return {'x': input[0], 'y':input[1], 'monkey':input[2], 'can_jump_from':input[3]};
        });

        for(var i=0;i<this.trees.length;i++){
            for(var j=i+1;j<this.trees.length;j++){
                this.treeMap[i+'x'+j] = this.ecDist(this.trees[i].x, this.trees[i].y, this.trees[j].x, this.trees[j].y);
            }
        }
        // console.log(this.treeMap);
        var retArr = [-1];
        for(var i=0;i<this.trees.length;i++){
            if(this.isTreeViable(i)) {
                if(retArr[0] == -1) {
                    retArr[0] = i;
                }else{
                    retArr.push(i);
                }
            }
        }
        return retArr.join(" ");
    }
}