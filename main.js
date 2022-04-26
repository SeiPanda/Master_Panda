
let colorArray = ["#355070", "#6D597A", "#B56576", "#E56B6F", "#E88C7D", "#EAAC8B"];
let colorArray1 = ["#0B1C1E", "#1C3947", "#2B4E61", "#71989B", "#E4960E", "#F2C269"]

giveRandomColor();

function giveColor() {
    document.querySelector("#default_color_field_1").style.background = "#355070"
    document.querySelector("#default_color_field_2").style.background = "#6D597A"
    document.querySelector("#default_color_field_3").style.background = "#B56576"
    document.querySelector("#default_color_field_4").style.background = "#E56B6F"
    document.querySelector("#default_color_field_5").style.background = "#E88C7D"
    document.querySelector("#default_color_field_6").style.background = "#EAAC8B"
}

function giveRandomColor() {
    let i = 0;
    let random;
    let lengthArray = colorArray.length;

   

    document.querySelectorAll(".default_color_field").forEach( item => {
        if(lengthArray > 0){

            random = colorArray[i];
        }
        item.style.background = random;
        i = i + 1;
        lengthArray = lengthArray - 1;
    })

}

