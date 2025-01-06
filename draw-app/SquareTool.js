function SquareTool(){
    //set an icon and a name for the object
    this.icon = "assets/Square.png";
    this.name = "fill";
    
    //to draw a square, we'll store the starting location of the square
    //when the user clicks the mouse.
    var startX = -1;
    var startY = -1;

    this.draw = function(){
        //if the mouse is pressed
        if(mouseIsPressed){
            //check if startX and startY are -1. If so, set them to the current
            //mouse X and Y if they are.
            if (startX == -1){
                startX = mouseX;
                startY = mouseY;
                // Save the current canvas state to history
                history.push(get());
            }
            //if we already have values for startX and startY we can draw a square from 
            //the starting location to the current mouse location
            else{
                rect(startX, startY, mouseX-startX, mouseY-startY);
            }
        }
        //if the user has released the mouse we want to set the startX and startY values 
        //back to -1.
        else{
            startX = -1;
            startY = -1;
        }
    }
    
    // Called when this tool is unselected
    this.unselectTool = function() {
        // Remove the options area contents
        select('#options').html('');
    };

    // Called when the undo button is clicked
    this.undo = function() {
        // Check if the history array has any previous states
        if (history.length > 1) {
            // Remove the current state from history and add it to the redo history
            redoHistory.push(history.pop());
            // Get the previous state from history
            let previousState = history[history.length-1];
            // Set the canvas to the previous state
            background(255);
            image(previousState, 0, 0);
        }
    }
}