class Label {
    constructor(x,y, width, height, label) {
    this.x = x;
    this.y = y;
    this.label = label;
    this.width = width;
    this.height = height;
    }
}

const canvas = document.getElementById("canvas");
const silklayer = document.getElementById("silk");
canvas.width = window.innerWidth - 60;
canvas.height = 400;
silklayer.width = window.innerWidth - 60;
silklayer.height = 400;
canvas.style.position = "absolute";
silklayer.style.position = "absolute";
canvas.style.zIndex = 0;
silklayer.style.zIndex = 1;

var context = canvas.getContext("2d");
var silk = silklayer.getContext("2d");

// context.fillStyle = "white";
// silk.fillStyle = "white";
// context.clearRect(0,0, canvas.width, canvas.height);
// silk.clearRect(0,0, canvas.width, canvas.height);

let draw_color = "rgba(0, 255, 0, 0.5)";
let font_color = "rgba(0, 0, 0)";
let draw_width = "2";
var is_drawing = false;

var current_label = "";
var selections = [];

// let label_array = ["sparrow","blackbird","robin","starling","wood pigeon","great tit","blue tit","crow"];
var label_array = ['none']

// cache links to tags in the page
const image = document.getElementById('source');
const rects = document.getElementById('rects');
const remove_button = document.getElementById("remove");
const labels = document.getElementById('labels');

image.addEventListener('load', e => {
    scaleToFit(image)
//   context.drawImage(image, 0, 0, canvas.height, canvas.width);
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

silklayer.addEventListener("touchstart", start, false);
silklayer.addEventListener("touchmove", refresh, false);
silklayer.addEventListener("mousedown", start, false);
silklayer.addEventListener("mousemove", refresh, false);

silklayer.addEventListener("touchend", stop, false);
silklayer.addEventListener("mouseup", stop, false);
silklayer.addEventListener("mouseout", stop, false);
// document.getElementById("remove").addEventListener("click", remove_item);

function start(event) {
    is_drawing = true;
    // silk.moveTo(event.pageX - canvas.offsetLeft, 
    //                event.pageY - canvas.offsetTop);
    silk.startX = event.pageX - silklayer.offsetLeft;
    silk.startY = event.pageY - silklayer.offsetTop;
    // event.preventDefault();
    console.log('started');
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
    // $select.querySelectorAll('rects')[my_index].selected = 'selected';
    // selections[my_index].selected = selected;
}
}

function draw_selection(selections) {
    //  draw all the rectangles in the selection array and add text label
    // update_options();
    
    silk.clearRect(0,0,silklayer.width, silklayer.height);
    for (let i in selections) {
        silk.fillStyle = draw_color;
        silk.strokeStyle = draw_color;
        // context.moveTo(selections[i].x, selections[i].y);
        silk.fillRect(selections[i].x, selections[i].y, selections[i].width, selections[i].height);
        silk.StrokeStyle = "rgba(0,255,0,1)";
        silk.fillStyle = "rgba(0,255,0,1)";
        silk.fillText(selections[i].label, selections[i].x,selections[i].y);   
        
    }
 
}

function draw(event){
    // silk.clearRect(0,0,canvas.width, canvas.height);
    // scaleToFit(image);
    if ( is_drawing ) {
          
        // context.drawImage(image, 0, 0, canvas.height, canvas.width);
        
        // draw all the rectangles
   
        
        silk.clearRect(x,y,silklayer.width, silklayer.height);
        draw_selection(selections);
        
        // set the coordinates from the staring position and end point
        x = silk.startX ;
        y = silk.startY ;
        
        w = event.pageX - silklayer.offsetLeft;
        h = event.pageY - silklayer.offsetTop;
        console.log("w:"+w);
        console.log("h:"+h);
        silk.strokeStyle =  "rgba(0, 255, 0, 1)";
        silk.lineWidth = draw_width;
        silk.fillStyle = draw_color;
        // silk.strokeStyle = draw_color;
        // silk.fillStyle = "rgba(0, 255, 0, 1)";
        silk.strokeRect(x, y,w-x,h-y);
        silk.beginPath();
        silk.moveTo(x, y);
        silk.lineTo(w, h);
        silk.stroke();
        silk.closePath();   
        silk.fillStyle =draw_color;
        silk.strokeStyle = draw_color;
        silk.fillRect(x,y,w-x,h-y);
        silk.fillStyle = "rgba(0, 255, 0, 1)";
        silk.fillText(update_current_label(), x,y-2);
        
    }
    else {
        refresh(event);
        // silk.fillStyle = "rgba(255, 0, 0, 1";
        // silk.fillRect(0,0,400,40);
        draw_selection(selections);
    }
}

function scaleToFit(img){
    // get the scale
    var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;
    context.drawImage(img, x, y, img.width * scale, img.height * scale);
}

function refresh(event){
    if (is_drawing) {
        scaleToFit(image);  
        draw(event);
    }
    else {

    // context.drawImage(image, 0, 0, canvas.height, canvas.width);
    scaleToFit(image);    
    
    // draw all the rectangles
    
    silk.font = "10px Arial";
    x = event.pageX - silklayer.offsetLeft;
    y = event.pageY - silklayer.offsetTop;
    
    // wipe the canvas clean
    // silk.clearRect(0,0,canvas.width, canvas.height);

    silk.clearRect(0,0,silklayer.width, silklayer.height);
    silk.fillStyle = "rgba(255, 255, 255, 1)";

    silk.fillRect(0,0,100,40);
    silk.fillStyle = font_color;
    silk.fillText("X = " + x, 0, 10);
    silk.fillText("Y = " + y, 0, 20);
    silk.fillText("Not Drawing", 0, 40);

    draw_selection(selections);
    // context.fillText("canvas.offsetLeft = " + canvas.offsetLeft, 0, 30);
}
}

function stop(event){
    if ( is_drawing ) {
        // scaleToFit(image);
        // context.drawImage(image, 0, 0, canvas.height, canvas.width);
        is_drawing = false;
        
        x = silk.startX ;
        y = silk.startY ;
        w = event.pageX - silklayer.offsetLeft - x;
        h = event.pageY - silklayer.offsetTop - y;

        // create a new label to draw
        l = new Label(x, y, w, h);

        // get currently selected label
        l.label = update_current_label();
        selections.push(l);
        silk.strokeRect(x, y,w,h);
        draw_selection(selections);
        update_options();
        console.log('stopped');
    }
    
}

function remove_item(event){
    // get currently selected item

    var sel = document.getElementById('selections');
    var index = sel.selectedIndex;
    selections = selections.splice(index);
    update_options();
}

