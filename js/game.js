'use strict'

const WALL = '<img src=img/wall.jpg>'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '&#127829;'
const CHERRY = '&#127826;'
var gCherryInterval

var gGame = {
    score: 0,
    isOn: false,
    isWon: false,
}
var gBoard
console.log('gBoard:', gBoard)


function init() {
    gGame.score = 0
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    gGame.isWon = false
    gCherryInterval = setInterval(renderCherry, 5000);

}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            }

            if ((i === 1 && j === 1) || (i === 1 && j === SIZE - 2) ||
                (i === SIZE - 2 && j === SIZE - 2) || (i === SIZE - 2 && j === 1)) {
                board[i][j] = SUPER_FOOD
            }
        }
    }
    console.log('board:', board.length)

    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function renderCherry() {
    var cherryPop = getEmptyCells()
    var randomCherry = drawNum(cherryPop)
    gBoard[randomCherry.i][randomCherry.j] = CHERRY
    renderCell(randomCherry, CHERRY)
}

function gameOver() {
    collectedFood = 0

    var elModal = document.querySelector('.modal')
    var elH2Modal = document.querySelector('.modal h2')

    if (gGame.isWon) elH2Modal.innerText = 'You won, Play again?'
    else elH2Modal.innerText = 'The ghost got you, Try again'
    elModal.style.display = 'block'

    gGame.isWon = false
    gGame.isOn = false

    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
}


function ResetGame() {

    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'

    init()
}





