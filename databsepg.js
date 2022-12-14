import Client from 'pg/lib/client.js'
import Connection from 'pg/lib/connection.js'
// import Pool from 'pg-pool'
import defaults from 'pg/lib/defaults.js'
// import types from 'pg-types'

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password : 'root',
    port: 5432,
});

client.connect().then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log('Error connecting to database');
    console.log(err);
});

//create table if not exists 
client.query('CREATE TABLE IF NOT EXISTS test (id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)').then(() => {
    console.log('Table created');
}).catch((err) => {
    console.log('Error creating table');
    console.log(err);
});

//insert into table
client.query('INSERT INTO test(text, complete) values($1, $2)', ['hello world', false]).then(() => {
    console.log('Data inserted');
}).catch((err) => {
    console.log('Error inserting data');
    console.log(err);
});



export default client;