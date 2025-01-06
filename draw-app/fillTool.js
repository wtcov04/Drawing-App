function FillTool() {
  //set an icon and a name for the object
  this.icon = "assets/fill.png";
  this.name = "floodfill";
	
  function getPixelColor(x, y) {
	  //make sure x and y are within the bounds of the canvas
	  if(x < 0 || x >= width || y < 0 || y >= height) {
		  //return null if the pixel is out of bounds
          return null;
	  }
	  //get the index of the pixel in the pixels array
      var index = (x + y * width) * 4;
      //return the color of the pixel as an array [r, g, b, a]
      return [pixels[index], pixels[index+1], pixels[index+2], pixels[index+3]];
  }

  // helper function to check if two colors are the same
  function colorsMatch(color1, color2) {
	  return color1[0] === color2[0] && color1[1] === color2[1] && color1[2] === color2[2] && color1[3] === color2[3];
  }
	
  this.draw = function() {
	  //if the mouse is pressed
	  if(mouseIsPressed) {
		  //get the color of the pixel at the current mouse location
		  var targetColor = getPixelColor(mouseX, mouseY);

          //create an array to keep track of which pixels we've already visited
          var visitedPixels = new Array(width);
          for (var i = 0; i < visitedPixels.length; i++) {
			  visitedPixels[i] = new Array(height);
			  for (var j = 0; j < visitedPixels[i].length; j++) {
				  visitedPixels[i][j] = false;
			  }
		  }

          //create a queue to hold the pixels we still need to visit
		  var pixelsToVisit = [];

          //add the current mouse location to the queue
          pixelsToVisit.push([mouseX, mouseY]);
		  
		  //while there are still pixels to visit
		  while(pixelsToVisit.length > 0) {
			  //get the next pixel from the queue
			  var currentPixel = pixelsToVisit.pop();
			  var x = currentPixel[0];
			  var y = currentPixel[1];
			  
			  //if we haven't visited this pixel before and it's the same color as the target color
			  if(!visitedPixels[x][y] && colorsMatch(getPixelColor(x, y), targetColor)) {
				  //set the color of the pixel to the fill color
				  set(x, y, fillColor);
				  
				  //mark the pixel as visited
                  visitedPixels[x][y] = true;

                  //add all the neighboring pixels to the queue
                  pixelsToVisit.push([x+1, y]);
                  pixelsToVisit.push([x-1, y]);
                  pixelsToVisit.push([x, y+1]);
                  pixelsToVisit.push([x, y-1]);
			  }
		  }
		  //update the canvas with the new colors
          loadPixels(); // add this line
		  updatePixels();
	  }
  };

  // set the fill color
  var fillColor = color(255, 0, 0);
  this.setFillColor = function(color) {
    fillColor = color;
  };
}