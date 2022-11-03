
let currentCodeArray = ["", "", "", ""];

let colorArray = ["rgb(53, 80, 112)", "rgb(109, 89, 122)", "rgb(181, 101, 118)", "rgb(229, 107, 111)", "rgb(232, 140, 125)", "rgb(234, 172, 139)"];
let colorArray1 = ["rgb(255, 113, 113)", "rgb(202, 255, 128)", "rgb(255, 188, 99)", "rgb(152, 222, 255)", "rgb(255, 217, 65)", "rgb(253, 147, 255)"];


let currentArray = colorArray;

let rowCount = 7;

setColoring();

document.querySelector("#reload_button").addEventListener("click", handleReloadButton);

function handleReloadButton() {
    if(currentArray == colorArray){
        currentArray = colorArray1;
    }else{
        currentArray = colorArray
    }
    setColoring();
}

function setColoring() {
    let i = 0;
    let random;
    let lengthArray = colorArray.length;

    document.querySelectorAll(".default_color_field > .fas.fa-circle").forEach( item => {
        if(lengthArray > 0){

            random = currentArray[i];
        }
        item.style.color = random;
        i = i + 1;
        lengthArray = lengthArray - 1;
    })

    lengthArray = colorArray.length;
    i= 0;

    randomSecretColors();
}

function randomSecretColors(){
    let randomColors = currentArray.sort(() => Math.random() - .5).slice(0, 4);
  
    currentCodeArray = randomColors;
    console.log(currentCodeArray)
}

let i = 0;

document.querySelectorAll(".default_color_field").forEach(color_field => {
    color_field.addEventListener("click", handleColorClick);
})

let colorRows = [];

let rows = [];

function handleColorClick(event) {
   
    let target = event.target.style.color;

    console.log("co" + rowCount );
    console.log( document.querySelector(  ".guessContainer:nth-child(" + rowCount + ") .color_field:nth-child(" + (i+1) + ") > *" ) );

    document.querySelector(".guessContainer:nth-child(" + rowCount + ") .color_field:nth-child(" + (i+1) + ") > *").style.color = target;

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