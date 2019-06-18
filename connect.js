 
$(document).ready(function(){
    
    // TODO: draw a grid

    //create a new instance of connect4 class
    const connect4 = new Connect4('#connect4');

    connect4.onPlayerMove = function() {
        $('#player').text(connect4.player);
    }

   $('#restart').click(function (e) { 
        e.preventDefault();
        connect4.createGrid();
        
    });
});