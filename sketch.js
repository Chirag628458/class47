//const { DOWN_ARROW } = require("./p5");

//const { STROKE } = require("./p5");

const Engine= Matter.Engine;
const World= Matter.World;
const Bodies= Matter.Bodies;

var engine, world;
var bg;
var ground, groundImg
var bl1, bl2, bl3, bl4
var bl1img,bl2img, bl3img, bl4img
var bgSprite
var hero, heroImg;
var enemy, enemyImg;
var enemy2, enemy2Img;
var score=0;
var laser, laserImg;
var laserGroup
var enemyGroup;

function preload(){
  bg= loadImage("background.PNG");
  bl1img= loadImage("building1.png");
  bl2img= loadImage("building2.png");
  bl3img= loadImage("building3.png");
  bl4img= loadImage("building4.png");
  groundImg= loadImage("ground.png");
  heroImg=loadImage("superhero1.png")
  enemyImg=loadImage("enemy.png")
  enemy2Img=loadImage("obstacle.png")
  laserImg= loadImage("laser.png")
}

function setup() {
  createCanvas(1800,700);
  
  engine= Engine.create();
  world= engine.world;
 
  //bl1=createSprite(20,50, 40,100)
  //bl1.addImage(bl1img);

  bgSprite=createSprite(0,0,800,400);
  bgSprite.addImage(bg)
  bgSprite.scale= 10
  bgSprite.velocityX=-5

  ground=createSprite(870, 650, 7000, 150)
  ground.velocityX= -5;
  ground.x= ground.width/2;
  
  hero=createSprite(350,177)
  hero.addImage(heroImg);
  hero.scale= 0.2
  hero.rotateToDirection=true;
  hero.maxSpeed= 4
  hero.friction=0.99


  //hero = new Hero(30,50,100,200);

laserGroup= new Group();
enemyGroup= new Group();
}

function draw() {
  background("white");
  Engine.update(engine);

  if(bgSprite.x<0){
    bgSprite.x= bgSprite.width/2;
  }

  if(ground.x<0){
    ground.x=ground.width/2;
  }

  if(keyDown("DOWN_ARROW")){
   hero.y=hero.y+5
  }

  if(keyDown("UP_ARROW")){
   hero.y= hero.y-5;
  }

  /*if(mouseIsPressed){
    hero.attractionPoint(0.5,mouseX, mouseY);
  }*/

  if(keyDown("space")){
    createLaser();
  }
  
  if(laserGroup.isTouching(enemyGroup)){
    enemyGroup.destroyEach();
    laserGroup.destroyEach();
    score= score+50;
  }
  //hero.display()

  

  spawnBuilding()
  spawnEnemy()
  drawSprites();
  if(score===200){
    textSize(20)
    fill("red")
    text("CONGRATULATIONS!! YOU WON", 600, 350)
    bgSprite.velocityX=0;
    ground.velocityX=0
    enemyGroup.destroyEach();
   
    blSprite.velocityX=0
    laserGroup.visible= false;
  }
  fill("red")
  text(mouseX+","+mouseY, 870, 40);
  fill("black")
  textSize(20);
  stroke("brown");
  text("SCORE: "+ score, 1400, 50);

}

function spawnBuilding(){
  if(frameCount%50===0){
    var blSprite= createSprite(1000,400);
     var rand= Math.round(random(1,5));
     switch(rand){
       case 1: blSprite.addImage(bl1img);
       break;

       case 2: blSprite.addImage(bl2img);
       break;

       case 3: blSprite.addImage(bl3img);
       break;

       case 4: blSprite.addImage(bl4img);
       break;
     }
    blSprite.lifeTime= 200
     blSprite.velocityX= -10
  }
}

function spawnEnemy(){
  if(frameCount%150===0){
    var enemySprite= createSprite(1400,190);
    enemySprite.velocityX= -10
    enemySprite.y=Math.round(random(100,400))
    var result= Math.round(random(1,3))
    switch(result){
      case 1: enemySprite.addImage(enemyImg);
      break;
      case 2: enemySprite.addImage(enemy2Img);
      break;
    }
    enemySprite.lifeTime=200
    enemyGroup.add(enemySprite);
  }

}

function createLaser(){
  laser= createSprite(120,200, 20,30);
  laser.addImage(laserImg)
  laser.scale= 0.3
  laser.x=hero.x
  laser.y=hero.y
  laser.velocityX= 10;
  laserGroup.add(laser);

  laser.lifeTime=200
}


