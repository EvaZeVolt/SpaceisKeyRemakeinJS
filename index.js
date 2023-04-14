const ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.height = 600;
ctx.canvas.width = 1300;

// Start the frame count at 1
let level = 1;
var floor = 1;
// Set the number of obstacles to match the current "level"

s_spawn = [0,160,1300,350,-20,500] // List of all floor spawns on level 1


function FloorUp() 
{


if(floor == 1)
{
  floor = 2 ;
  square.x = s_spawn[2]
  square.y = s_spawn[3]
}
else if (floor == 2)
{
  floor = 3;
  square.x = s_spawn[4];
  square.y = s_spawn[5]
}
else if (floor == 3)
{
  floor = 1;
  square.x = s_spawn[0];
  square.y = s_spawn[1];
}



}




// Create a collection to hold the generated x coordinates
const obXCoors = [];

const square = {

  height: 32,
  jumping: true,
  width: 32,
  x: 0,
  xVelocity: 0,
  y: 150,
  yVelocity: 0

};

// Create the obstacles for each frame
const nextFrame = () => {
  // increase the frame / "level" count
  level++;
  

}

const controller = {

  left: false,
  right: false,
  up: false,
  keyListener: function (event) {

    var key_state = (event.type == "keydown") ? true : false;

    switch (event.keyCode) {

      case 37:// left key
        controller.left = key_state;
        break;
      case 32:// up key
        controller.up = key_state;
        break;
      case 38:// up key
        controller.up = key_state;
        break;
      case 39:// right key
        controller.right = key_state;
        break;

    }

  }

};

const loop = function () {

  //#region Controller
  if (controller.up && square.jumping == false) {

    square.yVelocity -= 17;
    square.jumping = true;

  }



 

  if (floor == 1) {

    square.xVelocity += 0.5;

  }
  if (floor == 2) {

    square.xVelocity -= 0.5;

  }
  if (floor == 3) {

    square.xVelocity += 0.5;

  }
  //#endregion

  //#region Gravity and Friction
  square.yVelocity += .9;// gravity
  square.x += square.xVelocity;
  square.y += square.yVelocity;
  square.xVelocity *= 0.9;// friction
  square.yVelocity *= 0.9;// friction

  //#endregion
  
  //#region Collision
  if (square.x > 200 -20 && square.x< 200 +70 && square.y > 160 -10 && floor == 1  )
  {
    square.x = 0;
  }


  if (square.x > 1300 && floor == 1) {// if square goes past right boundary
    square.y = 400;
    square.x = 1300;
    floor = 2;
  }
  if (square.x < -10 && floor == 2) 
  {
    square.y = 530
    square.x = -20;
    floor = 3;

  }



//#region Falling Stopper
  // if square is falling below floor line
  if (square.y > 160 && floor == 1) {

    square.jumping = false;
    square.y = 160;
    square.yVelocity = 0;

  }
  if (square.y > 350 && floor == 2) {

    square.jumping = false;
    square.y = 350 ;
    square.yVelocity = 0;

  }
  if (square.y > 541 && floor == 3) {

    square.jumping = false;
    square.y = 541;
    square.yVelocity = 0;

  }
  //#endregion

  

  //#endregion
  // Creates the backdrop for each frame
  //#region DrawMap
  ctx.fillStyle = "#201A23";
  ctx.fillRect(0, 0, 1300, 600); // x, y, width, height


  // Creates and fills the cube for each frame
  ctx.fillStyle = "#8DAA9D"; // hex for cube color
  ctx.beginPath();
  ctx.rect(square.x, square.y, square.width, square.height);

  ctx.fill();
 

  // Floor1
  ctx.strokeStyle = "#2E2532";
  ctx.lineWidth = 30;
  ctx.beginPath();
  ctx.moveTo(0, 205);
  ctx.lineTo(1300, 205);
  ctx.stroke();
  ctx.fillRect(200,160,70,30);
  

  //Floor 2
  ctx.strokeStyle = "#2E2532";
  ctx.lineWidth = 30;
  ctx.beginPath();
  ctx.moveTo(0, 400);
  ctx.lineTo(1300, 400);
  ctx.stroke();
  //Floor 3
  ctx.strokeStyle = "#2E2532";
  ctx.lineWidth = 30;
  ctx.beginPath();
  ctx.moveTo(0, 590);
  ctx.lineTo(1300, 590);
  ctx.stroke();
  //#endregion

  ctx.font = "30px Arial";
  ctx.fillText(floor, 1000, 50);
  ctx.fillText(Math.ceil(square.x), 1040, 50);
  ctx.fillText(square.y, 1100, 50);

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);