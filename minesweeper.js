
function mineSweeper() {
    var MineSweeper = {};
    MineSweeper.mines = [];
    MineSweeper.userBoard = [];

    MineSweeper.generateUserBoard = function(x,y) {
        for (var i = 0; i < y; i++) {
            MineSweeper.userBoard.push([]);
            for (var j = 0; j < x; j++) {
                MineSweeper.userBoard[i].push("");
            }
        }
    }
    
    MineSweeper.generateMineBoard = function(x, y, numOfMines) {
        mineSpots = MineSweeper.determineMineSpots(x*y, numOfMines);

        var currentSpot = 0;
        for (var i = 0; i < y; i++) {
            MineSweeper.mines.push([]);
            for (var j = 0; j < x; j++ ) {
                if (mineSpots.includes(currentSpot)) {
                    MineSweeper.mines[i].push(true);
                } else {
                    MineSweeper.mines[i].push(false);
                }
                currentSpot++;
            }
        }
    }

    MineSweeper.determineMineSpots = function(totalSpots, numOfMines) {
        var mineSpots = []
        for (var i = 0; i < numOfMines; i++) {
            var randomMine;
            do {
                randomMine = Math.floor(Math.random() * totalSpots);  
            }
            while (mineSpots.includes(randomMine)) 
            mineSpots.push(randomMine);
        }
        return mineSpots
    }

    MineSweeper.flag = function(x,y) {
        // if x,y in MineSweeper Userboard is flag
        if (MineSweeper.userBoard[x][y] === "f")  {
            MineSweeper.userBoard[x][y] = undefined;
        } else {
            MineSweeper.userBoard[x][y] = "f"
        }
    }

    MineSweeper.reveal = function(x,y) {
        //if x, y in MineSweeper Mines is a mine
        if (MineSweeper.mines[x][y]) {
            //todo handle lose
            console.log('game over');
        } else {
            MineSweeper.countMines(x,y)
        }

            // show mines game over

        // else countMines
    }

    MineSweeper.countMines = function(x, y)  {
        // determine how many mines border         
             // check up, right-up, right, right-down, down, down-left, left, left-up
             // leave sum at x y in UserBoard
             // if up, right-up, right, right-down, down, down-left, left, left-up does not contain mine, we need to repeat 
        var sum = 0;
        // console.log('x', x, 'y', y)
        if (MineSweeper.mines[x + 1] !== undefined) {
            if (MineSweeper.mines[x + 1][y + 1]) {
                sum++;
            } 
            if (MineSweeper.mines[x + 1][y]) {
                sum++;
            }
            if (MineSweeper.mines[x + 1][y - 1]) {
                sum++;
            } 
        }
        if (MineSweeper.mines[x - 1]) {
            if (MineSweeper.mines[x - 1][y]) {
                sum++;
            } 
            if (MineSweeper.mines[x - 1][y + 1]) {
                sum++;
            }
            if (MineSweeper.mines[x - 1][y - 1]) {
                sum++;
            } 
        }
       
        if (MineSweeper.mines[x][y + 1]) {
            sum++;
        } 
     
        if (MineSweeper.mines[x][y - 1]) {
            sum++;
        } 

        MineSweeper.userBoard[x][y] = sum;

        if (sum === 0) {
            if (MineSweeper.mines[x + 1] !== undefined ) {
                if (MineSweeper.mines[x + 1][y + 1] === false && MineSweeper.userBoard[x + 1][ y + 1] === "") {
                    MineSweeper.countMines(x + 1, y + 1)
                }
                if (MineSweeper.mines[x + 1][y] === false && MineSweeper.userBoard[x + 1][ y] === "") {
                    MineSweeper.countMines(x + 1, y)
                }
                if (MineSweeper.mines[x + 1][y - 1] === false && MineSweeper.userBoard[x + 1][ y - 1] === "") {
                    MineSweeper.countMines(x + 1, y - 1)
                }
            }
            if (MineSweeper.mines[x - 1]) {
                if (MineSweeper.mines[x- 1][y] === false && MineSweeper.userBoard[x - 1][y] === "") {
                    MineSweeper.countMines(x-1, y)
                }
                if (MineSweeper.mines[x- 1][y + 1] === false && MineSweeper.userBoard[x - 1][y + 1] === "") {
                    MineSweeper.countMines(x-1, y + 1)
                }
                if (MineSweeper.mines[x - 1][y - 1] === false && MineSweeper.userBoard[x - 1][ y - 1] === "") {
                    MineSweeper.countMines(x - 1, y - 1)
                }
            }
            if (MineSweeper.mines[x] !== undefined) {
                if (MineSweeper.mines[x][y + 1] === false && MineSweeper.userBoard[x][ y + 1] === "") {
                    MineSweeper.countMines(x, y + 1)
                }
            
                if (MineSweeper.mines[x][y - 1] === false && MineSweeper.userBoard[x][ y - 1] === "") {
                    MineSweeper.countMines(x, y - 1)
                }
            }
        }
    

    }


    MineSweeper.generateMineBoard(20, 20, 90) 
    MineSweeper.generateUserBoard(20, 20)


    // console.log('mineSpots' ,determineMineSpots(100, 20))
    return MineSweeper
}

var MineSweeper = mineSweeper()
console.log(MineSweeper.mines);
MineSweeper.reveal(3, 0)
console.log(MineSweeper.userBoard);