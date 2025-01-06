function EraserTool() {
  //set an icon and a name for the object
  this.icon = "assets/eraser.png";
  this.name = "eraser";

  //to smoothly erase we'll draw a white line that is the same thickness
  //as the brush over the top of the canvas.
  var erasing = false;
  var previousMouseX = -1;
  var previousMouseY = -1;

  this.draw = function() {
    if (mouseIsPressed) {
      // start erasing
      if (!erasing) {
        // turn off stroke and turn on erase
        stroke(255);
        erasing = true;
      }

      // erase
      line(mouseX, mouseY, pmouseX, pmouseY);

      // update previous positions
      previousMouseX = mouseX;
      previousMouseY = mouseY;
    } else {
      // stop erasing
      if (erasing) {
        // turn on stroke and turn off erase
        loadCurrentSettings();
        erasing = false;
      }

      // reset previous positions
      previousMouseX = -1;
      previousMouseY = -1;
    }
  };

  // helper function to load the current brush settings
  function loadCurrentSettings() {
    stroke(toolbox.currentColour);
    strokeWeight(toolbox.currentThickness);
    strokeCap(ROUND);
  }

  // update the tool settings when selected
  this.onSelect = function() {
    loadCurrentSettings();
  };
}