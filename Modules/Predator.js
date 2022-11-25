var LivingCreature = require("./LivingCreature");
var random = require("./random");

module.exports = class Predator extends LivingCreature {
    constructor(x,y) {
        super(x,y);
    }

    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell() {
        this.getNewCordinates();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length && matrix[y][x] != 3 && matrix[y][x] != 6) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }
    changeSpeed(num) {
        let value;
        if(num == 2 || num == 4) {
            value = 1;
        } else if(num == 3) {
            value = 2;
        } else {
            value = 0;
        }
        return value;
    }

    run(num) {
        let val = this.changeSpeed(num);
        if(this.multiply >= val) {
            this.eat();
            this.multiply = 0;
        } else {
            this.multiply++;
        }
    }


    eat() {
        var emptyCells = this.chooseCell();
        var newCell = random(emptyCells);
        if(newCell) {


        var newX = newCell[0];
        var newY = newCell[1];

        if(matrix[newY][newX] == 1) {
            for (var i in grassArray) {
                if (newX == grassArray[i].x && newY == grassArray[i].y) {
                    grassArray.splice(i, 1);
                    break;
                }
            }
        } else if(matrix[newY][newX] == 2) {
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        } else if(matrix[newY][newX] == 4) {
            for (var i in grassPlanterArr) {
                if (newX == grassPlanterArr[i].x && newY == grassPlanterArr[i].y) {
                    grassPlanterArr.splice(i, 1);
                    break;
                }
            }
        } else if(matrix[newY][newX] == 5) {
            for (var i in grassEaterPlanterArr) {
                if (newX == grassEaterPlanterArr[i].x && newY == grassEaterPlanterArr[i].y) {
                    grassEaterPlanterArr.splice(i, 1);
                    break;
                }
            }
        }

        matrix[newY][newX] = matrix[this.y][this.x];
        matrix[this.y][this.x] = 0;
        this.x = newX;
        this.y = newY;
    }
  }
}
