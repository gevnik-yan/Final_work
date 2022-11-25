var Grass = require("./Modules/Grass.js");
var GrassEater = require("./Modules/GrassEater.js");
var GrassEaterPlanter = require("./Modules/grassEatPlant.js");
var GrassPlanter = require("./Modules/grassPlanter.js");
var Predator = require("./Modules/Predator.js");
var Bomb = require("./Modules/bomb.js");
var random = require("./Modules/random");

var season = 1;

matrix = [];
grassArray = [];
grassEaterArr = [];
predatorArr = [];
grassPlanterArr = [];
grassEaterPlanterArr = [];
bombArr = [];

function fillMatrix(num1, num2, num3, num4, num5, num6) {
  for (let m = 0; m < num1; m++) {
    let randX = Math.floor(Math.random() * matrix[0].length);
    let randY = Math.floor(Math.random() * matrix.length);

    matrix[randY][randX] = 1;
  }

  for (let m = 0; m < num2; m++) {
    let randX = Math.floor(Math.random() * matrix[0].length);
    let randY = Math.floor(Math.random() * matrix.length);

    matrix[randY][randX] = 2;
  }
  for (let m = 0; m < num3; m++) {
    let randX = Math.floor(Math.random() * matrix[0].length);
    let randY = Math.floor(Math.random() * matrix.length);

    matrix[randY][randX] = 3;
  }
  for (let m = 0; m < num4; m++) {
    let randX = Math.floor(Math.random() * matrix[0].length);
    let randY = Math.floor(Math.random() * matrix.length);

    matrix[randY][randX] = 4;
  }
  for (let m = 0; m < num5; m++) {
    let randX = Math.floor(Math.random() * matrix[0].length);
    let randY = Math.floor(Math.random() * matrix.length);

    matrix[randY][randX] = 5;
  }
  for (let m = 0; m < num6; m++) {
    let randX = Math.floor(Math.random() * matrix[0].length);
    let randY = Math.floor(Math.random() * matrix.length);

    matrix[randY][randX] = 6;
  }
}


function createMatrix(width, height, num1, num2, num3, num4, num5, num6) {
  for (let i = 0; i < height; i++) {
    matrix.push([]);
    for (let j = 0; j < width; j++) {
      matrix[i].push(0);
    }
  }
  
  fillMatrix(num1, num2, num3, num4, num5, num6);
}

createMatrix(45, 45, 800, 100, 60, 20, 20, 60);

var express = require("express");
var app = express();
var Grass = require("./Modules/Grass");
var server = require("http").Server(app);
var io = require("socket.io")(server);
app.use(express.static("."));
app.get("/", function (req, res) {
  res.redirect("index.html");
});
server.listen(3000);


function CreateObjects() {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        let grass1 = new Grass(x,y);
        grassArray.push(grass1);
      } else if (matrix[y][x] == 2) {
        let grassEater = new GrassEater(x, y);
        grassEaterArr.push(grassEater);
      } else if (matrix[y][x] == 3) {
        let predator1 = new Predator(x, y);
        predatorArr.push(predator1);
      } else if (matrix[y][x] == 4) {
        let grassPlanter1 = new GrassPlanter(x, y);
        grassPlanterArr.push(grassPlanter1);
      } else if (matrix[y][x] == 5) {
        let grassEaterPlanter1 = new GrassEaterPlanter(x, y);
        grassEaterPlanterArr.push(grassEaterPlanter1);
      } else if (matrix[y][x] == 6) {
        let bomb1 = new Bomb(x, y);
        bombArr.push(bomb1);
      }
    }
  }
}

CreateObjects();


function deleteObjects() {
  grassArray.splice(0, grassArray.length);
  grassEaterArr.splice(0, grassEaterArr.length);
  predatorArr.splice(0, predatorArr.length);
  grassPlanterArr.splice(0, grassPlanterArr.length);
  grassEaterPlanterArr.splice(0, grassEaterPlanterArr.length);
  bombArr.splice(0, bombArr.length);
}

function clear() {
  deleteObjects();
  for(let i = 0; i < matrix.length; i++) {
    for(let j = 0; j < matrix[i].length;j++) {
      matrix[i][j] = 0;
    }
  }
  
  fillMatrix(800, 100, 60, 20, 20, 60);
  CreateObjects();
}

io.on("connection", (socket) => {
  socket.on("clicked", function () {
    if (bombArr[0] !== undefined) {
      let rand = Math.floor(Math.random() * bombArr.length);
      bombArr[rand].detonate();
    }
  });
  socket.on("season changed", () => {
      if (season == 4) {
        season = 1;
      } else {
        season++;
      }
    });

  socket.on("clear canvas", () => {
    clear();
  });
});





function game() {
  if (grassArray[0] !== undefined) {
    for (let i in grassArray) {
      grassArray[i].mul(season);
    }
  }
  if (grassEaterArr[0] !== undefined) {
    for (let i in grassEaterArr) {
      grassEaterArr[i].eat(season);
    }
  }
  if (predatorArr[0] !== undefined) {
    for (let i in predatorArr) {
      predatorArr[i].run(season);
    }
  }
  if (grassPlanterArr[0] !== undefined) {
    for (let i in grassPlanterArr) {
      grassPlanterArr[i].plant();
    }
  }
  if (grassEaterPlanterArr[0] !== undefined) {
    for (let i in grassEaterPlanterArr) {
      grassEaterPlanterArr[i].plant();
    }
  }
  if (bombArr[0] !== undefined) {
    for (let i in bombArr) {
      bombArr[i].bombStart();
    }
  }

  let sendData = {
    matrix: matrix,
    grassCounter: grassArray.length,
    grassEaterCounter: grassEaterArr.length,
    predatorCounter: predatorArr.length,
    grassPlanterCounter: grassPlanterArr.length,
    grassEaterPlanterCounter: grassEaterPlanterArr.length,
    bombCounter: bombArr.length,
  };
  io.sockets.emit("data", sendData);
  io.sockets.emit("current season", season);
}
setInterval(game, 100);
