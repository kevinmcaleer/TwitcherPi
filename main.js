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
let is_drawing = false;

let current_label = "robin";
var selections = [];

// let label_array = ["sparrow","blackbird","robin","starling","wood pigeon","great tit","blue tit","crow"];
let label_array = ['none']
// image loader
const image = document.getElementById('source');
const rects = document.getElementById('rects');
const remove_button = document.getElementById("remove");

image.addEventListener('load', e => {
  context.drawImage(image, 0, 0, canvas.height, canvas.width);
});

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
document.getElementById("remove").addEventListener("click", remove_item);

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
    for (var item of selections) {
        str += "<option>" + item.label + "</option>";
    }
    document.getElementById("rects").innerHTML = str;
}

function draw_selection() {
    //  draw all the rectangles in the selection array and add text label
    update_options();
    for (let item in selections) {
        context.strokeRect(selections[item].x, selections[item].y, selections[item].w, selections[item].h);
        // rects.append(selections[item].label);
        console.log("draw selection" & selections[item].label & selections[item].x);
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
        // context.lineCap = "round";
        // context.lineJoin = "round"
        // context.stroke();
        context.fillStyle = draw_color;
        context.strokeStyle = draw_color;
        context.strokeRect(x, y,w-x,h-y);
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(w, h);
        context.stroke();
        context.closePath();
    }
    // event.preventDefault();
}

function stop(event){
    if ( is_drawing ) {
        // context.stroke();
        context.drawImage(image, 0, 0, canvas.height, canvas.width);
        is_drawing = false;
        console.log("stopped");
        // create a new label to draw
        x = context.startX ;
        y = context.startY ;
        w = event.pageX - canvas.offsetLeft - x;
        h = event.pageY - canvas.offsetTop - y;

        l = new Label(x, y, w, h);
        selections.push(l);
        context.strokeRect(x, y,w,h);
        draw_selection();
        update_options();
        // update_rects();
    }
    // event.preventDefault();
}

var sel = document.getElementById('labels');
for(var i = 0; i < label_array.length; i++) {
    var opt = document.createElement('option');
    opt.innerHTML = label_array[i];
    opt.value = label_array[i];
    sel.append(opt);
}

function remove_item(event){
    // get currently selected item

    var sel = document.getElementById('selections');
    var index = sel.selectedIndex;
    selections = selections.splice(index);
    update_options();
}

$.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:2222/labels',
    // data: '',
    success: function(label_data) {
    console.log('POSTING:' + pathId);
    labels.empty();
    $.each(label_data, function(i, device) {
        labels.append('<option>' + device + '</option>')
    });

    },
    error: function(){
    console.log('error occurred sending' + 'command');
    }
})