// Import required modules
const fs = require('fs');
const { createCanvas } = require('canvas');
// const palette = require('palette');

// Sample array of hex colors
const hexColors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF4'];

// Function to generate swatches
function generateSwatches(hexColors, outputFile) {
  const swatchWidth = 100;  // Width of each swatch
  const swatchHeight = 100; // Height of each swatch
  const totalWidth = swatchWidth * hexColors.length;
  const canvas = createCanvas(totalWidth, swatchHeight);
  const ctx = canvas.getContext('2d');

  // Loop through the hex colors and draw them as swatches
  hexColors.forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.fillRect(index * swatchWidth, 0, swatchWidth, swatchHeight);
  });

  // Save the canvas to an image file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputFile, buffer);
  console.log(`Swatches generated and saved to ${outputFile}`);
}

// Call the function to generate swatches
generateSwatches(hexColors, 'assets/color-swatches.png');
