
let currentCodeArray = ["", "", "", ""];
let currentColorPalette = [];
let rowCount = 7;
let colorRows = [];
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
    if(gameMode === "Versus"){
        document.querySelector("#reload_button").style.display = "none";
        document.querySelector("#placeholder").style.display = "none";
    } 
}


function handleReloadButton() {
    RestartGame();
}

function StartGame(){
    setColoring();
}

let guessCode_fa_circle =  document.querySelectorAll(".guessCode_color_field > .fas.fa-circle");
let result_field_fa_circle =  document.querySelectorAll(".result_field > .fas.fa-circle");
let color_row_fa_circle = document.querySelectorAll(".colorRow > .color_field > .fas.fa-circle");
let mask = document.querySelector(".mask");

function RestartGame(){
    currentField = 0;
    colorRows = [];
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

function setColoring() {
    default_color_field_fa_circle.forEach( (item, index) => {
        item.style.color = currentColorPalette[index];
    })
    if(gameMode === "Co-op"){
        randomSecretColors(); 
    }else{
        currentCodeArray = JSON.parse(sessionStorage.getItem("versusColorCode"));
    }
  
}

function randomSecretColors(){
    let randomColors = currentColorPalette.sort(() => Math.random() - .5).slice(0, 4);
    currentCodeArray = randomColors;
    console.log(currentCodeArray)
}

function handleColorClick(event) {
   
    let target = event.target.style.color;

    document.querySelector(".guessContainer:nth-child(" + rowCount + ") .color_field:nth-child(" + (currentField+1) + ") > *").style.color = target;

    let id = event.target.parentNode.id;
   disableDefaultColorButton(id);  

    if(colorRows.length > 2 && colorRows.length < 4){
        colorRows[currentField] = event.target.style.color;
        loadResults();      
        currentField = 0;

    }else{
        colorRows[currentField] = event.target.style.color;
        currentField = currentField + 1;
    }
}

function loadResults() {
    let j;
    let t = 0;
    let resultArray = [];

    for(j = 0; j < currentCodeArray.length; j++){
      if(colorRows.includes(currentCodeArray[j])){
        if(currentCodeArray[j] === colorRows[j]){
            //wenn farbe enthalten und richtige stelle, 
            resultArray.push(2);
        }else{
            //wenn richtige farbe aber falsche stelle
            resultArray.push(1);
        }
      }else{
        //nicht richtige farbe und nicht richtige stelle
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
    colorRows = [];
    rowCount = rowCount - 1;
}

function handleWin(sortedArray){
    if(sortedArray.includes(1) || sortedArray.includes(0)){
        return false;
    }else{
        return true;
    }
}

function showSecretCode(){
    guessCode_fa_circle.forEach( (item, index) => {
        item.style.color = currentCodeArray[index];
    })

   mask.classList.remove("hidden");
}

function disableDefaultColorButton(currentClickedButtonID){

    let defaultDisableButton = document.getElementById(currentClickedButtonID);
   
    defaultDisableButton.children[0].classList.add("disabled");
    defaultDisableButton.removeEventListener("click", handleColorClick);
}

function enableDefaultColorButtons(){
   default_color_field_fa_circle.forEach(x => {
        x.classList.remove("disabled");
        x.addEventListener("click", handleColorClick);
    })
}