var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg, ghostImg2;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png", "ghost-jumping.png");

  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200, 200, 50, 50);
  ghost.addAnimation("standing", ghostImg);
  ghost.scale = 0.4;
  ghost.debug = true;
  ghost.setCollider("circle", 0, 0, 100)


  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

}

function draw() {
  if (gameState == "play") {
    if (keyDown("LEFT_ARROW")) {
      ghost.x = ghost.x - 3
    }
    if (keyDown("RIGHT_ARROW")) {
      ghost.x += 3
    }
    if (keyDown("SPACE")) {
      ghost.velocityY = -5
      ghost.changeAnimation("jumping", ghostImg)
    }
    ghost.velocityY += 0.3;


    background(200);
    drawSprites();
    spawndoor();
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;

    }
    if (invisibleBlockGroup.isTouching(ghost)) {
      ghost.destroy();
      gameState = "end";
      spookySound.play();
    }

    if (tower.y > 400) {
      tower.y = 300
    }
  }
  if (gameState == "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250);
  }

}

function spawndoor() {
  if (frameCount % 250 == 0) {

    door = createSprite(200, -50);
    door.x = Math.round(random(120, 400))
    door.velocityY = 1;
    door.addImage(doorImg);
    door.lifetime = 800;
    doorsGroup.add(door);

    climber = createSprite(200, 15);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;
    climbersGroup.add(climber);

    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.lifetime = 800;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;

    invisibleBlockGroup.add(invisibleBlock);



    ghost.depth = door.depth + 1;


  }

}
