const gameboard = (() => {
    let _board = ["", "", "", "", "", "", "", "", ""];


})()

const gamelogic = (() => {

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

    const handleResultValidation = () => {
            let roundWon = false;
            for (let i = 0; i <= 7; i++) {
                const winCondition = winningConditions[i];
                let a = board[winCondition[0]];
                let b = board[winCondition[1]];
                let c = board[winCondition[2]];
                if (a === '' || b === '' || c === '') {
                    continue;
                }
                if (a === b && b === c) {
                    roundWon = true;
                    break
                }
            }
        }
        //if all of board is taken, it is a tie
})()

const Player = (name, sign) => {
    const getName = () => name;
    const getSign = () => sign;


    return { getName, getSign };
};

const player1 = Player('jim', 'D');
const player2 = Player('jeff', 'O');