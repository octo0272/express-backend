const express = require('express');

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test',
  password: 'secret'
});

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/insert/:data', (req, res) => {
    const data = req.params.data;
    const query = `INSERT INTO table_1 (data) VALUE("${data}")`;

    connection.query(query, (err, result) => {
        res.send(`DB에 ${data} 넣음`);
    })
})

app.get('/db/:idx', (req, res) => {
    const idx = req.params.idx
    const query = `SELECT data FROM table_1 WHERE idx = ${idx}`;
    connection.query(query, (err, result) => {
        res.send(result);
    });
    //res.send('db');
})

app.listen(3000);