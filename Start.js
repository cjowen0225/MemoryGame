let bestScore = JSON.parse(localStorage.getItem('bestScore')) || 0;
document.getElementById('bestScore').innerHTML = "Best Score: " + bestScore;

let score = JSON.parse(localStorage.getItem('yourScore')) || 0;
document.getElementById('yourScore').innerHTML = "Your Score:" + score;