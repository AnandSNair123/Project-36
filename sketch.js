var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();
lastFed = hour();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed =createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  var time = hour();
  console.log(time);
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  formatTime();
 
  //write code to display text lastFed time here
  
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
foodObj.deductFood(foodS);
foodS = foodS-1;
  database.ref('/').update({
    Food:foodS
  })
  //write code here to update food stock and last fed time
  

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  dog.addImage(sadDog);
}
function formatTime(){
  var format = hour();
  var formating = 0;
  if(format<12){
    formating = "PM";
  }
  if(format>=12){
    formating = "AM";
  }
  fill("white");
  textSize(20);
  text("Last Fed :"+format+formating,300,30);
}
