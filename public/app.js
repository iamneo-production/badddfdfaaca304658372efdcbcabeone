// Constants
const SIZE = 3; // Size of the grid
const WINNING_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initial game state
let cells = Array(SIZE * SIZE).fill('');
let currentPlayer = 'X';
let result = document.querySelector('.result');
let box = document.querySelector('.box');
let resetButton = document.querySelector('#reset');

// Create the grid dynamically
for (let i = 0; i < SIZE; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < SIZE; j++) {
        const index = i * SIZE + j;
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.dataset.index = index;
        row.appendChild(btn);
    }
    box.appendChild(row);
}

// Function to handle player moves
const makeMove = (index) => {
    if (cells[index] === '' && !checkWin()) {
        cells[index] = currentPlayer;
        btns[index].textContent = currentPlayer;
        btns[index].disabled = true;

        // Check for a win after each move
        if (checkWin()) {
            result.textContent = `Player ${currentPlayer} wins!`;
            disableAllButtons();
        } else if (cells.every((cell) => cell !== '')) {
            result.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            result.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
};

// Function to check for a win
const checkWin = () => {
    for (const condition of WINNING_CONDITIONS) {
        const [a, b, c] = condition;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return true;
        }
    }
    return false;
};

// Function to disable all buttons
const disableAllButtons = () => {
    btns.forEach((btn) => {
        btn.disabled = true;
    });
};

// Function to reset the game
const resetGame = () => {
    cells = Array(SIZE * SIZE).fill('');
    currentPlayer = 'X';
    result.textContent = `Player ${currentPlayer}'s Turn`;

    btns.forEach((btn, i) => {
        btn.textContent = '';
        btn.disabled = false;
        btn.addEventListener('click', () => makeMove(i));
    });
};

// Event delegation to handle button clicks
box.addEventListener('click', (event) => {
    const button = event.target;
    if (button.classList.contains('btn')) {
        const index = button.getAttribute('data-index');
        makeMove(index);
    }
});

resetButton.addEventListener('click', resetGame);

// Store references to buttons for enabling/disabling
let btns = document.querySelectorAll('.btn');
