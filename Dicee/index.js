function changeImage(image, randomNumber) {
    document.querySelector(image).setAttribute("src", "images/dice" + randomNumber + ".png");
}

function randomGenerator() {
    return Math.floor((Math.random() * 6) + 1);
}

var randomNumber1 = randomGenerator();
var randomNumber2 = randomGenerator();

changeImage(".img1", randomNumber1);
changeImage(".img2", randomNumber2);

if (randomNumber1 > randomNumber2) {
    document.querySelector(".title h1").innerText = "🚩 Player 1 Wins!";
}else {
    document.querySelector(".title h1").innerText = "Player 2 Wins! 🚩";
}