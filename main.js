
let currentCodeArray = ["#355070", "#6D597A", "#B56576", "#E56B6F"];

let colorArray = ["#355070", "#6D597A", "#B56576", "#E56B6F", "#E88C7D", "#EAAC8B"];
let colorArray1 = ["#0B1C1E", "#1C3947", "#2B4E61", "#71989B", "#E4960E", "#F2C269"];

let currentArray = colorArray;

giveRandomColor();

document.querySelector("#reload_button").addEventListener("click", handleReloadButton);

function handleReloadButton() {
    if(currentArray == colorArray){
        currentArray = colorArray1;
    }else{
        currentArray = colorArray
    }
    giveRandomColor();
}

function giveColor() {
    document.querySelector("#default_color_field_1 > .fas.fa-circle").style.color = "#355070"
    document.querySelector("#default_color_field_2 > .fas.fa-circle").style.color = "#6D597A"
    document.querySelector("#default_color_field_3 > .fas.fa-circle").style.color = "#B56576"
    document.querySelector("#default_color_field_4 > .fas.fa-circle").style.color = "#E56B6F"
    document.querySelector("#default_color_field_5 > .fas.fa-circle").style.color = "#E88C7D"
    document.querySelector("#default_color_field_6 > .fas.fa-circle").style.color = "#EAAC8B"
}

function giveRandomColor() {
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
}

let i = 0;

document.querySelectorAll(".default_color_field").forEach(color_field => {
    color_field.addEventListener("click", handleColorClick);
})

let colorRows = [];
document.querySelector()

function handleColorClick(event) {
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

let j;

function loadResults() {
    console.log("Resutl")
    for(j = 0; currentCodeArray.length > j; j++){
        console.log(currentCodeArray[j]);
        console.log(colorRows[j])
        if(currentCodeArray[j] === colorRows[j]){
            console.log("x")
        }
    }
}
