//Declare the variable img2
let img2;

//Create a constructor function called ImgTool
function ImgTool() {
  //Set the icon and name properties
  this.icon = "assets/Img-Tool.png";
  this.name = "img";
	
  //Initialise variables
  var previousMouseX = -1;
  var previousMouseY = -1;
  var FirstMouseX = -1;
  var FirstMouseY = -1;
  var dropbox = null;
  var rWidth = 1;
  var rLength = 1;
  var nodes = [];
  var resizing = false;
  var rot = 0;
  var rotating = false;
  var capture = false;

  //Create the draw() function
  this.draw = function () {
    //If the mouse is not pressed, set resizing and rotating to false
    if (!mouseIsPressed) {
      resizing = false;
      rotating = false;
    }
    if (mouseIsPressed) {
      //check if previousX and Y are -1
      //if yes, set them to the current mouseX and Y
      if (previousMouseX == -1) {
        previousMouseX = mouseX;
        previousMouseY = mouseY;
        firstMouseX = mouseX;
        firstMouseY = mouseY;
      } else {
        //Erase the previous rectangle
        updatePixels();
		//Calculate the new rectangle width and length
        rWidth = mouseX - firstMouseX;
        rLength = mouseY - firstMouseY;
		 //If img2 is not null
        if (img2) {
		  //If rWidth or rLength are 0, set them to 1
          if (rWidth == 0 || rLength == 0) {
            rWidth = 1;
            rLength = 1;
          }
          noFill();
		  //If the nodes array has less than 4 items, add the initial nodes to it
          if (nodes.length < 4) {
            nodes[0] = { x: firstMouseX, y: firstMouseY };
            nodes[1] = { x: firstMouseX + rWidth, y: firstMouseY };
            nodes[2] = { x: firstMouseX + rWidth, y: firstMouseY + rLength };
            nodes[3] = { x: firstMouseX, y: firstMouseY + rLength };
          }
		  // If the mouse is near the bottom right node, set resizing to true
          if (dist(mouseX, mouseY, nodes[2].x, nodes[2].y) < 10 && !rotating) {
            resizing = true;
          }
		  // If the mouse is near the bottom center node, set rotating to true
          if (
            dist(
              mouseX,
              mouseY,
              nodes[2].x - (nodes[2].x - nodes[0].x) / 2,
              nodes[2].y + 10
            ) < 10 &&
            abs(nodes[2].x - nodes[0].x) > 40 &&
            !resizing
          ) {
            rotating = true;
          }

		  //If resizing is true, update the nodes positions
          if (resizing) {
            nodes[2] = { x: firstMouseX + rWidth, y: firstMouseY + rLength };
            nodes[3] = { x: firstMouseX, y: firstMouseY + rLength };
          }
          if (rotating) {
            rot -= map(mouseX, previousMouseX, width, 0, 10);
          }
          push();  // push the current transformation matrix onto the stack
          translate(
            nodes[0].x + (nodes[2].x - nodes[0].x) / 2, // move the origin to the center of the image
            nodes[0].y + (nodes[2].y - nodes[0].y) / 2
          );
          rotate(rot);
          image(
            img2,
            -(nodes[2].x - nodes[0].x) / 2,
            -(nodes[2].y - nodes[0].y) / 2,
            nodes[2].x - nodes[0].x,
            nodes[2].y - nodes[0].y
          );
          pop(); // pop the last transformation matrix off the stack

          fill(80);
		  // if the image is not being rotated or resized
          if (!rotating && !resizing) { 
            capture = true; // set the flag to capture the canvas pixels
          }
	      // if the canvas pixels have already been captured
          if (!capture) {
			// draw a circle at the bottom right corner of the image
            circle(nodes[2].x, nodes[2].y, 10);
            circle(
              nodes[2].x - (nodes[2].x - nodes[0].x) / 2,
              nodes[2].y + 10,
              10
            );
          } else {  // if the canvas pixels need to be captured
            loadPixels();
            nodes = []; // clear the nodes array
            capture = false;
            rot = 0; // reset the rotation angle
          }

          beginShape();
          for (let i = 0; i < nodes.length; i++) {
            // vertex(nodes[i].x, nodes[i].y);
          }

          endShape();
        }

        previousMouseX = mouseX;
        previousMouseY = mouseY;
      }
    } else {
      previousMouseX = -1;
      previousMouseY = -1;
      //save the canvas pixels
      // loadPixels();
    }
  };
  let img1;
  //call when the tool icon is selected
  this.populateOptions = function () {
    dropbox = createFileInput(handleFile);
    dropbox.parent("#options");
  };

  //clear the Filled Unfilled dropbox option when other tools are selected

  this.unselectTool = function () {
    dropbox.remove();
  };
}

function handleFile(file) {
  console.log(file);
  if (file.type === "image") {
    img2 = loadImage(file.data, function () {});
  } else {
  }
}
