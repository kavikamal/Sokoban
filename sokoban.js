var map1 = [
    "  WWWWW ",
    "WWW   W ",
    "WOSB  W ",
    "WWW BOW ",
    "WOWWB W ",
    "W W O WW",
    "WB XBBOW",
    "W   O  W",
    "WWWWWWWW"
  ];

//   var map1 = [
//     "    WWWWW          ",
//     "    W   W          ",
//     "    WB  W          ",
//     "  WWW  BWW         ",
//     "  W  B B W         ",
//     "WWW W WW W   WWWWWW",
//     "W   W WW WWWWW  OOW",
//     "W B  B          OOW",
//     "WWWWW WWW WSWW  OOW",
//     "    W     WWWWWWWWW",
//     "    WWWWWWW        "
//  ]
var map=map1;  
var cell;
var sokoban=document.getElementById("sokoban");
var totalBoxes=1;
var player=document.getElementById("player");
var x;
var y;
var topPoint=0;
var leftPoint=0;
var storedBoxCount=0;
var xLen=map.length;
var yLen=map[xLen-1].length;

drawSokoban();

movePlayer = function (event) {
       var cellClass="emptyCell";
       if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
        }
       currentCell=document.getElementById(""+x+y);
       switch (event.key){
            case "ArrowUp":
                    if (x>1 && x<xLen){ 
                        x1=x-1;
                        x2=x-2;
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
                                storedBoxCount--;
                            }   
                        }
                        else if ((map[x1][y]==" ")||(map[x1][y]=="O")){
                            x=x1; 
                        }
                        updateRow(map[x],x);
                        updateRow(map[x1],x1);
                        updateRow(map[x2],x2);
                    } 
                    break;
            case "ArrowDown":
                    if (x>0 && x<xLen-2) {
                        x1=x+1;
                        x2=x+2;
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
                                storedBoxCount--;
                            }    
                        }
                        else if ((map[x1][y]==" ")||(map[x1][y]=="O")){
                            x=x1; 
                        }
                        updateRow(map[x],x);
                        updateRow(map[x1],x1);
                        updateRow(map[x2],x2);
                    } 
                    break;
            case "ArrowRight":
                    if (y>0 && y<yLen-2){ 
                        y1=y+1;
                        y2=y+2;     
                           
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
                            }
                        }    
                        else if (map[x][y1]=="X"){
                            
                            currentCell.setAttribute("class",cellClass); 
                            if (map[x][y2]==" ") {
                                y=y1;
                                map[x]=updateString(map[x],y1,'O');
                                map[x]=updateString(map[x],y2,'B');
                                
                            } 
                            else if (map[x][y2]=="O"){
                                y=y1;
                                map[x]=updateString(map[x],y1,'O');
                                map[x]=updateString(map[x],y2,'X');
                                storedBoxCount--;
                            }    
                        }
                        else if ((map[x][y1]==" ")||(map[x][y1]=="O")){
                            y=y1; 
                        }
                        updateRow(map[x],x);
                    } 
                    break;
            case "ArrowLeft":
                    if (y>1 && y<yLen){
                        y1=y-1;
                        y2=y-2;
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
                            }
                        }    
                        else if (map[x][y1]=="X"){
                            
                            currentCell.setAttribute("class",cellClass); 
                            if (map[x][y2]==" ") {
                                y=y1;
                                map[x]=updateString(map[x],y1,'O');
                                map[x]=updateString(map[x],y2,'B');
                                
                            } 
                            else if (map[x][y2]=="O"){
                                y=y1;
                                map[x]=updateString(map[x],y1,'O');
                                map[x]=updateString(map[x],y2,'X');
                                storedBoxCount--;
                            }    
                        }
                        else if ((map[x][y1]==" ")||(map[x][y1]=="O")){
                            y=y1; 
                        }
                        updateRow(map[x],x);
                    } 
                    break;                    
        }
        topPoint=(x+1)*50;
        leftPoint=(y+1)*50;  
        player.style.top = topPoint+"px";
        player.style.left = leftPoint+"px"; 
        if (storedBoxCount==totalBoxes){
           document.getElementById("msgDiv").textContent="You Won!! Play again??";
           //window.location.reload(true);
        } 
}

function updateRow(str,n){
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

function updateString(str,n,replacedChar){
   return  str.substring(0, n) + replacedChar + str.substring(n+1);   
}
function drawSokoban(){
    var rowSokoban;
    var row;
    player.setAttribute("class","player");
    for (let i=0;i<map.length;i++){
        rowSokoban=document.createElement("div");
        rowSokoban.setAttribute("class","row");
        row=map[i];
        
        for (let j=0;j<row.length;j++){
            cell=document.createElement("div");
            cell.setAttribute("id",""+i+j);
            if (row[j]=='W'){
                cell.setAttribute("class","brickCell");
            } 
            else if (row[j]=='O'){
                cell.setAttribute("class","starCell");
            } 
            else if (row[j]=='B'){
                totalBoxes+=1;    
                cell.setAttribute("class","boxCell");
            } 
            else if (row[j]=='S'){
                topPoint=(i+1)*50;
                leftPoint=(j+1)*50;
                x=i;
                y=j;
                map[i]=updateString(row,j," ");
                cell.setAttribute("class","emptyCell");              
            }
            else if (row[j]=='X'){
                cell.setAttribute("class","storedCell");
            }  
            else{
                cell.setAttribute("class","emptyCell");
                cell.textContent=row[j];
            }
            rowSokoban.appendChild(cell);
        }
    sokoban.appendChild(rowSokoban);
    }
    player.style.top = topPoint+"px";
    player.style.left = leftPoint+"px";
}
document.addEventListener("keydown",movePlayer);