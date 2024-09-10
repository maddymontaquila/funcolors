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

// Helper function to truncate long text and add ellipses
function truncateText(ctx, text, maxWidth) {
    if (ctx.measureText(text).width <= maxWidth) {
        return text;
    }
    while (ctx.measureText(text + '…').width > maxWidth) {
        text = text.slice(0, -1);
    }
    return text + '…';
}

// Function to generate swatches
function generateSwatches(hexColors, outputFile) {
    const colorNames = Object.keys(colors).sort(); // Sort color names alphabetically
    const swatchRadius = 36;  // Radius of each round swatch
    const swatchDiameter = swatchRadius * 2;
    const padding = 20; // Padding between swatches
    const verticalPadding = 32; // Vertical padding between rows
    const maxPerRow = 5; // Maximum swatches per row
    const numRows = Math.ceil(colorNames.length / maxPerRow); // Calculate the number of rows

    const totalWidth = (swatchDiameter + padding) * maxPerRow - padding; // Adjust total width for padding
    const totalHeight = (swatchDiameter + verticalPadding) * numRows + 50; // Add extra height for text and vertical padding

    const canvas = createCanvas(totalWidth, totalHeight);
    const ctx = canvas.getContext('2d');

    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    // Loop through the colors and draw them as round swatches
    colorNames.forEach((colorName, index) => {
        const colorHex = colors[colorName];
        const row = Math.floor(index / maxPerRow); // Determine current row
        const col = index % maxPerRow; // Determine current column
        const x = col * (swatchDiameter + padding) + swatchRadius; // X position (center of circle)
        const y = row * (swatchDiameter + verticalPadding) + swatchRadius; // Y position (center of circle)

        // Draw the round color swatch
        ctx.beginPath();
        ctx.arc(x, y, swatchRadius, 0, Math.PI * 2);
        ctx.fillStyle = colorHex;
        ctx.fill();
        ctx.closePath();

        // Truncate the color name if it's too long
        const truncatedName = truncateText(ctx, colorName, swatchDiameter);

        // Draw the truncated color name below the swatch
        ctx.fillStyle = '#000';
        ctx.fillText(truncatedName, x, y + swatchRadius + 25);
    });

    // Save the canvas to an image file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputFile, buffer);
    console.log(`Swatches generated and saved to ${outputFile}`);
}

// Call the function to generate swatches
const colors = extractColorsFromCsFile(csFilePath);
generateSwatches(colors, 'assets/color-swatches.png');
