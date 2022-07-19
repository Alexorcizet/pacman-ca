'use strict'
const ALL_FOOD = 60
const PACMAN = '<img src="img/pac-man.gif">';
var gPacman;


var collectedFood = 0

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    if (nextCell === WALL) return
    if (nextCell === FOOD) {
        updateScore(1)
        collectedFood++
    }
    else if (nextCell === SUPER_FOOD) {

        if (gPacman.isSuper) return
        updateScore(5)
        collectedFood++
        gPacman.isSuper = true
        setTimeout(() => { gPacman.isSuper = false }, 5000)

    }
    else if (nextCell === CHERRY) {
        updateScore(10)
    }
    else if (nextCell === GHOST) {

        if (gPacman.isSuper) {

            var deadMons = []

            for (var i = 0; i < gGhosts.length; i++) {

                if ((nextLocation.i === gGhosts[i].location.i)
                    && (nextLocation.j === gGhosts[i].location.j)) {

                    if (gGhosts[i].currCellContent === FOOD) {

                        gGhosts[i].currCellContent = ' '
                        collectedFood++

                        ////MODEL
                        gBoard[gGhosts[i].location.i][gGhosts[i].location.j] === FOOD

                        ///DOM
                        renderCell(nextLocation, FOOD)

                    } else if (gGhosts[i].currCellContent === SUPER_FOOD) {
                        gGhosts[i].currCellContent = ' '
                        collectedFood++
                        ////MODEL
                        gBoard[gGhosts[i].location.i][gGhosts[i].location.j] === SUPER_FOOD
                        ///DOM
                        renderCell(nextLocation, SUPER_FOOD)
                    }
                    deadMons = gGhosts.splice(i, 1)
                    setTimeout(() => gGhosts.push(deadMons.pop()), 5000)
                }

            }

        } else {

            gameOver()
            renderCell(gPacman.location, EMPTY)
            return
        }
    }
    if (collectedFood === ALL_FOOD) {

        console.log('All_FOOD:', ALL_FOOD)
        gGame.isWon = true
        gameOver()

    }


    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
    }
    return nextLocation;
}