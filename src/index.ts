const buttons = Array.from(
    document.getElementById('game-container')!
        .childNodes as NodeListOf<HTMLButtonElement>,
).filter(it => it.nodeType === 1);

let turn: boolean = false;
const winningArray: string[][] = [
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
];

buttons.forEach((btn, index) =>
    btn.addEventListener('click', () => {
        const letter = turn ? 'X' : 'O';
        btn.textContent = letter;

        switch (true) {
            case index <= 2:
                winningArray[0][index] = letter;
                break;
            case index <= 5:
                const indexAux = index - 3;
                winningArray[1][indexAux] = letter;
                break;
            default:
                const indexAux2 = index - 6;
                winningArray[2][indexAux2] = letter;
                break;
        }
        turn = !turn;

        btn.disabled = true;

        whosWinning(winningArray);
    }),
);

const winningCheck = (buttons: HTMLButtonElement[]) => {
    for (let button of buttons) {
        if (!button.textContent) {
            return;
        }
    }

    whosWinning(winningArray);
};

const whosWinning = (array: string[][]) => {
    const [rowOne, rowTwo, rowThree] = array;
    let winner: string = '';

    const diagonalOne = rowOne[0] === rowTwo[1] && rowTwo[1] === rowThree[2];
    const diagonalTwo = rowOne[2] === rowTwo[1] && rowTwo[1] === rowThree[0];

    const verticalOne = rowOne[0] === rowTwo[0] && rowTwo[0] === rowThree[0];
    const verticalTwo = rowOne[1] === rowTwo[1] && rowTwo[1] === rowThree[1];
    const verticalThree = rowOne[2] === rowTwo[2] && rowTwo[2] === rowThree[2];

    switch (true) {
        case diagonalOne:
            winner = rowOne[0];

            break;
        case diagonalTwo:
            winner = rowOne[2];
            break;
        case verticalOne:
            winner = rowOne[0];
            console.log(`vertical one`);
            break;
        case verticalTwo:
            winner = rowOne[1];
            console.log(`vertical ttwo`);
            break;
        case verticalThree:
            winner = rowOne[2];
            console.log(`vertical three`);
            break;
    }

    for (let sub of array) {
        const value = sub[0];
        if (sub[0] === value && sub[1] === value && sub[2] === value) {
            winner = value;
        }
    }

    if (winner.length) {
        console.log(winner);
        buttons.forEach(btn => (btn.disabled = true));
        const h1 = document.querySelector('h1')!;
        h1.style.color = 'red';
        h1.textContent = `O vencedor foi ${winner}`;
    }
};
