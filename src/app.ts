import express from 'express';
import path from 'path';
import apiRoutes from './api/api';

const app = express();
const port = 3000;

// Set the views directory and the view engine
app.set('views', path.join(__dirname, '../src/view'));
app.set('view engine', 'ejs');

// Serve static files from the images directory
app.use('/images/full', express.static(path.join(__dirname, 'images/full')));
app.use('/images/thumb', express.static(path.join(__dirname, 'images/thumb')));

// Use the route from api.ts
app.use('/', apiRoutes); 

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


