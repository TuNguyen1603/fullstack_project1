import path from 'path';
import fs from 'fs';

const sharp = require('sharp');

export const resize = async (
  filename: string,
  height: number,
  width: number
): Promise<void> => {
  const inputPath = path.join(__dirname, '../images/full', filename);
  const outputPath = path.join(__dirname, '../images/thumb', `${path.parse(filename).name}_thumb${path.extname(filename)}`);

  try {
    // Check if the output directory exists, if not, create it
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Resize the image
    await sharp(inputPath)
      .resize(width, height)
      .toFile(outputPath);

    console.log(`Image resized and saved to ${outputPath}`);
  } catch (err) {
    console.error(`Error resizing image: ${err}`);
    throw err;
  }
};
