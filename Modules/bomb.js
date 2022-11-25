var random = require("./random");

module.exports = class Bomb {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.directions = [];
  }

  getNewCordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],

      [this.x - 2, this.y - 2],
      [this.x - 1, this.y - 2],
      [this.x, this.y - 2],
      [this.x + 1, this.y - 2],
      [this.x + 2, this.y - 2],
      [this.x + 2, this.y - 1],
      [this.x + 2, this.y],
      [this.x + 2, this.y + 1],
      [this.x + 2, this.y + 2],
      [this.x + 1, this.y + 2],
      [this.x, this.y + 2],
      [this.x - 1, this.y + 2],
      [this.x - 2, this.y + 2],
      [this.x - 2, this.y + 1],
      [this.x - 2, this.y],
      [this.x - 2, this.y - 1],
    ];
  }

  chooseCell(char) {
    this.getNewCordinates();
    let found = [];
    for (let i in this.directions) {
      let x = this.directions[i][0];
      let y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == char) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }

  chooseCell1() {
    this.getNewCordinates();
    let found = [];
    for (let i = 0; i < this.directions.length; i++) {
      let x = this.directions[i][0];
      let y = this.directions[i][1];
      if (
        x >= 0 &&
        x < matrix[0].length &&
        y >= 0 &&
        y < matrix.length &&
        matrix[y][x] != 6
      ) {
        found.push(this.directions[i]);
      }
    }
    return found;
  }

  deleteObjects(X, Y) {
    if (matrix[Y][X] == 1) {
      for (let i = 0; i < grassArray.length; i++) {
        if (X == grassArray[i].x && Y == grassArray[i].y) {
          grassArray.splice(i, 1);
          break;
        }
      }
    } else if (matrix[Y][X] == 2) {
      for (let i in grassEaterArr) {
        if (X == grassEaterArr[i].x && Y == grassEaterArr[i].y) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
    } else if (matrix[Y][X] == 3) {
      for (let i in predatorArr) {
        if (X == predatorArr[i].x && Y == predatorArr[i].y) {
          predatorArr.splice(i, 1);
          break;
        }
      }
    } else if (matrix[Y][X] == 4) {
      for (let i in grassPlanterArr) {
        if (X == grassPlanterArr[i].x && Y == grassPlanterArr[i].y) {
          grassPlanterArr.splice(i, 1);
          break;
        }
      }
    } else if (matrix[Y][X] == 5) {
      for (let i in grassEaterPlanterArr) {
        if (X == grassEaterPlanterArr[i].x && Y == grassEaterPlanterArr[i].y) {
          grassEaterPlanterArr.splice(i, 1);
          break;
        }
      }
    }
  }
  detonate() {
    let found1 = this.chooseCell1();
    for (let i = 0; i < found1.length; i++) {
      var x = found1[i][0];
      var y = found1[i][1];

      this.deleteObjects(x, y);
      matrix[y][x] = 0;
    }
    matrix[this.y][this.x] = 0;
    for (let i in bombArr) {
      if (this.x == bombArr[i].x && this.y == bombArr[i].y) {
        bombArr.splice(i, 1);
        break;
      }
    }
  }

  bombStart() {
    let found = this.chooseCell(3);
    let foundRand = random(found);
    if (foundRand) {
      this.detonate();
    }
  }
};
