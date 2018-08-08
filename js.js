// Read a text file containing a set of flat polygons represented as one polygon per line. 
// Each line contains a comma-separated list of side lengths (for example “3,4,8,5,7”). 
// Write a function to classify the set of polygons into four mutually exclusive subsets: 
// triangles, rectangles, squares, and everything else. 
// The union of all four subsets should be the original set of polygons. 
// All the sides of the polygons are connected and the angles between them are irrelevant. 
// Only consider the lengths. Consider that the code will be used in a high load environment.
//////////////////////////////////////////
const fs = require('fs');
function checkTriangle(lines){
    const a = lines[0];
    const b = lines[1];
    const c = lines[2];
    return (((a + b) > c) && ((a + c) > b) && ((b + c) > a));
}
function checkSquareOrRect(lines){
    //square = 1, rect =2, other = 0
    const a = lines[0];
    const b = lines[1];
    const c = lines[2];
    const d = lines[3];

    const result = lines.reduce((p, currentLine) => {
        return  p && (currentLine  === a);
    }, true);
    
    if(result) {
        return 1;
    } 
    else 
    if(((countElement(lines, a) == 2) && (countElement(lines, b) == 2))
    ||  ((countElement(lines, a) == 2) && (countElement(lines, c) == 2)) 
    ||  ((countElement(lines, a) == 2) && (countElement(lines, d) == 2)) 
    ||  ((countElement(lines, b) == 2) && (countElement(lines, c) == 2)) 
    ||  ((countElement(lines, b) == 2) && (countElement(lines, d) == 2)) 
    ||  ((countElement(lines, c) == 2) && (countElement(lines, d) == 2)) ) {
        return 2
    } 
    else {
        return 0;
    }
}
function countElement(array, needle) {
    const count = array.reduce((p, c)=>{
        p += (c === needle)
        return p
    },0);
    return count;
}
fs.readFile('polygons.txt', function(err,data){

    const polygons = {
        triangles: [],
        rectangles: [],
        squares: [],
        others: []
    }

    const polygonArr = data.toString().split('\n');

    polygonArr.map((item)=>{
        let sides =  item.split(',');
        item = sides.map(Number);
        const length = sides.length;
        if(length > 4){
            polygons.others.push(item);
        }else{
            switch(length)
            {
                case 3 :
                    if(checkTriangle(item)){
                        polygons.triangles.push(item);
                    }else{
                        polygons.others.push(item);
                    }
                break;
                case 4 :
                    const check = checkSquareOrRect(item);
                    switch(check){
                        case 1: polygons.squares.push(item);break;
                        case 2: polygons.rectangles.push(item);break;
                        case 0: polygons.others.push(item);break;
                    }
                break;
            }
        }
    })
    console.log('Triangles: ')
    console.log(polygons.triangles);
    console.log("Rectangles:")
    console.log(polygons.rectangles);
    console.log("Squares: ")
    console.log(polygons.squares)
    console.log('Others: ')
    console.log(polygons.others);
});