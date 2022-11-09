let currentCodeArray = ["", "", "", ""];
let currentColorPalette = [];
let rowCount = 7;
let colorRows = ["", "", "", ""];
let currentField = 0;
let gameMode;
let default_color_field_fa_circle = document.querySelectorAll(".default_color_field > .fas.fa-circle");
let default_color_field = document.querySelectorAll(".default_color_field");

document.querySelector("#heading-container").addEventListener("click", handleHeadingClick);

default_color_field.forEach(color_field => {
    color_field.addEventListener("click", handleColorClick);
})

document.querySelector("#reload_button").addEventListener("click", handleReloadButton);

GetData();

StartGame();

function handleHeadingClick(){
    window.location="menu.html";
}

function GetData(){
    currentColorPalette = JSON.parse(localStorage.getItem("defaultColorPalette"));
    gameMode = JSON.parse(sessionStorage.getItem("gameMode"));   
}

function handleReloadButton() {
    if(gameMode === "Versus"){
        RestartGameVersus();
    }else{
        RestartGameCoop();
    }
}

function StartGame() {
    setColors();
}

let guessCode_fa_circle =  document.querySelectorAll(".guessCode_color_field > .fas.fa-circle");
let result_field_fa_circle =  document.querySelectorAll(".result_field > .fas.fa-circle");
let color_row_fa_circle = document.querySelectorAll(".colorRow > .color_field > .fas.fa-circle");
let mask = document.querySelector(".mask");

//open Popup -> color code input field 
function RestartGameVersus(){
    window.location = "menu.html"
    //colorCodeGenerator();
}

function RestartGameCoop() {
    colorRows = ["", "", "", ""];
    rowCount = 7;
    enableDefaultColorButtons();

   color_row_fa_circle.forEach(item => {
        item.style.color = "rgba(255, 255, 255, 0.363)"; 
    });

   result_field_fa_circle.forEach(item => {
        item.classList.remove("rightColor"); 
        item.classList.remove("rightColorPlace"); 
    });

   guessCode_fa_circle.forEach( (item) => {
        item.style.color = "#242424";
    })

    randomSecretColors();
    mask.classList.add("hidden");
}

function setColors() {
    default_color_field_fa_circle.forEach( (item, index) => {
        item.style.color = currentColorPalette[index];
    })
    if(gameMode === "Co-op"){
        randomSecretColors(); 
    }else{
        currentCodeArray = JSON.parse(sessionStorage.getItem("versusColorCode"));
    }
  
}

function randomSecretColors() {
    let randomColors = currentColorPalette.sort(() => Math.random() - .5).slice(0, 4);
    currentCodeArray = randomColors;
}

/* Pop Up*/

function colorCodeGenerator(){
    //Farbcode PopUp

    document.querySelector("#pop-outer").style.display = "flex";
}

/*Pop Up Ende*/

// click on button in default row -> color printed on current row
function handleColorClick(event) {
   
    let currentSpot = 0;
    let targetColor = event.target.style.color;

    for(let i = 0; i < colorRows.length; i++){
        if(colorRows[i] === ""){
            colorRows[i] = targetColor;
            currentSpot = i;
            document.querySelector(".guessContainer:nth-child(" + rowCount + ") .color_field:nth-child(" + (currentSpot + 1) + ") > *").style.color = targetColor;
            let id = event.target.parentNode.id;
            disableDefaultColorButton(id);  
            break;
        }
    }

    if(!(colorRows.includes(""))){
        loadResults();      
    }
}

// give number for color and place, show resulsts in result container 
function loadResults() {
    let j;
    let t = 0;
    let resultArray = [];

    for(j = 0; j < currentCodeArray.length; j++){
      if(colorRows.includes(currentCodeArray[j])){
        if(currentCodeArray[j] === colorRows[j]){
            //right color on right place
            resultArray.push(2);
        }else{
            //right color on wrong place
            resultArray.push(1);
        }
      }else{
        //all wrong
        resultArray.push(0);
      }
    }

    const sortedArray = resultArray.reverse(resultArray.sort());

    for(t = 0; t < sortedArray.length; t++){
     
        let resultField = document.querySelector(".guessContainer:nth-child(" + rowCount + ") .result_field:nth-child(" + (t+1) + ") > *");
        
        if(sortedArray[t] === 2){
            resultField.classList.add("rightColorPlace")
        }

        if(sortedArray[t] === 1){
            resultField.classList.add("rightColor")
        }
    }

   let checkWin = handleWin(sortedArray);

    if(checkWin){
        showSecretCode();
        return;
    }else{
        if(rowCount == 1){
            showSecretCode();
            colorRows = [];
            rowCount = rowCount - 1;
            return;
        }
        enableDefaultColorButtons();
    }
    colorRows = ["", "", "", ""];
    rowCount = rowCount - 1;
    addRemoveColorEventListener();
}

function handleWin(sortedArray) {
    if(sortedArray.includes(1) || sortedArray.includes(0)){
        return false;
    }else{
        return true;
    }
}

//show color Code -> end of round
function showSecretCode() {
    guessCode_fa_circle.forEach( (item, index) => {
        item.style.color = currentCodeArray[index];
    })

   mask.classList.remove("hidden");
}

//current click button -> default row
function disableDefaultColorButton(currentClickedButtonID) {

    let defaultDisableButton = document.getElementById(currentClickedButtonID);
   
    defaultDisableButton.children[0].classList.add("disabled");
    defaultDisableButton.removeEventListener("click", handleColorClick);
}

//end of row
function enableDefaultColorButtons() {
   default_color_field_fa_circle.forEach(x => {
        x.classList.remove("disabled");
        x.addEventListener("click", handleColorClick);
    })
}

//click on chossen button in row -> enable color in default row
function enableDefaultColorButton(currentColor) {
    default_color_field_fa_circle.forEach(x => {
        if(x.style.color === currentColor){
            x.classList.remove("disabled");
            x.addEventListener("click", handleColorClick);
        }
     })
}


function addRemoveColorEventListener() {

    let currentColorCode = document.querySelectorAll(".guessContainer:nth-child(" + rowCount + ")");

    document.querySelectorAll(".guessContainer").forEach(row => {
        row.removeEventListener("click", removeColor);
    })

    currentColorCode.forEach(field => {
        field.addEventListener("click", removeColor);
    })
}

addRemoveColorEventListener();

//click on current row on button -> disable click button -> enable color in default row
function removeColor(event) {
    let targetColor = event.target.style.color;
    let currentField = document.getElementById(event.target.parentNode.id);
    let currentSpot = colorRows.indexOf(currentField.children[0].style.color);
 
    default_color_field.forEach( option => {
        if(option.children[0].classList.contains("disabled")){
            if(targetColor === option.children[0].style.color){
                option.children[0].classList.remove("disabled");
                currentField.children[0].style.color = "rgba(255, 255, 255, 0.363)";
                colorRows[currentSpot] = "";
                enableDefaultColorButton(targetColor);
                return;
            }
        }
    })
}