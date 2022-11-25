var LivingCreature = require("./LivingCreature");
var random = require("./random");

module.exports = class Grass extends LivingCreature {
    constructor(x,y) {
        super(x,y);
    }
    changeNum(num){
        let value;
        if(num == 2 || num == 4) {
            value = 11;
        } else if(num == 3) {
            value = 17;
        } else {
            value = 6;
        }
        return value;
    }
    mul(num){
        let val = this.changeNum(num);
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if(this.multiply >= val && newCell) {
            var newGrass = new Grass(newCell[0],newCell[1]);
            grassArray.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}
