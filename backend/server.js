import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const app = express();
const PORT = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.join(__dirname, '../frontend')));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
