var solver = function (inputs) {
    ///get n and m
    // console.log(inputs)
    const nm = inputs[0].split(" ");
    const n = nm[0], m = nm[1];
    ///////////////
    ////get edges and santa path
    inputs.splice(0, 1);
    inputs = inputs.map(function (input) {
        return input.split(" ").map(function (i) { return parseInt(i) });
    });

    var edges = inputs.splice(0, n - 1);
    var santaToFrom = inputs.map(function(i){return i.sort()});
    //////////////////
    ///make graph/////
    var graph = {};
    for (var i = 1; i <= n; i++) {
        graph[i] = [];
    }
    edges.forEach(function (edge) {
        graph[edge[0]].push(edge[1]);
        graph[edge[1]].push(edge[0]);
    });
    ///////////////////
    var visited = {};
    var path = [];
    var gifts = {};
    var maxGift =0, maxGiftHouse = 0;
    var pathDict = {};
    var dfs = function (from, to, graph,visited) {
        visited[from] = true;
        path.push(from);
        var pathForward = pathDict[currentSanta[0]+'x'+from];
        var pathBack = pathDict[from+'x'+currentSanta[0]];
        if( !pathForward || (pathForward && pathForward.length>path.length)){
            pathDict[currentSanta[0]+'x'+from]= [].concat(path);
        }
        if( !pathBack || (pathBack && pathBack.length>path.length)){
            pathDict[from+'x'+currentSanta[0]]= pathDict[currentSanta[0]+'x'+from];
        }
        if(from === to){
            pathToGift(path);
        }else{
            for(var i=0;i<graph[from].length;i++){
                if(!visited[graph[from][i]]){
                    dfs(graph[from][i],to, graph,visited);
                }
            }
        }
        path.length -=1;
        visited[from] = false;
    }
    
    // var isNotVisited = function(x, path){
    //     return path.indexOf(x) < 0;
    // }
    // var bfs = function(from, to, graph){
    //     var queue = [];//to store paths
    //     var path = [];
    //     path.push(from);
    //     queue.push(path);
    //     while(queue.length>0){
    //         path = queue.splice(0,1)[0];
    //         var last = path[path.length-1];
            
    //         var pathForward = pathDict[currentSanta[0]+'x'+last];
    //         var pathBack = pathDict[last+'x'+currentSanta[0]];
    //         if( !pathForward || (pathForward && pathForward.length>path.length)){
    //             pathDict[currentSanta[0]+'x'+last]= [].concat(path);
    //         }
    //         if( !pathBack || (pathBack && pathBack.length>path.length)){
    //             pathDict[last+'x'+currentSanta[0]]= pathDict[currentSanta[0]+'x'+last];
    //         }
    //         if(last === to){
    //             // console.log(path);
    //             pathToGift(path);
    //             return;
    //         }
    //         //add the childrens
    //         for(var i=0;i<graph[last].length;i++){
    //             if(isNotVisited(graph[last][i], path)){
    //                 var newPath = [].concat(path);
    //                 newPath.push(graph[last][i]);
    //                 queue.push(newPath);
    //             }
    //         }
    //     }
    // }
    var pathToGift = function(path){
        path.forEach(function(p){
            if(gifts[p]){
                gifts[p]++;
            }else{
                gifts[p] = 1;
            }
            if(gifts[p]>maxGift){
                maxGift = gifts[p];
                maxGiftHouse=p;
            }
        });
    }
    for(var i=0;i<m;i++){
        var currentSanta = santaToFrom[i];
        if(pathDict[currentSanta[0]+'x'+currentSanta[1]]){
            pathToGift(pathDict[currentSanta[0]+'x'+currentSanta[1]]);
        }else
            // bfs(currentSanta[0], currentSanta[1], graph);
            dfs(santaToFrom[i][0], santaToFrom[i][1], graph, visited);
       
    }
    return maxGift;
}
const output = solver(
`5 10
3 4
1 5
4 2
5 4
5 4
5 4
3 5
4 3
4 3
1 3
3 5
5 4
1 5
3 4`.split("\n")
);
// const output = solver(
// `4 2
// 1 2
// 2 3
// 2 4
// 1 4
// 3 4`.split('\n')
// );
console.log(output);