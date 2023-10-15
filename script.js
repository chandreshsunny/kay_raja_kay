'use strict';
let hiddenNumber = Math.trunc(Math.random() * 20) + 1;
let score = 5;
let highscore = 0;
let modal = document.querySelector('.modal');
let warn = document.querySelector('.warn');
const btnCloseModal = document.querySelector('.close-modal');
let gameWon = false;  //is it used for input box doesnt taking value after game won

let displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
};
let warningMessage = function (warning) {
    document.querySelector('.warn').textContent = warning;
}
const closeModal = function () {
    modal.classList.add('hidden');
};

document.querySelector('.check').addEventListener('click', function () {
    if (gameWon) return;

    let guess = Number(document.querySelector('.guess').value);
    if (guess > 20) {
        //window.alert("give the numbers between 1 to 20");
        modal.classList.remove('hidden');
        warningMessage('give the numbers between 1 to 20')
        document.querySelector('.warn').style.color = 'red';
        btnCloseModal.addEventListener('click', closeModal);
        return;
    }
    if (!guess) {
        displayMessage('Give any number more than 0');
        return;
    }

    if (guess === hiddenNumber) {
        displayMessage('🎉Correct Number');
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
        document.querySelector('.number').textContent = hiddenNumber;

        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
        const winningAudio = document.querySelector('.winning-audio');
        winningAudio.play();
        const backAudio = document.querySelector('.back-audio');
        backAudio.pause();
        gameWon = true;
    } else {
        displayMessage('Sorry, try again!');
        score--;
        if (score == 1) {
            modal.classList.remove('hidden');
            warningMessage('careful, you have only one attempt left')
            document.querySelector('.warn').style.color = 'red';
            btnCloseModal.addEventListener('click', closeModal);
            return;
        }
        document.querySelector('.score').textContent = score;

        if (score === 0) {
            displayMessage('👎You Lost the game👎');
            document.querySelector('.score').textContent = 0;
            gameWon = true;
        }
    }
});

document.querySelector('.again').addEventListener('click', function () {
    document.querySelector('.message').textContent = 'Start guessing...';
    score = 5;
    hiddenNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    gameWon = false;
    const winningAudio = document.querySelector('.winning-audio');
    winningAudio.pause();


});



