function LineToTool() {
	//This implements the line image to the drawing app
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";

	//Creating variables that contains values
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	this.draw = function () {
		if (mouseIsPressed) {
			if (startMouseX == -1) {
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				loadPixels(); //Saves the progress so that it will not be reset when drawing another line
			} else {
				//Updates the pixels of the line when the cursor is moving so that multiple line will not appear
				updatePixels();
				line(startMouseX, startMouseY, mouseX, mouseY);
			}
		} else if (drawing) {
			// save the current drawing state to the history array
			history.push(get());
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};

	this.undo = function () {
		if (history.length > 1) {
			redoHistory.push(history.pop()); // add the current state to the redoHistory array
			background(255); // clear the canvas
			image(history[history.length - 1], 0, 0); // draw the previous state on the canvas
		}
	};

	this.redo = function () {
		if (redoHistory.length > 0) {
			let currentDrawing = get(); // get the current drawing state
			history.push(currentDrawing); // add the current state to the history array
			let previousRedoDrawing = redoHistory.pop(); // get the previous redo state from the redoHistory array
			history.push(previousRedoDrawing); // add the previous redo state to the history array
			background(255); // clear the canvas
			image(previousRedoDrawing, 0, 0); // draw the previous redo state on the canvas
		}
	};
}