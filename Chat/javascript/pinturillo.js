

var color='black';

var colors = document.querySelector("#colors");
colors.addEventListener("click", setColors);

function setColors(e) {
    if (e.target !== e.currentTarget) {
        color = e.target.id;
    }
    //e.stopPropagation();
}
