var LivingCreature = require("./LivingCreature");
var random = require("./random"); 

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y){
        super(x, y);
        this.energy = 12;
    }
    
   getNewCoordinates() {
       this.directions = [
           [this.x - 1, this.y - 1],
           [this.x, this.y - 1],
           [this.x + 1, this.y - 1],
           [this.x - 1, this.y],
           [this.x + 1, this.y],
           [this.x - 1, this.y + 1],
           [this.x, this.y + 1],
           [this.x + 1, this.y + 1]
       ];
   }
   chooseCell(char) {
       this.getNewCoordinates();
       return super.chooseCell(char);
   }

   maxEnergyChanger(num) {
    let value;
    if(num == 2 || num == 4) {
        value = 70;
    } else if(num == 3) {
        value = 90;
    } else {
        value = 40;
    }
    return value;
   }
   
   mul() {
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

    if(newCell) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 2;

        var newEater = new GrassEater(newX,newY);
        grassEaterArr.push(newEater);
    }
}

move() {
    this.energy--;
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

    if(newCell && this.energy >= 0) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = matrix[this.y][this.x];
        matrix[this.y][this.x] = 0;
        this.x = newX;
        this.y = newY;
    } else {
        this.die();
    }

}

eat(num) {
    let val = this.maxEnergyChanger(num);
    var emptyCells = this.chooseCell(1);
    var newCell = random(emptyCells);

    if(newCell) {
        this.energy++;
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = matrix[this.y][this.x];
        matrix[this.y][this.x] = 0;
        this.x = newX;
        this.y = newY;

        for (var i in grassArray) {
            if (newX == grassArray[i].x && newY == grassArray[i].y) {
                grassArray.splice(i, 1);
                break;
            }
        }   
        
    } else {
        this.move();
    } 
    if(this.energy > val) {
        this.mul();
    }
}

die() {
    matrix[this.y][this.x] = 0;
    for (var i in grassEaterArr) {
        if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
            grassEaterArr.splice(i, 1);
            break;
        }
    }
}
}
