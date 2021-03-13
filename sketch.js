var balloon,balloonpos,position;
var bg,hotair;

function preload()
{
   bg=loadImage("Hot Air Ballon-01.png");
   hotair=loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");
}
function setup() {

  database=firebase.database();

  createCanvas(1000,800);

  balloon=createSprite(200,500,50,50);
  balloon.addAnimation("balloon",hotair);
  //balloon.scale=0.7;

  balloonpos=database.ref('object/position');
  balloonpos.on("value",read);
}

function read(data){
  position=data.val();

  balloon.x=position.x;
  balloon.y=position.y;

}

function draw() {
  background(bg);
  
  if(position!==undefined){
  if(keyDown(LEFT_ARROW)){
    changeposition(-3,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    changeposition(3,0);
  }
  else if(keyDown(UP_ARROW)){
    changeposition(0,-3);
    balloon.scale=balloon.scale-0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    changeposition(0,+3);
    balloon.scale=balloon.scale+0.01;
  }
  }
  drawSprites();
}

function changeposition(x,y){
  database.ref('object/position').set({
    'x':balloon.x+x,
    'y':balloon.y+y
})
}