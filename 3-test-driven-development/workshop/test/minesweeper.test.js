const Minesweeper = require("../src/minesweeper");

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

    //Board checks
    it("Should be able to check if a cell is a mine", () => {
        const minesweeper = new Minesweeper();
        minesweeper.mines = [{row: 0, column: 0}];
        expect(minesweeper.isMine({row: 0, column: 0})).toBe(true);
    });

    it("Should be able to check if a cell is revealed", () => {
        const minesweeper = new Minesweeper();
        minesweeper.revealed = [{row: 0, column: 0}];
        expect(minesweeper.isRevealed({row: 0, column: 0})).toBe(true);
    });

    it("Should be able to check the number of mines around a cell", () => {
        const minesweeper = new Minesweeper();
        minesweeper.createGame(5, 5, 3);
        minesweeper.mines = [
            {row: 0, column: 1},
            {row: 1, column: 0},
            {row: 1, column: 1},
        ];
        expect(minesweeper.getMinesAround({row: 0, column: 0})).toBe(3);
    });

    //Board display
    it("Should be able to display the board", () => {
        const minesweeper = new Minesweeper();
        minesweeper.createGame(5, 5, 3);
        minesweeper.mines = [
            {row: 0, column: 1},
            {row: 1, column: 0},
            {row: 1, column: 1},
        ];
        expect(minesweeper.displayBoard()).toBe(".*...\n" +
            "**...\n" +
            ".....\n" +
            ".....\n" +
            ".....\n");
    });

    it("Should be able to display the board after revealing a cell", () => {
        const minesweeper = new Minesweeper();
        minesweeper.createGame(5, 5, 3);
        minesweeper.mines = [
            {row: 0, column: 1},
            {row: 1, column: 0},
            {row: 1, column: 1},
        ];
        minesweeper.revealCell({row: 2, column: 2});
        expect(minesweeper.displayBoard()).toBe(".*...\n" +
            ".*200\n" +
            "**200\n" +
            "22100\n" +
            "00000\n");
    });

    //Input checks
    //Check if input cell is valid
    it("Should be able to check if input coordonates are valid",()=>{
        const minesweeper = new Minesweeper();
        minesweeper.createGame(5, 5, 3);
        expect(minesweeper.isValidInput({row: 0, column: 0})).toBe(true);
        expect(minesweeper.isValidInput({row: 5, column: 5})).toBe(false);
    })
    //Check if input cell is already revealed
    it("Should be able to check if input coordonates are already revealed",()=>{
        const minesweeper = new Minesweeper();
        minesweeper.createGame(5, 5, 3);
        minesweeper.revealCell({row: 0, column: 0});
        expect(minesweeper.isValidInput({row: 0, column: 0})).toBe(false);
    })
    //Win/Lose checks
    //Check if input cell is a mine and trigger lose
    //Check if all cells are revealed or mines and trigger win

});