// app.js

// Environnement variables
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send({
        "message": "Hello, World!"
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});