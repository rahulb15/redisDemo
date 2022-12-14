import express from 'express';
import bodyParser from "body-parser";
import redis from 'redis';
import { createClient } from 'redis';
import database from './databsepg.js';

const app = express();
const port = 3000;

const client = createClient({
    host: '127.0.0.1',
    port: 6379,
});

//redis client connection check
(async () => {
    await client.connect();
})();

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.post('/set', async (req, res) => {
    await client.set('key', req.body.value);
    res.send('OK');
});

app.get('/get', async (req, res) => {
    const value = await client.get('key');
    res.send(value);
});





app.get('/del', async (req, res) => {
    await client.del('key');
    res.send('OK');
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);




