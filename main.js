
let currentCodeArray = ["", "", "", ""];

let colorArray = ["rgb(53, 80, 112)", "rgb(109, 89, 122)", "rgb(181, 101, 118)", "rgb(229, 107, 111)", "rgb(232, 140, 125)", "rgb(234, 172, 139)"];
let colorArray1 = ["rgb(18, 118, 121)", "rgb(181, 147, 146)", "rgb(53, 80, 112)", "rgb(232, 140, 125)", "rgb(69, 53, 71)", "rgb(234, 172, 139)"];

let rowCount = 7;

StartGame();



document.querySelector("#reload_button").addEventListener("click", handleReloadButton);

function handleReloadButton() {
    RestartGame();
}


function StartGame(){
    setColoring();
}

function RestartGame(){

    enableDefaultColorButtons();

    document.querySelectorAll(".colorRow > .color_field > .fas.fa-circle").forEach(item => {
        item.style.color = "rgba(255, 255, 255, 0.363)"; 
    });

    document.querySelectorAll(".result_field > .fas.fa-circle").forEach(item => {
        item.classList.remove("rightColor"); 
        item.classList.remove("rightColorPlace"); 
    });

    document.querySelectorAll(".guessCode_color_field > .fas.fa-circle").forEach( (item) => {
        item.style.color = "#242424";
    })

    randomSecretColors();

    rowCount = 7;

    document.querySelector(".mask").classList.add("hidden");
}

function setColoring() {
    document.querySelectorAll(".default_color_field > .fas.fa-circle").forEach( (item, index) => {
        item.style.color = colorArray1[index];
    })
    randomSecretColors();
}

function randomSecretColors(){
    let randomColors = colorArray1.sort(() => Math.random() - .5).slice(0, 4);
  
    currentCodeArray = randomColors;
}



document.querySelectorAll(".default_color_field").forEach(color_field => {
    color_field.addEventListener("click", handleColorClick);
})

let colorRows = [];

let rows = [];

let i = 0;

function handleColorClick(event) {
   
    let target = event.target.style.color;

    document.querySelector(".guessContainer:nth-child(" + rowCount + ") .color_field:nth-child(" + (i+1) + ") > *").style.color = target;

    let id = event.target.parentNode.id;

   
   console.log(id)

   disableDefaultColorButton(id);  

    if(colorRows.length > 2 && colorRows.length < 4){
        colorRows[i] = event.target.style.color;
        loadResults();      
        i = 0;

    }else{
        console.log(event.target.style.color);
        colorRows[i] = event.target.style.color;
        console.log(colorRows)
        i = i + 1;
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
    

   console.log(sortedArray);

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

   console.log(checkWin)

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
    document.querySelectorAll(".guessCode_color_field > .fas.fa-circle").forEach( (item, index) => {
        item.style.color = currentCodeArray[index];
    })

    document.querySelector(".mask").classList.remove("hidden");

}

function disableDefaultColorButton(currentClickedButtonID){
   
    document.getElementById(currentClickedButtonID).children[0].classList.add("disabled");
    
    document.getElementById(currentClickedButtonID).removeEventListener("click", handleColorClick);
}

function enableDefaultColorButtons(){
    document.querySelectorAll(".default_color_field > .fas.fa-circle").forEach(x => {
        x.classList.remove("disabled");
        x.addEventListener("click", handleColorClick);
    })
}