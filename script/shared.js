
/*let colorRows = ["", "", "", ""];
document.querySelector("#submitButton2").addEventListener("click", onConfirmClick);

function onConfirmClick() {
    //Farbcode von icon_category2 speichern in session
    if(colorRows.includes("")){
        return;
    }else{
        colorCode = colorRows;
        console.log(colorCode)
        sessionStorage.setItem("versusColorCode", JSON.stringify(colorCode));
        sessionStorage.setItem("gameMode", JSON.stringify(currentGamemode));
        document.querySelector("#pop-outer").style.display = "none";
    }

}



let colorOptions = document.querySelectorAll(".colorOptions");

function setColoring() {
    colorOptions.forEach( (option, index) => {
        option.style.color = currentColorPalette[index];
    })
}

colorOptions.forEach( option => {
    option.addEventListener("click", handleColorClick);
})

let currentColorCode = document.querySelectorAll(".versusField");

currentColorCode.forEach(field => {
    field.addEventListener("click", removeColor);
})

document.querySelectorAll(".versusField").forEach(item => {
    console.log(item.style.color)
})

function handleColorClick(event) {

    let currentSpot = 0;
    let targetColor = event.target.parentNode.style.color;

    for(let i = 0; i < colorRows.length; i++){
        if(colorRows[i] === ""){
            colorRows[i] = targetColor;
            currentSpot = i;
            document.querySelector("#icon_category2 > .versusField:nth-child(" + (currentSpot + 1) + ") > *").style.color = targetColor;
            let id = event.target.parentNode.id;
            disableDefaultColorButton(id);  
            break;
        }
    }
}

function removeColor(event) {
 
    let targetColor = event.target.style.color;
    let currentField = document.getElementById(event.target.parentNode.id);
    let currentSpot = colorRows.indexOf(currentField.children[0].style.color);
    
    colorOptions.forEach( option => {
        if(option.children[0].classList.contains("disabled")){
            if(targetColor === option.style.color){
                option.children[0].classList.remove("disabled");
                currentField.children[0].style.color = "rgb(175, 175, 175)";
                colorRows[currentSpot] = "";
                enableDefaultColorButton(targetColor);
                return;
            }
        }
    })
}

function disableDefaultColorButton(currentClickedButtonID) {

    let defaultDisableButton = document.getElementById(currentClickedButtonID);
   
    defaultDisableButton.children[0].classList.add("disabled");
    defaultDisableButton.removeEventListener("click", handleColorClick);
}

function enableDefaultColorButton(currentColor) {
    colorOptions.forEach(x => {
        console.log(currentColor)
        if(x.style.color === currentColor){
            x.classList.remove("disabled");
            x.addEventListener("click", handleColorClick);
        }
     })
}*/