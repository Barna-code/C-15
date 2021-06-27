var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var invisibleGround;
var cloudImg;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var obstacleGroup,cloudGroup
var PLAY=1
var END = 0
var gameState=PLAY
var score=0


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png")
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");

cloudImg=loadImage("cloud.png");


}

function setup() {
createCanvas(600, 200);

//create a trex sprite
trex = createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);
trex.scale = 0.5;
  
//create a ground sprite
ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
ground.velocityX = -4;


invisibleGround=createSprite(200,190,400,10)
invisibleGround.visible=false

obstacleGroup=new Group()
cloudGroup=new Group()
  
}

function draw() {
background(180);
text("score:" + score,500,50);


if (gameState===PLAY){
  score = score + Math.round( getFrameRate()/60)

  if (keyDown("space")&& trex.y >=100) {
    trex.velocityY = -10;
  }
  trex.velocityY = trex.velocityY + 0.8

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  spawnClounds()

  spawnObstacle()

  if(obstacleGroup.isTouching(trex)){
    gameState= END ; 
  }
}
else if (gameState===END){
  ground.velocityX=0
  obstacleGroup.setvelocityXEach(0)
  }
console.log(frameCount)
  
trex.collide(invisibleGround);
drawSprites();
}

function spawnClounds(){
  if(frameCount % 60 === 0){
var cloud = createSprite(600,Math.round(random(10,60)),40,10)
cloud.velocityX= -3
cloud.addImage(cloudImg)
cloud.scale=0.1;

console.log(trex.depth)
console.log(cloud.depth)
trex.depth=cloud.depth
trex.depth=trex.depth+1

cloud.lifetime=200

cloudGroup.add(cloud)
}

}


function spawnObstacle () {
if(frameCount %60===0){
  var obstacle = createSprite(600,165,10,10);
  obstacle.velocityX=-6
  obstacle.scale=0.1

   obstacle.lifetime=200

  var rand=Math.round(random(1,6))
  switch(rand){
    case 1 : obstacle.addImage(obstacle1)
    break;

   case 2 : obstacle.addImage(obstacle2)
   break;
   
   case 3 : obstacle.addImage(obstacle3)
    break;
   
   case 4 : obstacle.addImage(obstacle4)
   break;
   case 5 : obstacle.addImage(obstacle5)
   break;
    case 6 : obstacle.addImage(obstacle6)
    break;
    default: break;

    obstacleGroup.add(obstacle)
  }
}
}





//console.log(trex.y)
//var rand=Math.round(random(1,100))
//console.log(rand)
//jump when the space button is pressed







//%--modulus operator
// 60,120,180,240---are divisible by 60? yes
//233,455,784--NO
//60560=0---remiander=0
//120%60=0--remiander=0
//depth
//memory leak 
//.lifetime
