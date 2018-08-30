
function mineSweeper() {
    var MineSweeper = {};
    MineSweeper.mines = [];
    
    var generateMineBoard = function(x, y, numOfMines) {
        mineSpots = determineMineSpots(x*y, numOfMines);
        console.log('minespots', mineSpots )

        var currentSpot = 0;
        for (var i = 0; i < y; i++) {
            MineSweeper.mines.push([]);
            for (var j = 0; j < x; j++ ) {
                console.log('current', currentSpot)
                if (mineSpots.includes(currentSpot)) {
                    MineSweeper.mines[i].push(true);
                } else {
                    MineSweeper.mines[i].push(false);
                }
                currentSpot++;
            }
        }
    }

    var determineMineSpots = function(totalSpots, numOfMines) {
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
    generateMineBoard(10, 10, 10) 
    // console.log('mineSpots' ,determineMineSpots(100, 20))
    console.log(MineSweeper.mines)

    return MineSweeper
}

mineSweeper()