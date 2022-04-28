const {Minesweeper} = require("../src/minesweeper");

describe("Minesweeper", () => {

    //beforeEach(() => {
    //    const consoleSpy = jest.spyOn(console, "log");
    //});

    // Initialize a new game
    it("Should be able to create a new game with custom number of rows/cols/mines", () => {
        const minesweeper = new Minesweeper();
        minesweeper.createGame(5, 5, 5);
        expect(minesweeper.board.length).toBe(5);
        expect(minesweeper.board[0].length).toBe(5);
        expect(minesweeper.mines.length).toBe(5);
    });

    it("Should be able to create a new game with default number of rows/cols/mines", () => {
        const minesweeper = new Minesweeper();
        minesweeper.createGame();
        expect(minesweeper.board.length).toBe(10);
        expect(minesweeper.board[0].length).toBe(10);
        expect(minesweeper.mines.length).toBe(10);
    });

    //Board
    it("Should be able to check if a cell is a mine", () => {
        const minesweeper = new Minesweeper();
        minesweeper.mines = [{row: 0, col: 0}];
        expect(minesweeper.isMine({row: 0, col: 0})).toBe(true);
    });

    it("Should be able to check if a cell is revealed", () => {
        const minesweeper = new Minesweeper();
        minesweeper.revealed = [{row: 0, col: 0}];
        expect(minesweeper.isRevealed({row: 0, col: 0})).toBe(true);
    });

    it("Should be able to check the number of mines around a cell", () => {
        const minesweeper = new Minesweeper();
        minesweeper.mines = [
            {row: 0, col: 1},
            {row: 1, col: 0},
            {row: 1, col: 1},
        ];
        expect(minesweeper.getMinesAround({row: 0, col: 0})).toBe(3);
    });

});