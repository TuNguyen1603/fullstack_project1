import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { resize } from '../utils'; // Adjust import based on your setup

const router = Router();

// Main route to render the index.ejs with a list of images
router.get('/', (req: Request, res: Response) => {
    const imagesDir = path.join(__dirname, '../images/full');
    const images = fs.readdirSync(imagesDir);
    res.render('index', { images });
});

// Route to resize images
router.get('/resize', async (req: Request, res: Response) => {
    try {
        const filename = req.query.filename as string;
        const height = parseInt(req.query.height as string, 10);
        const width = parseInt(req.query.width as string, 10);

        if (filename.length == 0) {
            res.status(400).send('Bad Request!');
            return;
          }
          if (!width || !height) {
            res.status(400).send('Missing width or height!');
            return;
          }
          if (!Number(width) || Number(width) <= 0) {
            res.status(400).send('Invalid width!');
            return;
          }
          if (!Number(height) || Number(height) <= 0) {
            res.status(400).send('Invalid height!');
            return;
          }

        // Ensure the thumb directory exists
        const thumbDir = path.join(__dirname, '../images/thumb');
        if (!fs.existsSync(thumbDir)) {
            await fs.promises.mkdir(thumbDir, { recursive: true });
        }

        // Resize the image and save it in the thumb directory
        await resize(filename, height, width);

        // Path to resized image
        const resizedImagePath = path.join(thumbDir, `${path.parse(filename).name}_thumb${path.extname(filename)}`);
        
        // Ensure the resized image exists
        if (!fs.existsSync(resizedImagePath)) {
             res.status(400).send('Resized image not found');
             return;
        }

        // Serve the resized image
        res.sendFile(resizedImagePath); 
    } catch (err) {
        res.status(500).send(`Error`);
    }
});

export default router;
