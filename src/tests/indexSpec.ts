import fs from 'fs';
import path from 'path';
import app from '../api/api';
import { resize } from '../utils';

const supertest = require('supertest');
const request = supertest(app);

describe('Image Resize Parameters width height parameter', () => {
  it('It should return 400 if image width and height parameter are not presented, please help us provide high and width', async () => {
    const response = request.get('/resize?filename=fjord.jpg');
  });
  it('It should return 400 if image parameters height or width are not a number, please help us provide number for high and width', async () => {
    const response = request.get('/resize?filename=fjord&width=a&height=b');
  });
  it('Return true if image is cached successfully', async (): Promise<any> => {
    const resizedFilePath = path.join(__dirname, `../images/fjord-300-300.jpg`);

    // Ensure the file does not exist before the function call
    if (fs.existsSync(resizedFilePath)) {
      fs.unlinkSync(resizedFilePath);
    }
    // Call the function that resizes the image and generates the file
    resize('fjord', 200, 200)
      .then((resolve) => {
        expect(fs.existsSync(resizedFilePath)).toBeTrue();
        return true;
      })
      //Error in function
      .catch((error) => {
        expect(fs.existsSync(resizedFilePath)).toBeTrue();
        return false;
      });
    // Check if the file exists after the function call
  });
});
