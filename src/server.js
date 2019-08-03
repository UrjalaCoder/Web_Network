import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dataHandler from './dataHandler';

const app = express();

app.use(bodyParser.json());
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// Index route.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/data', (req, res) => {
    dataHandler(req.body).then(data => {
        res.send(data);
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started at port 3000');
});
