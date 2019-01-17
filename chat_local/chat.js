
function sendMessage(){
    var element =document.createElement("div");
    element.setAttribute("id", "right_box");
    element.className="container"
    element.innerHTML =input.value;
    document.querySelector("#chat").appendChild(element)

    console.log("Nuevo mensage de"+author_id+": "+msg);
}

var input = document.querySelector("input");
var button = document.querySelector("#send_msg");

button.addEventListener("click",sendMessage);


