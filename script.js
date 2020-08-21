var buttons = document.querySelectorAll("button");
var but = [...buttons];

var turn = 0;
var grid = [["","",""],
            ["","",""],
            ["","",""]];

var player = ['X','O'];

var fill = function(){
    let index=1;
    for(let row of grid)
    {console.log(row)
        for(let i of row)
        {
            buttons[index-1].innerHTML=i;
            index++;
        }
    }
};

var next = function(current){
    let currentPlayer = -1;
    if(turn%2==0){
        currentPlayer = 0;
    } else {
        currentPlayer = 1;
    }
    
    let pos = current.getAttribute("id") - 0;
    // console.log("pos",pos);
    // console.log("(pos-1)/3",Math.floor((pos-1)/3));
    // console.log("pos-1%3",(pos-1) % 3);
    grid[Math.floor((pos-1)/3)][(pos-1) % 3] = current.innerText = player[currentPlayer];
    if(x=checkWinner())
    {
        for(let b of buttons){
            b.setAttribute("onclick","err(1)")
        }
        document.querySelector("h2").innerText = `${x} is the winner!!!`;
        return ;
    }
    current.setAttribute("onclick","err()");
    turn++;
    if(turn%2 != 0)
    randomClick();
};

var err = function(num=0){
    if(!num)
    alert(`Hey, You can't press it again`);
    else{
    alert("No Moves, Winner already declared!!!");
    }
};

var checkWinner=function (){
    console.log(grid[0],"\n",grid[1],"\n",grid[2],"\n");
    for(let i=0;i<3;i++)
    {
        if(equal3(grid[i][0],grid[i][1],grid[i][2])) return grid[i][0];
        if(equal3(grid[0][i],grid[1][i],grid[2][i])) return grid[0][i];
    }

    if(equal3(grid[0][0],grid[1][1],grid[2][2])) return grid[1][1];
    if(equal3(grid[0][2],grid[1][1],grid[2][0])) return grid[1][1];

    return "";
};

var equal3 = function(a,b,c){
    return (a==b) && (b==c) && (c==a) && a!='';
}

var randomClick = function(){

    
    if(!but.some((b)=>(b.innerHTML == ""))) 
    {
        document.querySelector("h2").innerHTML = "Game is a Tie";
        return;
    }

    let num = Math.floor(Math.random()*9);

    while(buttons[num].innerHTML !== "")
    {
        num = Math.floor(Math.random()*9);
    }

    buttons[num].click();
}