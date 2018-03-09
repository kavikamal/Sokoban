// const map1 = [
//     "  WWWWW ",
//     "WWW   W ",
//     "WOSB  W ",
//     "WWW BOW ",
//     "WOWWB W ",
//     "W W O WW",
//     "WB XBBOW",
//     "W   O  W",
//     "WWWWWWWW"
//   ];

// var map=[
//     "  WWWWW ",
//     "WWW   W ",
//     "WO B  W ",
//     "WWW BOW ",
//     "WOWWB W ",
//     "W W O WW",
//     "WB XBBOW",
//     "W   O  W",
//     "WWWWWWWW"
//   ]; 

const map1 = [
    "    WWWWW          ",
    "    W   W          ",
    "    WB  W          ",
    "  WWW  BWW         ",
    "  W  B B W         ",
    "WWW W WW W   WWWWWW",
    "W   W WW WWWWW  OOW",
    "W B  B          OOW",
    "WWWWW WWW WSWW  OOW",
    "    W     WWWWWWWWW",
    "    WWWWWWW        "
];
var map = [
    "    WWWWW          ",
    "    W   W          ",
    "    WB  W          ",
    "  WWW  BWW         ",
    "  W  B B W         ",
    "WWW W WW W   WWWWWW",
    "W   W WW WWWWW  OOW",
    "W B  B          OOW",
    "WWWWW WWW W WW  OOW",
    "    W     WWWWWWWWW",
    "    WWWWWWW        "
];

var cell;
var sokoban = document.getElementById("sokoban");
var player = document.getElementById("player");
var x;
var y;
var topPoint = 0;
var leftPoint = 0;
var totalBoxes = 0;
var storedBoxCount = 0;
var xLen = map.length;
var yLen = map[xLen - 1].length;
var cellClass = "emptyCell";

drawSokoban();

movePlayer = function (event) {
    //To prevent the scrolling of the page    
    if ([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }
    if (storedBoxCount < totalBoxes) {
        const { x1, x2, y1, y2 } = getCoordinates(x, y, event.key);
        arrowFunc({ x1, x2, y1, y2 });
        updateMapRow(map[x1], x1);
        updateMapRow(map[x2], x2);
        topPoint = (x) * 50;
        leftPoint = (y) * 50;
        player.style.top = topPoint + "px";
        player.style.left = leftPoint + "px";
        if (storedBoxCount == totalBoxes) {
            document.getElementById("msgDiv").textContent = "You Won!! Play again??";
        }
    }
}

function getCoordinates(x, y, keyVal) {
    var coordinates = {
        x1: x,
        x2: x,
        y1: y,
        y2: y
    }

    switch (keyVal) {
        case "ArrowUp":
            if (x > 1 && x < xLen) {
                coordinates.x1 = x - 1;
                coordinates.x2 = x - 2;
            }
            break;
        case "ArrowDown":
            if (x > 0 && x < xLen - 2) {
                coordinates.x1 = x + 1;
                coordinates.x2 = x + 2;
            }
            break;
        case "ArrowLeft":
            if (y > 1 && y < yLen) {
                coordinates.y1 = y - 1;
                coordinates.y2 = y - 2;
            }
            break;
        case "ArrowRight":
            if (y > 0 && y < yLen - 2) {
                coordinates.y1 = y + 1;
                coordinates.y2 = y + 2;
            }
            break;
    }
    return coordinates;
}

function arrowFunc({ x1, x2, y1, y2 }) {
    if (map[x1][y1] == "B") {
        if (map[x2][y2] == " ") {
            x = x1;
            y = y1;
            map[x1] = updateString(map[x1], y1, ' ');
            map[x2] = updateString(map[x2], y2, 'B');
        }
        else if (map[x2][y2] == "O") {
            x = x1;
            y = y1;
            map[x1] = updateString(map[x1], y1, ' ');
            map[x2] = updateString(map[x2], y2, 'X');
            storedBoxCount++;
        }
    }
    else if (map[x1][y1] == "X") {
        if (map[x2][y2] == " ") {
            x = x1;
            y = y1;
            map[x1] = updateString(map[x1], y1, 'O');
            map[x2] = updateString(map[x2], y2, 'B');
            storedBoxCount--;
        }
        else if (map[x2][y2] == "O") {
            x = x1;
            y = y1;
            map[x1] = updateString(map[x1], y1, 'O');
            map[x2] = updateString(map[x2], y2, 'X');
        }
    }
    else if ((map[x1][y1] == " ") || (map[x1][y1] == "O")) {
        x = x1;
        y = y1;
    }
}

//This function redraws the row in the sokoban grid
function updateMapRow(str, n, rowSokoban) {
    let created = false;
    for (let j = 0; j < str.length; j++) {
        cell = document.getElementById("" + n + j);
        if (!cell) {
            cell = document.createElement("div");
            cell.id = "" + n + j;
            rowSokoban.appendChild(cell);
            created = true;
        }
        if (str[j] == 'W') {
            cell.setAttribute("class", "brickCell");
        }
        else if (str[j] == 'O') {
            if (created) {
                totalBoxes++;
            }
            cell.setAttribute("class", "starCell");
        }
        else if (str[j] == 'B') {

            cell.setAttribute("class", "boxCell");
        }
        else if (str[j] == 'X') {
            if (created) {
                totalBoxes++;
            }
            cell.setAttribute("class", "storedCell");
        }
        else if (str[j] == 'S' && created) {
            topPoint = (n) * 50;
            leftPoint = (j) * 50;
            x = n;
            y = j;
            cell.setAttribute("class", "emptyCell");
        }
        else {
            cell.setAttribute("class", "emptyCell");
        }
    }
}

//Replace a char at nth location in the string str with the replacedChar
function updateString(str, n, replacedChar) {
    return str.substring(0, n) + replacedChar + str.substring(n + 1);
}

//Draw the Sokoban grid
function drawSokoban() {
    var rowSokoban;
    var row;
    player.setAttribute("class", "player");
    for (let i = 0; i < map1.length; i++) {
        rowSokoban = document.createElement("div");
        rowSokoban.setAttribute("class", "row");
        row = map1[i];
        updateMapRow(row, i, rowSokoban);
        sokoban.appendChild(rowSokoban);
    }
    player.style.top = topPoint + "px";
    player.style.left = leftPoint + "px";
}

document.addEventListener("keydown", movePlayer);