mineSweeperPlayer = (x,y, numOfMines) => {
    var MineSweeperPlayer = {}

    MineSweeperPlayer.startGame = () =>  {
        MineSweeperPlayer.Minesweeper = mineSweeper(x,y, numOfMines);
        MineSweeperPlayer.addBoard(x, y);

    }


    MineSweeperPlayer.addBoard = (x,y) => {
        var $board = document.body.getElementsByClassName('board')[0];
        for (var i = 0; i < y; i ++) {
            var $row = document.createElement("div");
            $row.setAttribute('class', 'row');
            $row.setAttribute('y', i);
            $board.appendChild($row)
            for (var j = 0; j < x; j++) {
                var $square = document.createElement("div");
                $square.setAttribute('class', 'square');
                $square.setAttribute('y', i);
                $square.setAttribute('x', j);
                $square.addEventListener("click",(e)=>{
                    var x = parseInt(e.srcElement.attributes.x.value, 10);
                    var y = parseInt(e.srcElement.attributes.y.value, 10);
                    console.log('you clicked', x,y );
                    MineSweeperPlayer.Minesweeper.reveal(x,y);
                    MineSweeperPlayer.updateBoard()
                })
                $square.addEventListener("contextmenu", (e)=>{
                    var x = e.srcElement.attributes.x.value;
                    var y = e.srcElement.attributes.y.value;
                    console.log('you right clicked', x,y );
                    MineSweeperPlayer.Minesweeper.flag(x,y);
                    MineSweeperPlayer.updateBoard()
                })
                $row.appendChild($square)
            }
        }
        
    }

    MineSweeperPlayer.updateBoard = () => {
        var board = MineSweeperPlayer.Minesweeper.userBoard;
        var $rows = document.body.getElementsByClassName("row")
        for (var i = 0; i < $rows.length; i++) {
            var $row = $rows[i]
            for (var j = 0; j < $row.childNodes.length; j++) {
                var $square = $row.childNodes[j];
                $square.innerHTML= board[i][j]  
            }
        }
        if (MineSweeperPlayer.Minesweeper.playing === false) { 
            var $board = document.body.getElementsByClassName('board')[0];
            var $lost = document.createElement("h1");
            $lost.innerHTML = 'GAME OVER';
            $board.appendChild($lost);
        }
    }

    MineSweeperPlayer.startGame(x,y, numOfMines);

}



window.addEventListener("load", mineSweeperPlayer(40, 20, 90));


