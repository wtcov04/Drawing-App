let history = [];
let redoHistory = [];

function HelperFunctions() {

	//p5.dom click click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {
		background(255);

		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();
	});

	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function() {
        let x = createCanvas(100, 100);
		saveCanvas(x, 'myDrawing', 'jpg');
	});
	
	// event handler for the undo button
	select("#undoButton").mouseClicked(function() {
		// get the previous drawing state from the history array
        if (history.length > 1) {
			redoHistory.push(history.pop()); // remove the current state from the history array
			background(255); // clear the canvas
			image(history[history.length-1], 0, 0); // draw the previous state on the canvas
		}
	});
	
	select("#redoButton").mouseClicked(function() {
		if (redoHistory.length > 0) {
			let currentDrawing = get(); // get the current drawing state
			history.push(currentDrawing); // add the current state to the history array
			let previousRedoDrawing = redoHistory.pop(); // get the previous redo state from the redoHistory array
			history.push(previousRedoDrawing); // add the previous redo state to the history array
			background(255); // clear the canvas
			image(previousRedoDrawing, 0, 0); // draw the previous redo state on the canvas
		}
	});
}
