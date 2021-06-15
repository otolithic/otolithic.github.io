//define the canvas and attach it
var canvas = document.createElement("canvas")
document.body.appendChild(canvas)
var document_width=document.body.getBoundingClientRect().width 
var document_height=document.body.getBoundingClientRect().height
canvas.height=Math.min(document_width, document_height)
canvas.width=canvas.height

//center the canvas on the page
var marginLeft = document.body.getBoundingClientRect().width/2 - canvas.width/2
canvas.style.marginLeft=`${marginLeft}px`

//set the context to 2D
var context = canvas.getContext("2d")

//create the image(s)
var eye = new Image()
eye.src = 'assets/empty_eye.png'

//don't do anything till image is loaded
var promise = new Promise(function(resolve, reject){
    //load the image(s)
    eye.addEventListener('load', function() {
    resolve()
    })  
})

/******************************************************\
            THIS IS WHERE IT ALL HAPPENS
\******************************************************/
promise.then(function(result){
    
    //context.clearRect()
    //window.requestAnimationFrame(drawIrises(eye_diam, x_multipliers,y_multipliers))
    draw()
})

function draw(){
    var eye_diam = canvas.height/5
    var x_multipliers = [0,0.8,2.5,2,3.5]
    var y_multipliers = [0,0.75,2,3,2.7]
    var angles=[0,15,0,-15,10]
    drawIrises(eye_diam, x_multipliers,y_multipliers)
    drawOverlay(eye_diam,angles,x_multipliers,y_multipliers)
}

// draws the irises of the eyes in white
function drawIrises(eye_diam, x_multipliers,y_multipliers){
    for (idx = 0; idx < x_multipliers.length; idx++) {
        var iris_radius = eye_diam/6
        var x_pos = eye_diam*x_multipliers[idx]+eye_diam/2
        var y_pos = eye_diam*y_multipliers[idx]+eye_diam/2
        context.beginPath()
        context.arc(x_pos, y_pos, eye_diam/6, 0, 2 * Math.PI, false)
        context.lineWidth = 3
        context.strokeStyle = "white"
        context.stroke()
        context.fillStyle = "white"
        context.fill()
    }

}

// puts the transparent eye cutouts on the canvas
function drawOverlay(eye_diam, angles, x_multipliers, y_multipliers){
    for (idx = 0; idx < x_multipliers.length; idx++) {
        var pos_x = eye_diam*x_multipliers[idx]
        var pos_y = eye_diam*y_multipliers[idx]
        drawEye(eye, angles[idx], pos_x,pos_y, eye_diam, eye_diam)
    }  
}

function drawEye(eye, angle, targetPointX,targetPointY,w,h)
{
    //puts the image at the given point
    image_x_center = targetPointX+w/2
    image_y_center = targetPointY+h/2

    context.translate(image_x_center, image_y_center)
    context.rotate(toRadians(angle))
    context.drawImage(eye,-w/2,-h/2, w, h)
    context.setTransform(1, 0, 0, 1, 0, 0)

}

function toRadians(angle){
    return angle*Math.PI/180
}