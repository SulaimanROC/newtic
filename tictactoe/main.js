const player ='x'
const computer ='circle'
const win = 
 [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],   
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
 ]

 const cell = document.querySelectorAll('.area');
const container = document.getElementById('.container');
const winner = document.getElementById('.winner');
const restart = document.getElementById('restartbutton');
const winnertextelement = document.getElementById('winningmessage');
let isPlayerTurn = false;


startGame()

restart.addEventListener('click', startGame);

function startGame() {
    isPlayerTurn = false
    cell.forEach(cell => {
        cell.classList.remove(player)
        cell.classList.remove(computer)
        cell.removeEventListener('click', handleCellClick)
        cell.addEventListener('click', handleCellClick, { once: true})
    })
    setBoardHoverClass()
    winnertextelement.classList.remvove('show')

    }
    
function handleCellClick(e) {
    const cell = e.target
    const currentClass = isPlayerTurn ? computer : player
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winnertextelement.innerText = "It's a draw!"
    } else {
        winnertextelement.innerText = 'Player with ${player ? "O'computer" : "x's"} wins!'

    }
    winnertextelement.classList.add('show')
}

function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(player) || cell.classList.contains(computer)
	})
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    computer = !computer
}

function setBoardHoverClass() {
    container.classList.remove(player)
    container.classList.remove(computer)
    if (computer) {
        container.classList.add(computer)
    } else {
        container.classList.add(player)
    }
}

function checkWin(currentClass) {
    return winnercombo.some(combo => {
        return combo.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}