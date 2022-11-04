let choosenGamemode = "Co-op";



document.querySelectorAll(".category").forEach(item => {
    item.addEventListener("click", handleClickCategory);
})



document.querySelector("#submitButton").addEventListener("click", confirmClicked);

let currentCategory = "Co-op";



function confirmClicked(){
    //abfragen was geklicked wurde
    
}

function handleClickCategory(e) {
    let target_ = e.target;

    console.log(target_)

    if(target_.nodeName === "DIV") { 
        target_ = target_.children[0].innerText;
    }

    if(target_.nodeName === "SPAN") { 
       target_ = target_.innerText;
    }

    if(target_ === "Co-op") {
       choosenGamemode = "Co-op";
    }
    
    if(target_ === "Versus"){
        choosenGamemode = "Versus";
    }

    currentCategory = target_;

    markCurrentCategory();
}


function markCurrentCategory() {
    document.querySelectorAll(".category").forEach( categ => {
        //console.log(categ.children[0].innerText)
        categ.classList.remove("current");

        if(categ.children[0].innerText === currentCategory) {
            categ.classList.add("current");
        }
    })
}