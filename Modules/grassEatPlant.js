var LivingCreature = require("./LivingCreature");
var random = require("./random");
var GrassEater = require("./GrassEater");

module.exports = class GrassEaterPlanter extends LivingCreature {
    constructor(x,y) {
        super(x,y);
    }

    plant() {
        if(grassEaterArr.length <= 15) {
            var emptyCells = this.chooseCell(0);
            var newCell = random(emptyCells);

            if(newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 2;

                var grassEater1 = new GrassEater(newX,newY);
                grassEaterArr.push(grassEater1);
            }
        }
    }
}
