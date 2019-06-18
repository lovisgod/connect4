// This helps to declare a class which we are going to be using in the connect.js module

class Connect4 {
    constructor(selector) {
        this.ROWS = 6;
        this.COL = 7;
        this.selector = selector;
        this.createGrid(); 
        this.setUpEventListener();
    }
createGrid(){
    const board = $(this.selector);
    console.log(board);
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
        console.log(cells);
    }

    // this checks the element on which mouse hovers and performs a function on the element
    board.on('mouseenter', '.col.empty', function() {
        const col = $(this).data('col');
        const $lastEmptyCell = findLastEmptyCell(col);
        $lastEmptyCell.addClass(`next-red`); //here we add a class that changes the color to red to the returned cell from findlastempty cell function
        console.log('col:'+col);
    });

    board.on('mouseleave','.col', function(){
        $('.col').removeClass(`next-red`);
    })
}

} 