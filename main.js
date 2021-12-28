class Label {
    constructor(x,y, height, width, label) {
    this.x = x;
    this.y = y;
    this.label = label;
    this.width = width;
    this.height = height;
    }
}

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 60;
canvas.height = 400;

var context = canvas.getContext("2d");

context.fillStyle = "white"
context.fillRect(0,0, canvas.width, canvas.height);

let draw_color = "rgba(0, 255, 0, 0.5)";
let draw_width = "2";
var is_drawing = false;

var current_label = "";
let selections = [];

// let label_array = ["sparrow","blackbird","robin","starling","wood pigeon","great tit","blue tit","crow"];
var label_array = ['none']

// cache links to tags in the page
const image = document.getElementById('source');
const rects = document.getElementById('rects');
const remove_button = document.getElementById("remove");
const labels = document.getElementById('labels');

image.addEventListener('load', e => {
  context.drawImage(image, 0, 0, canvas.height, canvas.width);
});

function update_current_label(){
    // rects = document.getElementById('rects');
    my_index = labels.selectedIndex;
    if (my_index == -1) {
        my_index = 1;
    }
    
    var cur_label = labels[my_index].value;
    return cur_label;

    // Update the current label with whatever is selected
    // var cur_label = rects[rects.selectedIndex].value;
}

// current_label = update_current_label();

function change_color(element){
    draw_color = element.style.background;
}

function change_width(element) {
    draw_width = element.style.stroke;
}

function draw_rectangle(event) {

}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);
// document.getElementById("remove").addEventListener("click", remove_item);

function start(event) {
    is_drawing = true;
    context.moveTo(event.pageX - canvas.offsetLeft, 
                   event.pageY - canvas.offsetTop);
    context.startX = event.pageX - canvas.offsetLeft;
    context.startY = event.pageY - canvas.offsetTop;
    // event.preventDefault();
}

function update_options(){
    var str = "";
    my_index = selections.selectedIndex;
    if (my_index == -1) {
        my_index = 1;
    }
    
    for (var item of selections) {
        str += "<option>" + item.label + "</option>";
    
    document.getElementById("rects").innerHTML = str;
}
}

function draw_selection(selections) {
    //  draw all the rectangles in the selection array and add text label
    update_options();
    for (let i in selections) {
        context.strokeRect(selections[i].x, selections[i].y, selections[i].w, selections[i].h);
        
    }
}

function draw(event){
    if ( is_drawing ) {
        context.drawImage(image, 0, 0, canvas.height, canvas.width);
        
        // draw all the rectangles
        draw_selection();
        
        // set the coordinates from the staring position and end point
        x = context.startX ;
        y = context.startY ;
        w = event.pageX - canvas.offsetLeft;
        h = event.pageY - canvas.offsetTop;
        
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.fillStyle = draw_color;
        context.strokeStyle = draw_color;
        context.strokeRect(x, y,w-x,h-y);
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(w, h);
        context.stroke();
        context.closePath();
    }
}

function stop(event){
    if ( is_drawing ) {
        context.drawImage(image, 0, 0, canvas.height, canvas.width);
        is_drawing = false;
        
        x = context.startX ;
        y = context.startY ;
        w = event.pageX - canvas.offsetLeft - x;
        h = event.pageY - canvas.offsetTop - y;

        // create a new label to draw
        l = new Label(x, y, w, h);

        // get currently selected label
        l.label = update_current_label();
        selections.push(l);
        context.strokeRect(x, y,w,h);
        draw_selection(selections);
        update_options();
    }
}

function remove_item(event){
    // get currently selected item

    var sel = document.getElementById('selections');
    var index = sel.selectedIndex;
    selections = selections.splice(index);
    update_options();
}

