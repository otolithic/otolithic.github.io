//define the canvas and attach it
var canvas = document.createElement("canvas")
document.body.appendChild(canvas)
document_width=document.body.getBoundingClientRect().width 
document_height=document.body.getBoundingClientRect().height
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
    eye_width = canvas.height/5
    eye_height = canvas.height/5
    x_multipliers = [0,2.5,0.8,2,3.5]
    y_multipliers = [0,2,0.75,3,3]
    drawOverlay(x_multipliers,y_multipliers)
})

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

function drawOverlay(x_multipliers, y_multipliers){
    //drawEye(eye, angle, x_middle, y_middle)
    for (idx = 0; idx < x_multipliers.length; idx++)
    drawEye(eye, 0, eye_width*x_multipliers[idx],eye_height*y_multipliers[idx], eye_width, eye_height)
}