// variáveis
var bow, arrow, scene;
var bowImage, arrowImage, greenBalloonImage, redBalloonImage, pinkBalloonImage, blueBalloonImage, backgroundImage;
var score = 0;
var gameState = "PLAY";
var blueBalloon, redBalloon, greenBalloon, pinkBalloon;
// grupos
var arrowGroup, redBalloonGroup, blueBalloonGroup, greenBalloonGroup, pinkBalloonGroup;

// pré-carregamento de imagens
function preload() {
  backgroundImage = loadImage("background0.png");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  redBalloonImage = loadImage("red_balloon0.png");
  greenBalloonImage = loadImage("green_balloon0.png");
  blueBalloonImage = loadImage("blue_balloon0.png");
  pinkBalloonImage = loadImage("pink_balloon0.png");
}

// configurações iniciais
function setup() {
  createCanvas(400, 400);

  //criar fundo
  scene = createSprite(0, 0, 400, 400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5;

  // criar arco para a flecha
  bow = createSprite(380, 220, 20, 50);
  bow.addImage(bowImage);
  bow.scale = 1;

  // criar grupos
  arrowGroup = new Group();
  redBalloonGroup = new Group();
  blueBalloonGroup = new Group();
  greenBalloonGroup = new Group();
  pinkBalloonGroup = new Group();

  // reiniciar pontuação
  score = 0;
}

// jogo em execução
// jogo em execução
function draw() {
  background(0);
  
  // mover chão
  if (scene) {
    scene.velocityX = -3;

    if (scene.x < 0) {
      scene.x = scene.width / 2;
    }
  }

  if(gameState === "PLAY") {

    // mover arco
    bow.y = World.mouseY;

    // disparar flechas com a tecla de espaço
    if (keyDown("space")) {
      createArrow();
    }
  }

  // criar inimigos continuamente
  if (World.frameCount % 100 == 0) {
    var select_balloon = Math.round(random(1, 4));
    switch (select_balloon) {
      case 1:
        redBalloon();
        break;
      case 2:
        blueBalloon();
        break;
      case 3:
        greenBalloon();
        break;
      case 4:
        pinkBalloon();
        break;
      default:
        break;
    }
  }

  // aumentar a pontuação se a flecha atingir um balão
  if(arrowGroup.isTouching(redBalloonGroup)) {
    redBalloonGroup.destroyEach();
    arrowGroup.destroyEach();
    score = score + 1;
  }

  if(arrowGroup.isTouching(blueBalloonGroup)) {
    blueBalloonGroup.destroyEach();
    arrowGroup.destroyEach();
    score = score + 2;
  }

  if(arrowGroup.isTouching(greenBalloonGroup)) {
    greenBalloonGroup.destroyEach();
    arrowGroup.destroyEach();
    score = score + 3;
  }

  if(arrowGroup.isTouching(pinkBalloonGroup)) {
    pinkBalloonGroup.destroyEach();
    arrowGroup.destroyEach();
    score = score + 4;
  }

  drawSprites();

  // exibir pontuação
  text("Pontuação: "+ score, 270, 30);

  // mudar para o estado END se a flecha colidir com o balão
  if(redBalloonGroup.isTouching(arrowGroup) || blueBalloonGroup.isTouching(arrowGroup) || greenBalloonGroup.isTouching(arrowGroup) || pinkBalloonGroup.isTouching(arrowGroup)) {
    gameState = "END";
  }
}

// função para criar balões azuis
function blueBalloon() {
  var blueBalloon = createSprite(0, Math.round(random(20, 370)), 10, 10);
  blueBalloon.addImage(blueBalloonImage);
  blueBalloon.velocityX = 3;
  blueBalloon.lifetime = 150;
  blueBalloon.scale = 0.1;
  blueBalloonGroup.add(blueBalloon);
}

function redBalloon() {
  var redBalloon = createSprite(0, Math.round(random(20, 370)), 10, 10);
  redBalloon.addImage(redBalloonImage);
  redBalloon.velocityX = 3;
  redBalloon.lifetime = 150;
  redBalloon.scale = 0.1;
  redBalloonGroup.add(redBalloon);
}

function greenBalloon() {
  var greenBalloon = createSprite(0, Math.round(random(20, 370)), 10, 10);
  greenBalloon.addImage(greenBalloonImage);
  greenBalloon.velocityX = 3;
  greenBalloon.lifetime = 150;
  greenBalloon.scale = 0.1;
  greenBalloonGroup.add(greenBalloon);
}

function pinkBalloon() {
  var pinkBalloon = createSprite(0, Math.round(random(20, 370)), 10, 10);
  pinkBalloon.addImage(pinkBalloonImage);
  pinkBalloon.velocityX = 3;
  pinkBalloon.lifetime = 150;
  pinkBalloon.scale = 1.2;
  pinkBalloonGroup.add(pinkBalloon);
}
 
// função para criar flechas
function createArrow() {
  var arrow= createSprite(360, 100, 5, 10);
  arrow.addImage(arrowImage);
  arrow.scale = 0.3;
  arrow.velocityX = -6;
  arrow.y = bow.y;
  arrow.lifetime = 100;
  arrowGroup.add(arrow);
}


