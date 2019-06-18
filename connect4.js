// This helps to declare a class which we are going to be using in the connect.js module

class Connect4 {
    constructor(selector) {
        this.ROWS = 6;
        this.COL = 7;
        this.selector = selector;
        this.createGrid(); 
    }
createGrid(){
    const board = $(this.selector);
    console.log(board);
    // create board rows
    for(let row = 0 ; row<this.ROWS; row++){
        const row = $('<div>').addClass('row'); //create an a div element with class row

        //for each of the rows, create a column too 
        for (let col = 0; col<this.COL; col++){
            const col = $('<div>').addClass('col empty');
            row.append(col); //append columns to each rows 
             
        }
        board.append(row); //add the row element to the board element which is the selector
    }

    console.log(board.html());
}

}