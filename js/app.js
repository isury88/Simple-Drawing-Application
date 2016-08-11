//Problem: no user interaction causes no change to application
//Solution: when user interacts cause changes properly
var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;
//When clicking on control list items
$(".controls").on("click", "li", function() {
   //Deselect sibling elements
   $(this).siblings().removeClass("selected");
  //Select clicked element
  $(this).addClass("selected");
  //Cache current colour 
  color = $(this).css("background-color");
});
 

//When new colour is pressed 
$("#revealColorSelect").click(function() {
  //Show colour select or hide the colour select
  changeColor();
  $("#colorSelect").toggle();
});

//Update the "New colour" span
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g + ", " + b + ")");
}

//When colour sliders change
$("input[type=range]").change(changeColor);  

//When "Add colour" is pressed
$("#addNewColor").click(function() {
   //Append the color to the controls ul
   var $newColor = $("<li></li>");
   $newColor.css("background-color", $("#newColor").css("background-color"));
   $(".controls ul").append($newColor);
  //Select the new color
  $newColor.click();
});
 

//On Mouse events on the canvas 
$canvas.mousedown(function(e) {
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e) {
  //Draw lines
  if(mouseDown) {
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.stroke();
    lastEvent = e;
  }
}).mouseup(function() {
  mouseDown = false;
}).mouseleave(function() {
  $canvas.mouseup();
});
  



