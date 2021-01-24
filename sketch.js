var knife,alien,swordImage,gameOverImage;
var fruitImage1, fruitImage2, fruitImage3,fruitImage4,alienImage;
var PLAY = 1;
var END = 0;
var gameState = 1;
function preload(){
  swordImage = loadImage("sword.png");
  
  fruitImage1 = loadImage ("fruit1.png");
  fruitImage2 = loadImage ("fruit2.png");
  fruitImage3 = loadImage ("fruit3.png");
  fruitImage4 = loadImage ("fruit4.png");
  
  gameOverImage = loadImage ("gameover.png");
  
  alienImage = loadAnimation ("alien1.png");
 
}
function setup () {
  knife=createSprite (40,200,20,20);
  knife.addImage (swordImage);
  knife.scale = 0.5;
  enemyGroup = createGroup();
  fruitGroup = createGroup();
  score = 0;
}

function draw() {
 // console.log(gameState)
  
  background("lightblue");
  
   knife.x = World.mouseX;
   knife.y = World.mouseY;
  fill ("black")
  textFont ("cursive")
  text ("Score:"+score,300,50);
  
  if (gameState===PLAY) {
    fruits();
     Enemy();
    
     knife.addImage (swordImage);
    knife.scale = 0.5;
    
  }
  
  if(enemyGroup.isTouching(knife)) {
    gameState = END
  }
  
  if (fruitGroup.isTouching(knife)) {
    score = score+1;
    fruitGroup.destroyEach();
  }
  
  if (gameState === END) {
    knife.x = 200;
    knife.y = 200;
    knife.addImage (gameOverImage);
    knife.scale = 1;
    enemyGroup.destroyEach();
    fruitGroup.destroyEach();
    textSize = 20;
    text ("Press R to restart",150,250)
  }
  
  if (keyDown("r")) {
    gameState = PLAY
   score = 0;
  }
  
 drawSprites();
  
}
function fruits() {
  if (World.frameCount%80===0) {
    fruit=createSprite (400,200,20,20);
       fruit.scale = 0.15;
    fruit.lifetime = 200;
     fruit.velocityX = -7;
     fruitGroup.add(fruit);
    fruit.y = Math.round(random(50,320))
    r=Math.round(random(0,4));
    if(r===1) {
    fruit.addImage(fruitImage1)
    }  else if (r===2) {
      fruit.addImage(fruitImage2)
    } else if (r===3) {
      fruit.addImage(fruitImage3)
    } else  {
      fruit.addImage(fruitImage4)
    }
   
  }
 
}

function Enemy() {
 if (frameCount%200===0) {
  alien = createSprite (400,200,20,20);
  alien.scale = 0.5;
    alien.velocityX = -8;
  alien.setLifetime = 50;
   enemyGroup.add(alien);
  alien.addAnimation ("alien",alienImage);
  alien.y = Math.round (random(100,300));
 }
}


