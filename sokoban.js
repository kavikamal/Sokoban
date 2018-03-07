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
 ] ;

var cell;
var sokoban=document.getElementById("sokoban");
var player=document.getElementById("player");
var x;
var y;
var topPoint=0;
var leftPoint=0;
var totalBoxes=0;
var storedBoxCount=0;
var xLen=map.length;
var yLen=map[xLen-1].length;
var cellClass="emptyCell";

drawSokoban();

movePlayer = function (event) {
    //To prevent the scrolling of the page    
    if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }
    if (storedBoxCount<totalBoxes){
       currentCell=document.getElementById(""+x+y);
       switch (event.key){
            case "ArrowUp":
                    if (x>1 && x<xLen){ 
                        x1=x-1;
                        x2=x-2;
                        arrowUPDownFunc();
                        updateMapRow(map[x1],x1);
                        updateMapRow(map[x2],x2);
                    } 
                    break;
            case "ArrowDown":
                    if (x>0 && x<xLen-2) {
                        x1=x+1;
                        x2=x+2;
                        arrowUPDownFunc();
                        updateMapRow(map[x1],x1);
                        updateMapRow(map[x2],x2);
                    } 
                    break;
            case "ArrowRight":
                    if (y>0 && y<yLen-2){ 
                        y1=y+1;
                        y2=y+2;     
                        arrowRightLeftFunc();
                        updateMapRow(map[x],x);
                    } 
                    break;
            case "ArrowLeft":
                    if (y>1 && y<yLen){
                        y1=y-1;
                        y2=y-2;
                        arrowRightLeftFunc();
                        updateMapRow(map[x],x);
                    } 
                    break;                    
        }
        topPoint=(x)*50;
        leftPoint=(y)*50;  
        player.style.top = topPoint+"px";
        player.style.left = leftPoint+"px"; 
        if (storedBoxCount==totalBoxes){
           document.getElementById("msgDiv").textContent="You Won!! Play again??";
        } 
    }   
}

//This function updates the map array string element when up or down key is pressed
function arrowUPDownFunc(){
    if (map[x1][y]=="B"){
        if (map[x2][y]==" "){
            x=x1; 
            map[x1]=updateString(map[x1],y,' ');
            map[x2]=updateString(map[x2],y,'B');
        }   
        else if (map[x2][y]=="O"){
            x=x1; 
            map[x1]=updateString(map[x1],y,' ');
            map[x2]=updateString(map[x2],y,'X');
            storedBoxCount++;
        }
    }    
    else if (map[x1][y]=="X"){
        if (map[x2][y]==" ") {
            x=x1;
            map[x1]=updateString(map[x1],y,'O');
            map[x2]=updateString(map[x2],y,'B');
            storedBoxCount--;
        }
        else if (map[x2][y]=="O"){
            x=x1;
            map[x1]=updateString(map[x1],y,'O');
            map[x2]=updateString(map[x2],y,'X');
            //storedBoxCount--;
        }   
    }
    else if ((map[x1][y]==" ")||(map[x1][y]=="O")){
        x=x1; 
    }
}

//This function updates the map array string element when right or left key is pressed
function arrowRightLeftFunc(){
    if (map[x][y1]=="B"){
       if (map[x][y2]==" "){
            y=y1;
            map[x]=updateString(map[x],y1,' ');
            map[x]=updateString(map[x],y2,'B');
        }   
        else if (map[x][y2]=="O"){
            y=y1;
            map[x]=updateString(map[x],y1,' ');
            map[x]=updateString(map[x],y2,'X');
            storedBoxCount++;
            console.log("Incrementing storedBoxCount");
        }
    }    
    else if (map[x][y1]=="X"){
        currentCell.setAttribute("class",cellClass); 
        if (map[x][y2]==" ") {
            y=y1;
            map[x]=updateString(map[x],y1,'O');
            map[x]=updateString(map[x],y2,'B'); 
            storedBoxCount--;    
        } 
        else if (map[x][y2]=="O"){
            y=y1;
            map[x]=updateString(map[x],y1,'O');
            map[x]=updateString(map[x],y2,'X');
            //storedBoxCount--;
        }    
    }
    else if ((map[x][y1]==" ")||(map[x][y1]=="O")){
        y=y1; 
    }
}
//This function redraws the row in the sokoban grid
function updateMapRow(str,n){
   for (let j=0;j<str.length;j++){
        cell=document.getElementById(""+n+j);
        if (str[j]=='W'){
            cell.setAttribute("class","brickCell");
        } 
        else if (str[j]=='O'){
            cell.setAttribute("class","starCell");
        } 
        else if (str[j]=='B'){
                
            cell.setAttribute("class","boxCell");
        } 
        else if (str[j]=='X'){
            cell.setAttribute("class","storedCell");
        }  
        else{
            cell.setAttribute("class","emptyCell");
        }
    }    
}

//Replace a char at nth location in the string str with the replacedChar
function updateString(str,n,replacedChar){
   return  str.substring(0, n) + replacedChar + str.substring(n+1);   
}

//Draw the Sokoban grid
function drawSokoban(){
    var rowSokoban;
    var row;
    player.setAttribute("class","player");
    for (let i=0;i<map1.length;i++){
        rowSokoban=document.createElement("div");
        rowSokoban.setAttribute("class","row");
        row=map1[i];
        
        for (let j=0;j<row.length;j++){
            cell=document.createElement("div");
            cell.setAttribute("id",""+i+j);
            if (row[j]=='W'){
                cell.setAttribute("class","brickCell");
            } 
            else if (row[j]=='O'){
                totalBoxes+=1; 
                cell.setAttribute("class","starCell");
            } 
            else if (row[j]=='B'){
                   
                cell.setAttribute("class","boxCell");
            } 
            else if (row[j]=='S'){
                topPoint=(i)*50;
                leftPoint=(j)*50;
                x=i;
                y=j;
                cell.setAttribute("class","emptyCell");              
            }
            else if (row[j]=='X'){
                totalBoxes+=1; 
                storedBoxCount++;
                cell.setAttribute("class","storedCell");
            }  
            else{
                cell.setAttribute("class","emptyCell");
            }
            rowSokoban.appendChild(cell);
        }
    sokoban.appendChild(rowSokoban);
    }
    player.style.top = topPoint+"px";
    player.style.left = leftPoint+"px";
}

document.addEventListener("keydown",movePlayer);