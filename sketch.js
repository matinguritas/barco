const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];

var boatanimation = [];
var brokenBoatAnimation = [];
var brokenBoatSpritedata, brokenBoatSpritesheet;
var boatspritedata, boatspritessheet;
var barcos;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatspritedata = loadJSON("assets/boat/broken_boat.json");
  boatspritessheet = loadImage("assets/boat/broken_boat.png");
  brokenBoatSpritedata = loadJSON("assets/boat/broken_boat.json");
  brokenBoatSpritesheet = loadImage("assets/boat/broken_boat.png");

  cannonExplosion = loadSound("./assets/cannon_explosion.mp3");
}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 100, 50, angle);
  barcos = new Barco(width, height -100, 200, 200, -100);
  
  var boatFrames = boatspritedata.frames;
  for (var i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position;
    var img = boatspritessheet.get(pos.x, pos.y, pos.w, pos.h);
    boatanimation.push(img);
  
}
var brokenBoatFrames = brokenBoatSpritedata.frames;
for (var i = 0; i < brokenBoatFrames.length; i++) {
  var pos = brokenBoatFrames[i].position;
  var img = brokenBoatSpritesheett.get(pos.x, pos.y, pos.w, pos.h);
  brokenBoatAnimation.push(img);
}
function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    for (var j = 0; j < barcos.length; j++) {
      if (balls[i] !== undefined && barcos[j] !== undefined) {
        var collision = Matter.SAT.collides(balls[i].body, barcos[j].body);
        if (collision.collided) {
          barcos[j].remove(j);

          Matter.World.remove(world, balls[i].body);
          balls.splice(i, 1);
          i--;
          
        }
      } 
    }
  }
}

  Engine.update(engine);
  ground.display();

 

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }
Matter.Body.setVelocity(barcos.body, { x: -0.9, y: 0 })
  
  

  cannon.display();
  tower.display();
  barcos.display();

  
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}



function showBoats() {
  if (boats.length > 0) {
    if (
      barcos.length < 4 &&
      barcos[barcos.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var barcos = new Barco(
        width,
        height - 100,
        170,
        170,
        position,
        boatanimation
      );
      barcos.push(boat);
    }
    for (var i = 0; i < boats.length; i++) {
      Matter.Body.setVelocity(barcos[i].body, {
        x: -0.9,
        y: 0
      });
    
      boats[i].display();
      boats[i].animate();
  }
  var collision = Matter.SAT.collides(tower.body, barcos[i].body);
  if (collision.collided && !barcos[i].isBroken) {
 
    isGameOver = true;
    gameOver();} 
}
 else {
  var boat = new Boat(width, height - 60, 170, 170, -60, boatanimation);
  
  }
}




//función para mostrar la bala
function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) { 
    balls[balls.length - 1].shoot();
  }
}
function gameOver() {
  swal(
    {
      title: `¡Fin del juego!`,
      confirmButtonText: "Jugar de nuevo"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
