var tower,towerImage;
var ghost,ghostImage;

var gameState="play";

var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var invisibleBlock,invisibleBlockGroup;

var spookySound;

function preload(){
towerImage=loadImage("tower.png");
ghostImage=loadImage("ghost-standing.png");

doorImg=loadImage("door.png");
climberImg=loadImage("climber.png");

spookySound=loadSound("spooky.wav");
}

function setup(){
createCanvas(600,600);

tower=createSprite(300,300,10,10);
tower.addImage(towerImage);
tower.velocityY=2;
tower.y=tower.height/2;

ghost=createSprite(300,300,10,10);
ghost.addImage(ghostImage);
ghost.scale=0.5;

doorsGroup=new Group();
climbersGroup=new Group();
invisibleBlockGroup=new Group();

spookySound.loop();
}

function draw(){
background("lightblue");



if(gameState==="play"){
 if(keyDown("space")){
  ghost.velocityY=-5; 
 }

if(keyDown("right_arrow")){
  ghost.x=ghost.x+2;  
}

if(keyDown("left_arrow")){
    ghost.x=ghost.x-2;  
  }

ghost.velocityY+=0.5;

if(tower.y>400){
    tower.y=300;  
  }
if(ghost.y>600 || invisibleBlockGroup.isTouching(ghost)){
  ghost.destroy();
  gameState="end";  
}

if(climbersGroup.isTouching(ghost)){
 ghost.velocityY=0;   
}
spawnDoors();

drawSprites();

}//end of play



if(gameState==="end"){
stroke("yellow");
fill("black");
textSize(30);
text("GAME OVER",230,250);
}


}

function spawnDoors(){
  if(frameCount%240===0){
var door = createSprite(200, -50);
 var climber = createSprite(200,10);
  var invisibleBlock = createSprite(200,15);
   invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
     door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    door.addImage(doorImg);
     climber.addImage(climberImg);
    door.velocityY = 1;
     climber.velocityY = 1;
     invisibleBlock.velocityY = 1;
     ghost.depth = door.depth;
     ghost.depth +=1;
              
    //assign lifetime to the variable
     door.lifetime = 800;
    climber.lifetime = 800;
     invisibleBlock.lifetime = 800;

  //add each door to the group doorsGroup.add(door);
   invisibleBlock.debug = true;
     climbersGroup.add(climber);
     invisibleBlockGroup.add(invisibleBlock);
  }  
}

