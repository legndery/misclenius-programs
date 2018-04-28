process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});


process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    process.stdout.write(""+(new Solver(input_stdin_array).solve())+"\n");
});

function Solver(inputs) {

    this.inputs = inputs;
    this.repo = "";
    this.cost = 0;
    this.dict = {};
    this.chosenLevels = {};

    this.solve = function () {
        var inp = this.inputs;
        inp.splice(0, 1);
        for (var i = 0; i < inp.length; i++) {
            var level = void 0,
                costForLevel = void 0;
            for (var j = 0; j < inp.length; j++) {
                if (this.chosenLevels[j]) continue;

                var c = this.calcCost(inp[j], this.repo); // old + new
                if (costForLevel === undefined || costForLevel > c) {
                    costForLevel = c;
                    level = j;
                }
            }
            //choosing this level;
            this.setCost(costForLevel);
            this.chosenLevels[level] = "ok";
            this.setRepo(this.calculateRepo(inp[level], this.repo));
        }
        return this.cost;
    };
    this.calcCost = function (needed, repo) {
        if (this.dict[needed + 'x' + repo]) {
            return this.dict[needed + 'x' + repo];
        }
        var repoInBinary = parseInt(repo, 2);
        var neededInBinary = parseInt(needed, 2);
        var weapons = repoInBinary ^ (repoInBinary | neededInBinary);

        var bitmap = (weapons >>> 0).toString(2);
        var cost = Math.pow(bitmap.split('').reduce(function (p, c) {
            return p + parseInt(c);
        }, 0), 2);
        this.dict[needed + 'x' + repo] = cost + this.cost;
        return cost + this.cost;
    };
    this.calculateRepo = function (needed, repo) {
        var repoInBinary = parseInt(repo, 2);
        var neededInBinary = parseInt(needed, 2);
        return ((repoInBinary | neededInBinary) >>> 0).toString(2);
    };
    this.setRepo = function (repo) {
        this.repo = repo;
    };
    this.setCost = function (cost) {
        this.cost = cost;
    };
}