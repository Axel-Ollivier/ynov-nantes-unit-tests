class Minesweeper {

    constructor() {
        this.board = [];
        this.mines = [];
        this.revealed = [];
        this.numberOfRows = 10;
        this.numberOfColumns = 10;
        this.numberOfMines = 10;
    }

    createGame(numberOfRows, numberOfColumns, numberOfMines) {
        this.board = [];
        numberOfRows ? this.numberOfRows = numberOfRows : this.numberOfRows = 10;
        numberOfColumns ? this.numberOfColumns = numberOfColumns : this.numberOfColumns = 10;
        numberOfMines ? this.numberOfMines = numberOfMines : this.numberOfMines = 10;
        for (let i = 0; i < this.numberOfRows; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.numberOfColumns; j++) {
                this.board[i][j] = {row: i, column: j};
            }
        }
        this.plantMines(this.numberOfMines);
    }

    plantMines(numberOfMines) {
        let numberOfPlantedMines = 0;
        while (numberOfPlantedMines < numberOfMines) {
            let randomRow = Math.floor(Math.random() * this.board.length);
            let randomColumn = Math.floor(Math.random() * this.board[0].length);
            if (!this.mines.includes(this.board[randomRow][randomColumn])) {
                this.mines.push({row: randomRow, column: randomColumn});
                numberOfPlantedMines++;
            }
        }
    }

    isMine(cell) {
        return this.mines.some(mine => mine.row === cell.row && mine.column === cell.column);
    }

    isRevealed(cell) {
        return this.revealed.some(revealedCell => revealedCell.row === cell.row && revealedCell.column === cell.column);
    }

    getMinesAround(cell){
        let minesAround = 0;
        for (let i = cell.row - 1; i <= cell.row + 1; i++) {
            for (let j = cell.column - 1; j <= cell.column + 1; j++) {
                if (i >= 0 && i < this.numberOfRows && j >= 0 && j < this.numberOfColumns) {
                    if (this.isMine({row: i, column: j})) {
                        minesAround++;
                    }
                }
            }
        }
        return minesAround;
    }
}

module.exports = Minesweeper;