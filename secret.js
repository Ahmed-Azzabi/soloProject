var BGM = new Audio("./secretbgm.mp3")
var lose = new Audio("./secretdeath.mp3")
var audio = new Audio("./secretjump.mp3")

$(window).on("keydown", function (e) {
    console.log(e.key);
    if (e.key === "m") {
      /*if you press f the jump function is triggered*/
      BGM.play();
    }
  });

var wall = document.getElementById("wall"); /*obstacle */
var hole = document.getElementById("hole"); /*Self explanatory */
var gamer = document.getElementById("player"); /*Our sprite */
var jumpReset = 0; /*this is for my gravity function, as long as its 0 it will keep pushing me down*/

hole.addEventListener("animationiteration", function () {
  var random = Math.floor(
    Math.random() * 500
  ); /*This will make it so the hole generates randomly instead of being static */
  hole.style.top = random + "px";
});

var score = 0



function gravity(){
var ID = setInterval(function () {
  /* this is the gravity and hit-detection function */ var charVertical =
    parseInt(
      window.getComputedStyle(gamer).top
    ); /* pretty much where my sprite is located, getComputedStyle gives an object of css keys and we want to access the top value then manipulate it and parseInt so I get just the number value*/
    score++
  if (jumpReset === 0) {
    gamer.style.top =
      charVertical +
      2 +
      "px"; /*This keeps pushing my sprite down to simulate gravity by modifying the top value of where my sprite is located */
  }
  var myHitbox = parseInt(window.getComputedStyle(gamer).top);
  console.log("hitbox", myHitbox);
  var wallHorizontal = parseInt(
    window.getComputedStyle(wall).left
  ); /*Wall location*/
  console.log("wall", wallHorizontal);
  var holeVertical = parseInt(
    window.getComputedStyle(hole).top
  ); /*Hole location */
  console.log("hole", holeVertical);
  if(myHitbox < -200){
    location.replace("SECRET.html")
  }
  if (  (charVertical > 700) || wallHorizontal < 20 && wallHorizontal > -20 && (myHitbox < holeVertical || myHitbox > holeVertical + 140)) {
    /*This is the lose condition (if you fall too low or hit the incoming walls) */
    $("#btn").show()
    $("#content").hide()
    $("#highscorelist").hide()
    clearInterval(ID)
    lose.play()
    timer = 00
    gamer.style.top =
      300 +
      "px"; /* This is the position where my sprite will reset after I lose */
      location.replace("page.html")
  }
}, 10); }


var timer = 00
var addTimer = document.getElementById("time")
var timerCSS = window.getComputedStyle(addTimer).color
console.log(timerCSS)

var startTimer = setInterval(function() {
  timer++
  addTimer.innerHTML = timer
  console.log(timer)
  if(timer >= 1000){
    timerCSS = 'rgb(0,0,255)'
  }                                   /*Wanted to change timer color but even though I did it correctly according to console log, it doesn't seem to work */
  if(timer >= 2000){
    timerCSS = 'rgb(255,0,0)'
  }
} , 10)


var jump = function () {
  audio.play()
  jumpReset = 1; /* this means gravity function is not in action but we reset it at the end of this function so it not forever paused*/
  var count = 0; /* how many times you jumped so it doesnt keep going up, we'll reset it */
  var flightTime = setInterval(function () {
    var charVertical = parseInt(window.getComputedStyle(gamer).top);
    gamer.style.top = charVertical - 10 + "px";
    if (count > 5) {
      clearInterval(flightTime);
      jumpReset = 0; /* gravity function is back in action */
      count = 0;
    }
    count++;
  }, 10);
};

$(window).on("keydown", function (e) {
  console.log(e.key);
  if (e.key === "f") {
    /*if you press f the jump function is triggered*/
    jump();
  }
});

$(".wrapper").click(function(){
  $("#content").show()
  $("#btn").hide()
  $("#highscorelist").show()
  gravity()
  startTimer()
  BGM.play()
  jumpNum = 0
})

