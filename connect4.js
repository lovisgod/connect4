// This helps to declare a class which we are going to be using in the connect.js module

class Connect4 {
    constructor(selector) {
        this.ROWS = 6;
        this.COL = 7;
        this.player = 'red';
        this.isGameOver = false;
        this.selector = selector;
        this.onPlayerMove = function (){};  
        this.createGrid(); 
        this.setUpEventListener();
        this.check4winner();
    }
createGrid(){
    const board = $(this.selector);
    board.empty();
    this.isGameOver = false;
    this.player = 'red';
    this.onPlayerMove();
    // create board rows
    for(let row = 0 ; row<this.ROWS; row++){
        const $row = $('<div>').addClass('row'); //create an a div element with class row

        //for each of the rows, create a column too 
        for (let col = 0; col<this.COL; col++){
            const $col = $('<div>')
            .addClass('col empty')
            .attr('data-col',col)
            .attr('data-row', row);
            $row.append($col); //append columns to each rows 
             
        }
        board.append($row); //add the row element to the board element which is the selector
    }
}

//this method set up an event listener on the board div
setUpEventListener(){
    const board = $(this.selector); //get the board div
    const that = this; // this gives us access to original this (the main this property of the consturctor)

    // here we want to check to each coumn and find the empty column
    function findLastEmptyCell(col){
        // this function helps us to get elements with class col and has the same attribute data col
        const cells = $(`.col[data-col ='${col}']`); 
        for (let i = cells.length-1; i>= 0; i--){
            const cell = $(cells[i]);
            if (cell.hasClass('empty')){
                return cell;
            }
        }
        return null;
    }

    // this checks the element on which mouse hovers and performs a function on the element
    board.on('mouseenter', '.col.empty', function() {
        if(that.isGameOver) return;
        const col = $(this).data('col');
        const $lastEmptyCell = findLastEmptyCell(col);
        $lastEmptyCell.addClass(`next-${that.player}`); //here we add a class that changes the color to red to the returned cell from findlastempty cell function
    });

    board.on('mouseleave','.col', function(){
        $('.col').removeClass(`next-${that.player}`);
    });

    board.on('click', '.col', function () { 
        if (that.isGameOver) return;
        const col = $(this).data('col');
        // const row = $(this).data('row');
        const $lastEmptyCell = findLastEmptyCell(col);
        $lastEmptyCell.removeClass(`empty next-${that.player}`);
        $lastEmptyCell.addClass(that.player);
        $lastEmptyCell.data('player', that.player);
        const winner = that.check4winner($lastEmptyCell.data('row'), $lastEmptyCell.data('col')); 
        if (winner){
            that.isGameOver = true;
            alert(`game over! player ${that.player} has won`);
            $('.col.empty').removeClass('empty');
            return;
        }
    
        that.player = (that.player === 'red')? 'black' : 'red';
        that.onPlayerMove();
        $(this).trigger('mouseenter');
     });
}

check4winner(row, col){
    const that = this;

    function getCell(i,j){
        return $(`.col[data-row='${i}'][data-col='${j}']`);
    }

    function checkDirection (direction){
        let total = 0;
        let i = row + direction.i;
        let j = col + direction.j;
        let $next  = getCell(i, j);
        while(i>=0 && i< that.ROWS && j>= 0 && j < that.COL && $next.data('player')=== that.player){
            total++;
            i += direction.i;
            j += direction.j;
            $next = getCell(i, j);
        }

        return total;
    }
    function checkWin(directionA, directionB){
        const total = 1 + 
            checkDirection(directionA) +
            checkDirection(directionB);

            if (total>= 4) {
                return that.player;
            } else {
                return null; 
            }
    }

    function checkDiagonalBltoTr(){
        return checkWin({i:1, j:-1}, {i:1,j:1}); //this checks diagonal in the bottom to top left to right directions
    }

    function checkDiagonalTltoBr(){
        return checkWin({i:1, j:-1}, {i:1,j:1}); //this checks diagonal in the top to bottom left to right directions
    }

    function checkVerticals () {
        return checkWin({i:-1, j:0}, {i:1, j:0}); //the first params is the up direction while the second params is down direction 
    }

    function checkHorizontals () {
        return checkWin({i:0, j:-1}, {i:0, j:1}); //the first params is the up left while the second params is right direction 
    }
    return checkVerticals() || checkHorizontals() || checkDiagonalBltoTr() || checkDiagonalTltoBr();  
}

restart(){
    this.createGrid();
}

}   