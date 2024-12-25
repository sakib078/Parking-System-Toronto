import express from 'express';
import getPackage from './http.js';

const app = express();

app.set('port', process.env.PORT || 4242);

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.post('/submit-form', async (req, res) => {
    try {
        const data = await getPackage;
        res.send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});