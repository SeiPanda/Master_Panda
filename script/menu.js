let colorArray = ["rgb(53, 80, 112)", "rgb(109, 89, 122)", "rgb(181, 101, 118)", "rgb(229, 107, 111)", "rgb(232, 140, 125)", "rgb(234, 172, 139)"];
let colorArray1 = ["rgb(18, 118, 121)", "rgb(181, 147, 146)", "rgb(53, 80, 112)", "rgb(232, 140, 125)", "rgb(69, 53, 71)", "rgb(234, 172, 139)"];
let currentColorPalette = colorArray1;
let colorCode = [];

let categorys = document.querySelectorAll(".category");

categorys.forEach(item => {
    item.addEventListener("click", handleClickCategory);
})

let submitButton1 = document.querySelector("#submitButton1");
let is_submit_button = true;

submitButton1.addEventListener("click", onclick);

function onclick() {
    if(is_submit_button){
        confirmClicked();
    }else{
        cancleClicked();
    }
    is_submit_button = !is_submit_button;
}

let inner_container1 = document.querySelector("#inner-container1");
let container_inner_category2 = document.querySelector("#container-inner-category2");
let currentGamemode = "Co-op";

function confirmClicked() {
    categorys.forEach(cate => {
        if(!(cate.classList.contains("current"))){
            cate.classList.add("notChoosenByConfirmed");
        }
    })

    inner_container1.style.gridTemplateColumns = "1fr";
    submitButton1.innerHTML = '<i class="fas fa-times"></i>';

    if(currentGamemode === "Co-op"){
        localStorage.setItem("defaultColorPalette", JSON.stringify(currentColorPalette));
        sessionStorage.setItem("gameMode", JSON.stringify(currentGamemode));
        window.location="main.html";
    }

    if(currentGamemode === "Versus"){
        setColoring();
        container_inner_category2.classList.add("open");
    }
}

function cancleClicked() {
    categorys.forEach(cate => {
        cate.classList.remove("notChoosenByConfirmed"); 
    })

    inner_container1.style.gridTemplateColumns = "1fr 1fr";
    submitButton1.innerHTML = '<i class="fas fa-check"></i>';
    container_inner_category2.classList.remove("open");
}

let colorRows = ["", "", "", ""];

document.querySelector("#submitButton2").addEventListener("click", onConfirmClick);

//click on submit button -> save data in storage
function onConfirmClick() {
    //Farbcode von icon_category2 speichern in session
    if(colorRows.includes("")){
        return;
    }
    colorCode = colorRows;
    localStorage.setItem("defaultColorPalette", JSON.stringify(currentColorPalette));
    sessionStorage.setItem("versusColorCode", JSON.stringify(colorCode));
    sessionStorage.setItem("gameMode", JSON.stringify(currentGamemode));
    window.location="main.html";
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

// click on button in option row -> color printed on free place in code container
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

//click on current color button -> disable click button -> enable color in option row
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

function handleClickCategory(e) {
    let target_ = e.target;

    if(target_.nodeName === "DIV") { 
        target_ = target_.children[0].innerText;
    }

    if(target_.nodeName === "SPAN") { 
       target_ = target_.innerText;
    }

    if(target_ === "Co-op") {
       currentGamemode = "Co-op";
    }
    
    if(target_ === "Versus"){
        currentGamemode = "Versus";
    }
    markCurrentCategory();
}

function markCurrentCategory() {
    categorys.forEach( categ => {
        categ.classList.remove("current");
        if(categ.children[0].innerText === currentGamemode) {
            categ.classList.add("current");
        }
    })
}

//current click button -> color option row
function disableDefaultColorButton(currentClickedButtonID) {

    let defaultDisableButton = document.getElementById(currentClickedButtonID);
   
    defaultDisableButton.children[0].classList.add("disabled");
    defaultDisableButton.removeEventListener("click", handleColorClick);
}

//click on chossen button in code container -> enable color in option row
function enableDefaultColorButton(currentColor) {
    colorOptions.forEach(x => {
        if(x.style.color === currentColor){
            x.classList.remove("disabled");
            x.addEventListener("click", handleColorClick);
        }
     })
}