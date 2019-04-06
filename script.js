var canvas;
var ctx;
var mouse;
var positionX, positionY;
var brush;
var brushActive;
var eraser ;
var eraserActive;
var size;
var resetButton;
var saveLink ;

function start(){

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    mouse = false ;
    brushActive = false ;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    brush = document.getElementById("brush");
    brush.addEventListener("click", brushClick, false);

    eraser = document.getElementById("erase");
    eraser.addEventListener("click", eraserClick, false);

    size = document.getElementById("myRange");
    size.addEventListener("change", sizeChange, false);

    resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", resetClick, false);

    saveLink = document.getElementById("saveLink");
    saveLink.addEventListener("click", saveClick, false);

    canvas.addEventListener("mousedown", brushDown, false);
    canvas.addEventListener("mousemove", brushMove, false);
    canvas.addEventListener("mouseup", brushUp, false);
}

function getCoordinates(canvas, e){
    var rect = canvas.getBoundingClientRect();
    var simpleObject = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };

    return simpleObject;
}

function saveClick() {
    var data = canvas.toDataURL();
    saveLink.href = data;
    saveLink.download = "myPainting.png";
}

function resetClick() {
    window.location.reload();
}

function sizeChange() {
    ctx.lineWidth = size.value ;
}

function brushUp() {
    mouse = false ;
    canvas.style.cursor = "default";
}
function brushMove(e){

    if((brushActive && mouse) || (eraserActive && mouse)){
        var coordinates = getCoordinates(canvas, e);
         positionX = coordinates.x;
         positionY = coordinates.y;
         canvas.style.cursor = "pointer";
         ctx.lineTo(positionX, positionY);
		 ctx.stroke();

    }
}
function brushDown(e) {

    if (brushActive || eraserActive){
         mouse = true ;
        var brushColor = document.getElementById("myColor");

        if (brushActive){
            ctx.strokeStyle = brushColor.value ;
        }
        else {
            ctx.strokeStyle = "white";
        }

         var coordinates = getCoordinates(canvas, e);
         positionX = coordinates.x;
         positionY = coordinates.y;

         canvas.style.cursor = "pointer";

         ctx.beginPath();
         ctx.moveTo(positionX, positionY);
         ctx.lineTo(positionX, positionY);
         ctx.stroke();
    }
}

function brushClick() {
    brushActive = true ;
    eraserActive = false ;
    brush.style.border = "2px solid red";
    eraser.style.border = "none";
}

function eraserClick() {
    eraserActive = true ;
    brushActive = false ;
    eraser.style.border = "2px solid red";
    brush.style.border = "none";
}

window.addEventListener("load", start, false);
