
let error_ = document.querySelector(".error");
try {
    if (error_.innerHTML !== "") {
        setTimeout(function(){
            error_.innerHTML = ""
        }, 3000)
    }   
    
} catch (error) {
    console.error(error)
}

