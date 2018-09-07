
function mineSweeper(x, y, numOfMines) {
    var MineSweeper = {};
    MineSweeper.mines = [];
    MineSweeper.userBoard = [];

    MineSweeper.generateUserBoard = function (x, y) {
        for (var i = 0; i < y; i++) {
            MineSweeper.userBoard.push([]);
            for (var j = 0; j < x; j++) {
                MineSweeper.userBoard[i].push("");
            }
        }
    }

    MineSweeper.generateMineBoard = function (x, y, numOfMines) {
        mineSpots = MineSweeper.determineMineSpots(x * y, numOfMines);

        var currentSpot = 0;
        for (var i = 0; i < y; i++) {
            MineSweeper.mines.push([]);
            for (var j = 0; j < x; j++) {
                if (mineSpots.includes(currentSpot)) {
                    MineSweeper.mines[i].push(true);
                } else {
                    MineSweeper.mines[i].push(false);
                }
                currentSpot++;
            }
        }
    }

    MineSweeper.determineMineSpots = function (totalSpots, numOfMines) {
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

    MineSweeper.flag = function (x, y) {
        // if x,y in MineSweeper Userboard is flag
        if (MineSweeper.userBoard[y][x] === "f") {
            MineSweeper.userBoard[y][x] = undefined;
        } else {
            MineSweeper.userBoard[y][x] = "f"
        }
    }

    MineSweeper.reveal = function (x, y) {
        //if x, y in MineSweeper Mines is a mine
        if (MineSweeper.mines[y][x]) {
            //todo handle lose
            console.log('game over');
        } else {
            MineSweeper.countMines(x, y)
        }

        // show mines game over

        // else countMines
    }

    MineSweeper.forEachAdjustent = function (x, y, matrix, callback) {
        var check = [[y, x + 1], [y, x - 1], [y + 1, x], [y + 1, x - 1], [y + 1, x + 1], [y - 1, x], [y - 1, x - 1], [y - 1, x + 1]];
        for (var i = 0; i < check.length; i++) {
            const yy = check[i][0];
            const xx = check[i][1];
            if (matrix[yy] !== undefined) {
                callback(matrix[yy][xx], xx, yy);
            }
        }
    }

    MineSweeper.countMines = function (x, y) {
        // determine how many mines border         
        // check up, right-up, right, right-down, down, down-left, left, left-up
        // leave sum at x y in UserBoard
        // if up, right-up, right, right-down, down, down-left, left, left-up does not contain mine, we need to repeat 
        var sum = 0;
        MineSweeper.forEachAdjustent(x, y, MineSweeper.mines, (val) => {
            if (val) {
                sum++;
            }
        });

        MineSweeper.userBoard[y][x] = sum;

        if (sum === 0) {
            MineSweeper.forEachAdjustent(x, y, MineSweeper.mines, (val, xx, yy) => {
                if (val === false && MineSweeper.userBoard[yy][xx] === "") {
                    MineSweeper.countMines(xx, yy)
                }
            });
        }
    }


    MineSweeper.generateMineBoard(x, y, numOfMines)
    MineSweeper.generateUserBoard(x, y)


    // console.log('mineSpots' ,determineMineSpots(100, 20))
    return MineSweeper
}
