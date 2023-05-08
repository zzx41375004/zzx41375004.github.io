let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessField = document.querySelector('.guessField');
const guessSubmit = document.querySelector('.guessSubmit');

let guessCount = 1;
let resetButton;

function checkGuess() {
    const userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = 'Previous guesses: ';
    }
    guesses.textContent += `${userGuess} `;

    if (userGuess === randomNumber) {
        lastResult.textContent = '恭喜～你猜对了！';
        lastResult.color = 'lightgreen'
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!次数用尽，GAME OVER!!!';
        lastResult.color = 'red';
        lowOrHi.textContent = '';
        setGameOver();
    } else {
        lastResult.textContent = '错了!';
        // lastResult.style.backgroundColor = 'red';
        lastResult.style.color = 'red';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = '你猜的数字太小了!';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = '你猜的数字太大了';
        }
        lowOrHi.style.color = 'lightgreen';
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = '再玩一次';
    document.body.append(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;

    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
        resetPara.textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';

    randomNumber = Math.floor(Math.random() * 100) + 1;
}

guessField.addEventListener("keydown", logKey);

function logKey(e) {
    if (e.code === "Enter") {
        checkGuess();
    } else {
        lastResult.textContent = '';
        lowOrHi.textContent = '';
        lastResult.style.backgroundColor = 'white';
    }
}























