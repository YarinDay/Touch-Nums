'use strict'

var gNums = []
// var gNums = randomNums()
var elButton = document.querySelector('button')
var currNum = 1
var int = null
var endGame = false
var timerRef
var bestScore
var tableSize
function init() {
    startGame()
}

function startGame(elButton) {
    if (elButton.innerText === 'Start Game!') {
        elButton.innerText = 'Restart'
    } else {
        restartGame()
        clearInterval(int)
        timerRef.innerHTML = `00 : 000`
    }
    var elTable = document.querySelector('.table-layout')
    elTable.innerHTML = createBoard()
}

function selectLevel(elButton) {
    tableSize = +elButton.classList.value
    console.log(tableSize)
    gNums = randomNums(tableSize)
}

function checkAnswer(elCell) {
    bestScore = document.querySelector('.best-score');
    console.log(endGame);
    console.log(elCell);
    if (currNum === 1 && +elCell.innerText === 1) {
        endGame = false
        stoper()
    }
    if (currNum === tableSize) {
        endGame = true
        bestScore.innerHTML = timerRef.innerHTML
        clearInterval(int)
    }
    
    if (currNum === +elCell.innerText) {
        elCell.style.backgroundColor = 'blue'
        currNum++
    }
    else {
        elCell.classList.toggle('wrong')
        setTimeout(() => { elCell.classList.toggle('wrong') }, 200)
        
    }
}

function createBoard() {
    var gameTable = ''
    var tableRows = Math.sqrt(tableSize)
    var tableCols = tableRows
    var tableRow = { start: `<tr>`, end: `</tr>` }
    var tableData = { start: `<td class="unchecked" onclick="checkAnswer(this)">`, end: `</td>` }
    for (var i = 0; i < tableRows; i++) {
        gameTable += tableRow.start
        for (var j = 0; j < tableCols; j++) {
            gameTable += tableData.start
            gameTable += gNums.shift()
            gameTable += tableData.end
        }
        gameTable += tableRow.end
    }
    console.log(gameTable);
    // console.log(gameTable);
    return gameTable
}

function restartGame() {
    endGame = false
    currNum = 1
    gNums = randomNums(tableSize)
}

function randomNums(boardSize) {
    var nums = []
    var randNums = []
    for (var i = 1; i <= boardSize; i++) {
        nums.push(i)
    }
    for (var i = 1; i <= boardSize; i++) {
        var randomNum = nums.splice((nums.length - 1), 1)
        randNums.push(randomNum[0])
    }
    return randNums
}

function getRandomInt(max) {
    return Math.floor(Math.random() * ((max) + 1))
}

function stoper() {
    var milliseconds = 0
    var seconds = 0
    timerRef = document.querySelector('.timer-display')
    if (endGame === false && currNum === 1) {
        int = setInterval(displayTimer, 10)
    }
    if (currNum === tableSize && endGame === true) clearInterval(int)
    function displayTimer() {
        milliseconds += 10
        if (milliseconds == 1000) {
            milliseconds = 0
            seconds++
        }
        
        var s = seconds < 10 ? "0" + seconds : seconds
        var ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds
        
        timerRef.innerHTML = ` ${s} : ${ms}`
    }
}

