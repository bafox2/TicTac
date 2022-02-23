const Player = function(name, sign) {
    const getName = () => alert(name);
    const getSign = () => sign;
    return { name, sign };

};

let player1 = Player('jim', 'D');
let player2 = Player('jeff', 'O');

submit = document.querySelectorAll('.submit')
submit.forEach((item) => {
    item.addEventListener('click', updatePlayer)
})

function updatePlayer(e) {
    //very ugly could maybe use document.querySelector('.name:nth-child(index)')
    let index = Array.from(submit).indexOf(e.target)
    if (index == 0) {
        player1.name = document.querySelector(".name").value
        player1.sign = document.querySelector(".symbol").value
    } else if (index == 1) {

        player2.name = document.querySelectorAll(".name")[1].value
        player2.sign = document.querySelectorAll(".symbol")[1].value
    }
}

const gameboard = (() => {

    let _board = ["", "", "", "", "", "", "", "", ""];
    _board.forEach((item) => {
        let peice = document.createElement('div')
        peice.classList.add('gamesquare')
        document.querySelector('.gameboard').append(peice)
    })

    function clickevents(e) {
        let index = findindex(e)
        makemark(index)
        renderboard()
        handlePlayers()

    }

    function makemark(index) {
        //could try to use the code from reset to make it more elegant
        _board[index] = player1.sign
        let change = document.querySelector('.gameboard').childNodes[index]
        change.innerHTML = player1.sign
    }

    function findindex(e) {
        let indexofboard = Array.from(squares).indexOf(e.target)
        return indexofboard
    }

    function renderboard() {
        // obsolete right now because the makemark function does this on its own
    }

    function reset() {
        let _board = ["", "", "", "", "", "", "", "", ""];
        squares.forEach((square) => {
            square.innerHTML = ""
        })
    }
    squares = document.querySelectorAll('.gamesquare')
    squares.forEach((square) => {
        square.addEventListener('click', clickevents)
    })
    resetbtn = document.querySelector('.reset')
    resetbtn.addEventListener('click', reset)

})()


const gamelogic = (() => {

    display = document.querySelector('.display')

    const handlePlayers = () => {
        let playerturn = player1
        if (playerturn == player1) { playerturn == player2 } else if (playerturn == player2) {
            playerturn = player1
        }
        flowMessage()
        console.log(playerturn)
    }

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function flowMessage() {
        display.innerHTML = `it is ${playerturn}'s turn`
    }

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = _board[winCondition[0]];
            let b = _board[winCondition[1]];
            let c = _board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break
            }
        }

        function winningMessage() {
            display.innerHTML = `${playerturn} won`
        }

        function drawMessage() {
            display.innerHTML = `it's a draw`
        }

        if (roundWon) {
            gameDisplay.innerHTML = winningMessage()
            return
        }

        let roundDraw = !_board.includes("")
        if (roundDraw) {
            gameDisplay.innerHTML = drawMessage()
            return
        }
    }
    return { handlePlayers: handlePlayers }

})()