require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const mysql = require('mysql')

const hostname = 'localhost';
const port = process.env.PORT;


const connection = mysql.createConnection({
    host        : process.env.DB_HOST,
    user        : process.env.DB_USER,
    password    : process.env.DB_PASS,
    database    : process.env.DB_NAME
})

const

/* request to default route */
app.get('/', (req, res) => {
    console.log('getting root route');
    res.send("Hello from down under")
})

/* request to get amout of players online */
app.get('/players/online', (req, res) => {
    console.log('getting the amount of players online!');
    connection
    const queryString = 'SELECT COUNT(*) FROM accounts WHERE loggedin = 2';
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log('failed to query online players: ' + err);
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

/* request to get amount of created accounts */
app.get('/players/accounts', (req, res) => {
    console.log('getting amount of accounts created!');
    connection
    const queryString = 'SELECT COUNT(*) FROM accounts';
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log('failed to query accounts: ' + err);
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

/* request to get amount of characters created */
app.get('/characters/created', (req, res) => {
    console.log('getting amount of characters created');
    connection
    const queryString = 'SELECT COUNT(*) FROM characters'
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log('failed to query characters: ' + err);
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

app.listen(port, hostname, ()=> {
    console.log(`server is running at http://${hostname}:${port}/`);
})
