function setup() {
  noStroke();
  var socket = io();
  var side = 18;
  var matrix = [];
  let grassCountElement = document.getElementById("grassCount");
  let grassEaterCountElement = document.getElementById("grassEaterCount");
  let predatorCountElement = document.getElementById("predatorCount");
  let grassPlanterCountElement = document.getElementById("grassPlanterCount");
  let grassEaterPlanterCountElement = document.getElementById(
    "grassEaterPlanterCount"
  );
  let bombCountElement = document.getElementById("bombCount");

  let grassColor = "#008013";
  let grassEaterColor = "#FAF61B";
  let predatorColor = "#8834B3";
  let grassPlanterColor = "#19543E";
  let grassEatPlanterColor = "#D6A100";
  let bombColor = "#000000";
  let fillColor = "#CBC8CC";

  var tooltiptext = document.getElementById("tooltiptext");
  var tooltiptext1 = document.getElementById("tooltiptext1");

  window.onmousemove = function (e) {
    var x = e.clientX,
      y = e.clientY;
    tooltiptext.style.top = y + 20 + "px";
    tooltiptext.style.left = x + 20 + "px";
    tooltiptext1.style.top = y + 20 + "px";
    tooltiptext1.style.left = x + 20 + "px";
  };

  document.getElementById("darkMode").addEventListener("click", myFunction);
  function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }

  let bombButton = document.getElementById("bombButton");
  bombButton.addEventListener("click", function () {
    socket.emit("clicked");
  });

  let seasonButton = document.getElementById("seasonButton");
  seasonButton.addEventListener("click", function () {
    socket.emit("season changed");
  });

  let clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click",() => {
    socket.emit("clear canvas");
  });

  socket.on("current season", function (season) {
    if (season == 1) {
      document.getElementById("whatSeason").innerText = "Տարվա եղանակ` ամառ";
      grassColor = "#008013";
      fillColor = "#CBC8CC";
      grassPlanterColor = "#19543E";
      document.getElementById("child1").style.backgroundColor = grassColor;
      document.getElementById("child4").style.backgroundColor =
        grassPlanterColor;
    } else if (season == 2) {
      document.getElementById("whatSeason").innerText = "Տարվա եղանակ` աշուն";
      grassColor = "#A8A859";
      fillColor = "#CBC8CC";
      grassPlanterColor = "#5C5C31";

      document.getElementById("child1").style.backgroundColor = grassColor;
      document.getElementById("child4").style.backgroundColor =
        grassPlanterColor;
    } else if (season == 3) {
      document.getElementById("whatSeason").innerText = "Տարվա եղանակ` ձմեռ";
      grassColor = "#AFC9C6";
      fillColor = "#FFFFED";
      grassPlanterColor = "#56706D";
      document.getElementById("child1").style.backgroundColor = grassColor;
      document.getElementById("child4").style.backgroundColor =
        grassPlanterColor;
    } else {
      document.getElementById("whatSeason").innerText = "Տարվա եղանակ` գարուն";
      grassColor = "#00BD45";
      grassPlanterColor = "#057840";
      fillColor = "#CBC8CC";
      document.getElementById("child1").style.backgroundColor = grassColor;
      document.getElementById("child4").style.backgroundColor =
        grassPlanterColor;
    }
  });

  socket.on("data", drawCreatures);

  function drawCreatures(data) {
    matrix = data.matrix;

    grassCountElement.innerText = "Խոտերի քանակն է` " + data.grassCounter;
    grassEaterCountElement.innerText =
      "Խոտակերների քանակն է` " + data.grassEaterCounter;
    predatorCountElement.innerText =
      "Գիշատիչների քանակն է` " + data.predatorCounter;
    grassPlanterCountElement.innerText =
      "Խոտ աճեցնողների քանակն է` " + data.grassPlanterCounter;
    grassEaterPlanterCountElement.innerText =
      "Խոտակեր աճեցնողների քանակն է` " + data.grassEaterPlanterCounter;
    bombCountElement.innerText = "Ռումբերի քանակն է` " + data.bombCounter;

    createCanvas(matrix[0].length * side, matrix.length * side);
    background("#acacac");

    for (let m = 0; m < matrix.length; m++) {
      for (let n = 0; n < matrix[m].length; n++) {
        if (matrix[m][n] == 1) {
          fill(grassColor);
        } else if (matrix[m][n] == 2) {
          fill(grassEaterColor);
        } else if (matrix[m][n] == 3) {
          fill(predatorColor);
        } else if (matrix[m][n] == 4) {
          fill(grassPlanterColor);
        } else if (matrix[m][n] == 5) {
          fill(grassEatPlanterColor);
        } else if (matrix[m][n] == 6) {
          fill(bombColor);
        } else {
          fill(fillColor);
        }
        rect(n * side, m * side, side, side);
      }
    }
  }
}
