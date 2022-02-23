//could make a nice init function
// could make the player button logic easier
const Player = function(name, sign) {
    const getName = () => alert(name);
    const getSign = () => sign;
    return { name, sign };

};

let player1 = Player('Player1', 'X');
let player2 = Player('player2', 'O');

function updatePlayer(e) {
    //very ugly could maybe use document.querySelector('.name:nth-child(index)')
    let index = Array.from(submit).indexOf(e.target)
    if (index == 0) {
        player1.name = document.querySelector(".name").value
        document.querySelector(".name").value = ""
        player1.sign = document.querySelector(".symbol").value
        document.querySelector(".symbol").value = ""
    } else if (index == 1) {

        player2.name = document.querySelectorAll(".name")[1].value
        document.querySelectorAll(".name")[1].value = ""
        player2.sign = document.querySelectorAll(".symbol")[1].value
        document.querySelectorAll(".symbol")[1].value = ""
    }
}

submit = document.querySelectorAll('.submit')
submit.forEach((item) => {
    item.addEventListener('click', updatePlayer)
})

const gameboard = (() => {

    let _board = ["", "", "", "", "", "", "", "", ""];
    _board.forEach((item) => {
        let peice = document.createElement('div')
        peice.classList.add('gamesquare')
        document.querySelector('.gameboard').append(peice)
    })

    function clickevents(e) {
        if (e.currentTarget.innerHTML == "" && gamelogic.getGameState() == true) {
            let index = findindex(e)
            makemark(index)
            renderboard()
            gamelogic.handlePlayers()
            gamelogic.flowMessage()
            gamelogic.handleResultValidation()
        }
    }

    function makemark(index) {
        //could try to use the code from reset to make it more elegant
        // need to add a check to see if the thing is empty  
        _board[index] = (gamelogic.getplayer()).sign
        let change = document.querySelector('.gameboard').childNodes[index]
        change.innerHTML = gamelogic.getplayer().sign
    }

    function findindex(e) {
        let indexofboard = Array.from(squares).indexOf(e.target)
        return indexofboard
    }

    function renderboard() {
        //not doing anything?
        for (i = 0; i <= 8; i++) {
            _board[i] = Array.from(squares)[i].innerHTML
        }
    }


    function reset() {
        let _board = ["", "", "", "", "", "", "", "", ""];
        for (i = 0; i <= 8; i++) {
            Array.from(squares)[i].innerHTML = _board[i]
        }
        display.innerHTML = "Please start!"
        squares.forEach((square) => {
            square.innerHTML = ""
        })
    }

    function getboard() {
        for (i = 0; i <= 8; i++) {
            _board[i] = Array.from(squares)[i].innerHTML
        }
        return _board
    }

    squares = document.querySelectorAll('.gamesquare')
    squares.forEach((square) => {
        square.addEventListener('click', clickevents)
    })
    resetbtn = document.querySelector('.reset')
    resetbtn.addEventListener('click', reset)
    return { getboard: getboard }
})()


const gamelogic = (() => {

    let playerturn = player1
    display = document.querySelector('.display')
    let gameActive = true

    const handlePlayers = () => {

        if (playerturn == player1) {
            playerturn = player2;

            flowMessage(playerturn.name)
            return player1.name
        } else {
            playerturn = player1;
            flowMessage(playerturn.name)
            return player2.name
        }
    }
    const getplayer = () => {
        return playerturn
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
        display.innerHTML = `it is ${getplayer().name}'s turn`
    }

    function getGameState() {
        return gameActive
    }

    const handleResultValidation = () => {
        let roundWon = false;
        let _board = []
        _board = gameboard.getboard()

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

            display.innerHTML = `${getplayer().name} won`
        }

        function drawMessage() {
            display.innerHTML = `it's a draw`
        }

        if (roundWon) {
            winningMessage()
            gameActive = false
                // need a way to stop more clicks on board
        }

        let roundDraw = !(_board.includes(""))
        if (roundDraw) {
            console.log('draw coditon')
            drawMessage()
            return
        }
    }
    return {
        handlePlayers: handlePlayers,
        flowMessage: flowMessage,
        handleResultValidation: handleResultValidation,
        getplayer: getplayer,
        getGameState: getGameState
    }

})()