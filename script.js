const gameContainer = document.getElementById("game");

let bestScore = JSON.parse(localStorage.getItem('bestScore')) || null;
let firstCard = null;
let secondCard = null;
let wait = false;
let cards = 0;
let score = 0;
let gameOver = false;
document.getElementById('yourScore').innerHTML = "Your Score:" + score;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


// TODO: Implement this function!
function handleCardClick(e) {
  if (wait){
    return;
  }
  if (e.target.classList.contains("chosen")){
    return;
  }

  let choice = e.target;
  choice.style.backgroundColor = choice.classList[0];

  if (!firstCard){
    choice.classList.add("chosen");
    firstCard = choice;
  }
  else if(!secondCard){
    choice.classList.add("chosen");
    secondCard = choice;
  }
  
  if(firstCard && secondCard){
    score ++;
    wait = true;
    let firstCardColor = firstCard.className;
    let SecondCardColor = secondCard.className;
    document.getElementById('yourScore').innerHTML = "Your Score:" + score;

    if(firstCardColor === SecondCardColor){
      cards += 2;
      firstCard.removeEventListener("click", handleCardClick);
      secondCard.removeEventListener("click", handleCardClick);
      firstCard = null;
      secondCard = null;
      wait = false;
    }
    else{
      setTimeout(function(){
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        firstCard.classList.remove("chosen");
        secondCard.classList.remove("chosen");
        firstCard = null;
        secondCard = null;
        wait = false;
      }, 1000);
    }
  }
  if(cards === COLORS.length){
  //let board = document.getElementById('gameBoard');
    setTimeout(function(){window.location.href = 'EndGame.html';},1000);
    localStorage.setItem("yourScore",JSON.stringify(score));
    if(!bestScore){
      bestScore = score;
      localStorage.setItem("bestScore",JSON.stringify(bestScore));
    }
    else if(score < bestScore){
      bestScore = score;
      localStorage.setItem("bestScore",JSON.stringify(bestScore));
    }
  }
  // you can use event.target to see which element was clicked
  console.log("you just clicked", e.target);
  console.log(`Score: ${score}`);
  /*if(!highScore){
    highScore = score;
    localStorage.setItem("highScore",JSON.stringify(highScore));
  }
  else if(score > highScore){
    highScore = score;
    localStorage.setItem("highScore",JSON.stringify(highScore));
  }*/
}

// when the DOM loads
/*if(!highScore){
    document.getElementById('highScore').innerHTML = "High Score: " + 0;
  }
else{
  document.getElementById('highScore').innerHTML = "High Score: " + JSON.parse(highScore);
}
*/
document.addEventListener('DOMContentLoaded',createDivsForColors(shuffledColors));
