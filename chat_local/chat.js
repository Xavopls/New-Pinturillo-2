
function sendMessage(){

    var element1 = document.getElementById("left_box");
    var clon = element1.cloneNode(true);
    var label_son = clon.get;
    console.log(label_son);
    var element =document.createElement("div");
    element.id = "left_box";
    element.className="test_class";
    element.innerHTML = input.value;
    console.log(input.value);
    document.querySelector("#chat").appendChild(clon)

    console.log("Nuevo mensaje de"+author_id+": "+msg);
}

var input = document.querySelector("input");
var button = document.querySelector("#send_msg");

button.addEventListener("click",sendMessage);


