let cells = document.querySelectorAll('.cell')
let result = document.querySelector('.result')
let resetbtn = document.querySelector('.btn')
let current_player = 'X'
let gamestate = Array(9).fill(null)
let winning_formats =[
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
]

resetbtn.addEventListener('click',reset_game)

cells.forEach(cell => {
    cell.addEventListener('click',() => {gamerules(cell)})
   
});

function gamerules(cell) {
    const index = cell.dataset.index
    cell.textContent = current_player

    gamestate[index] = current_player

    if(checkWinner()){
        result.textContent = `The Winner is ${current_player}`
        result.classList.add('win')
        cells.forEach(cell => {
            cell.classList.add('taken')
        })
    }
    else if (gamestate.every(cell => cell)) {
        result.textContent = `There is No Winner`
        result.classList.add('fail')
    }
    else{
        current_player = current_player === "X" ? "O" : "X";
    }

    cell.classList.add('taken')
}

function checkWinner() {
    return winning_formats.some(format => {
        return format.every(index => gamestate[index] === current_player);
    });
}

function reset_game() {
    current_player = current_player === "X" ? "O" : "X";
    cells.forEach(cell => {
        cell.textContent = ''
        cell.classList.remove('taken')
    })
    result.textContent = 'Waiting for Winner'
    result.classList.remove('win')
    result.classList.remove('fail')
}