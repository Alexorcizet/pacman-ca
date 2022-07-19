'use strict'

function printMat(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = 'cell cell-' + i + '-' + j
            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getRandomIntInc(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function getEmptyCells() {
    var emptyCells = []
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {

            if (gBoard[i][j] === ' ' && gBoard[i][j] !== WALL) {
                if (gBoard[i][j] !== PACMAN && gBoard[i][j] !== GHOST)
                    emptyCells.push({ i, j })
            }
        }
    }
    return emptyCells


}


function drawNum(arr) {
    var idx = getRandomIntInc(0, arr.length)
    var obj = arr[idx]
    arr.splice(idx, 1)
    return obj
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}