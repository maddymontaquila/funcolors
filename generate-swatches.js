// Import required modules
const fs = require('fs');
const { createCanvas } = require('canvas');
const path = require('path');

// Path to the FunColor.cs file
const csFilePath = path.join(__dirname, 'FunColor.cs');

// Regex to extract color names and hex values from FunColor.cs
const hexPattern = /(\w+)\s*=>\s*Color\.FromUint\(0x([A-Fa-f0-9]{8})\);/g;

// Sample array of hex colors
const hexColors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF4'];

// Function to parse FunColor.cs and extract colors
function extractColorsFromCsFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const colors = {};
    let match;

    // Match all colors in the FunColor.cs file
    while ((match = hexPattern.exec(fileContent)) !== null) {
        const colorName = match[1];
        const hexValue = match[2];
        // Convert ARGB (0xAARRGGBB) to RGB hex format (#RRGGBB)
        const rgbHex = `#${hexValue.slice(2)}`; // Slice to skip the alpha channel
        colors[colorName] = rgbHex;
    }

    return colors;
}

// Function to generate swatches
function generateSwatches(hexColors, outputFile) {
    const colorNames = Object.keys(colors);
    const swatchWidth = 150;  // Width of each swatch
    const swatchHeight = 150; // Height of each swatch
    const padding = 20; // Padding between swatches
    const totalWidth = (swatchWidth + padding) * colorNames.length;
    const canvas = createCanvas(totalWidth, swatchHeight + 50); // Add extra space for color name text
    const ctx = canvas.getContext('2d');

    ctx.font = '18px Arial';
    ctx.textAlign = 'center';

    // Loop through the colors and draw them as swatches
    colorNames.forEach((colorName, index) => {
        const colorHex = colors[colorName];
        const x = index * (swatchWidth + padding);
        
        // Draw the color swatch
        ctx.fillStyle = colorHex;
        ctx.fillRect(x, 0, swatchWidth, swatchHeight);

        // Draw the color name below the swatch
        ctx.fillStyle = '#000';
        ctx.fillText(colorName, x + swatchWidth / 2, swatchHeight + 25);
    });

    // Save the canvas to an image file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputFile, buffer);
    console.log(`Swatches generated and saved to ${outputFile}`);
}

// Call the function to generate swatches
const colors = extractColorsFromCsFile(csFilePath);
generateSwatches(colors, 'assets/color-swatches.png');
