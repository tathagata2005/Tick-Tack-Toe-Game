let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-button");
let newButton = document.querySelector("#new-button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let chooseOButton = document.querySelector("#choose-o");
let chooseXButton = document.querySelector("#choose-x");
let chooseContainer = document.querySelector(".choose-symbol");

let playerSymbol = ""; 
let computerSymbol = ""; 
let turnO = true; 

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true; 
    enableBoxes(); 
    msgContainer.classList.add("hide");
    chooseContainer.classList.remove("hide");
    playerSymbol = ""; 
    computerSymbol = "";
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false; 
        box.innerText = ""; 
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`; 
    msgContainer.classList.remove("hide"); 
    disableBoxes(); 
};

const showDraw = () => {
    msg.innerText = `It's a draw!`; 
    msgContainer.classList.remove("hide"); 
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner", pos1Val);
                showWinner(pos1Val); 
                return true; 
            }
        }
    }
    return false; 
};

const checkDraw = () => {
    
    for (let box of boxes) {
        if (box.innerText === "") {
            return false; 
        }
    }
    return true; 
};

const handleMove = (box) => {
    console.log("The box was clicked");
    if (turnO) {
        box.innerText = playerSymbol; // Player's move
        turnO = false;
    } else {
        box.innerText = computerSymbol; // Opponent's move
        turnO = true;
    }
    box.disabled = true; 

   
    if (!checkWinner()) {
        if (checkDraw()) {
            console.log("It's a draw");
            showDraw();
        }
    }
};
const chooseSymbol = (symbol) => {
    playerSymbol = symbol;
    computerSymbol = symbol === "O" ? "X" : "O";
    chooseContainer.classList.add("hide"); 
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (playerSymbol !== "" && computerSymbol !== "") { 
            handleMove(box);
        }
    });
});

chooseOButton.addEventListener("click", () => chooseSymbol("O"));
chooseXButton.addEventListener("click", () => chooseSymbol("X"));

newButton.addEventListener("click", resetGame); 
resetButton.addEventListener("click", resetGame);
