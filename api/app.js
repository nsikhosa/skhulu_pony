const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');

const app = express();

app.use(morgan('short'));

app.listen(3000, () => {
    console.log("Server is listening on port 3000...");
});

app.get('/songs/:id', (req, res) => {
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        database: 'skhulu'
    })

    const userId = req.params.id;
    const queryString = "SELECT * FROM songs WHERE song_id = ?";
    connection.query(queryString, [userId], (err, rows, fields) => {
        
        if (err) {
            res.sendStatus(500);
            return;
        }
        else {
            console.log("success!");
            res.json(rows);
        }
    })
})