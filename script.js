const words = ["JAVASCRIPT", "CASA", "BALENA", "CALCULATOR", "CANAPEA", "STICLA", "ANIMAL", "MASINA", "BALCON", "JUCARIE"];
const maxLives = 7;
let lives = maxLives;
let word = words[Math.floor(Math.random() * words.length)];
let answerArray = [];
let lettersGuessed = [];

for (let i = 0; i < word.length; i++) {
    answerArray[i] = "_";
}

function displayMessage(message, duration) {
    document.getElementById("message").innerHTML = message;

    setTimeout(function() {
        document.getElementById("message").innerHTML = "";
    }, duration);
}

document.getElementById("word").innerHTML = answerArray.join(" ");
document.getElementById("lives").innerHTML = `Lives: ${lives}`;
document.getElementById("reload-button").addEventListener("click", function() {
    location.reload();
});

document.addEventListener("submit", function(event) {
    event.preventDefault();
    let guess = document.getElementById("guess").value.toUpperCase();
    document.getElementById("guess").value = "";
    if (guess.length !== 1 || !/^[A-Z]$/.test(guess)) {
        displayMessage("Enter a single letter from A to Z.", 5000);
        return;
    }
    if (lettersGuessed.includes(guess)) {
        displayMessage("You have already guessed this letter.", 5000);
        return;
    }
    lettersGuessed.push(guess);
    document.getElementById("letters").innerHTML = `Guessed letters: ${lettersGuessed.join(" ")}`;

    let correctGuess = false;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === guess) {
            answerArray[i] = guess;
            correctGuess = true;
        }
    }
    if (correctGuess) {
        document.getElementById("word").innerHTML = answerArray.join(" ");
        if (!answerArray.includes("_")) {
            document.getElementById("win").innerHTML = "You won!";
            document.getElementById("guess").disabled = true;
        }
    } else {
        lives--;
        document.getElementById("lives").innerHTML = `Lives: ${lives}`;
        if (lives === 0) {
            document.getElementById("lose").innerHTML = `You lose. The word was ${word}`;
            document.getElementById("guess").disabled = true;
        }
    }
});
