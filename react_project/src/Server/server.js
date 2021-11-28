import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios'

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send('Server root');
});

//-----------------------MOVIES

app.get('/movies', (req, res) => {
    fs.readFile('./JSON/movies.json', 'utf8', (err, moviesJson) => {
        if (err) {
            console.log("File read failed in GET /movies: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        console.log("GET: /movies");
        res.send(moviesJson);
    });
});

app.get('/movies/:id', (req, res) => {
    fs.readFile('./JSON/movies.json', 'utf8', (err, moviesJson) => {
        if (err) {
            console.log("File read failed in GET /movies/" + req.params.id + ": "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var movies = JSON.parse(moviesJson);
        var movie = movies.find(movietmp => movietmp.id == req.params.id);
        if (!movie) {
            console.log("Can't find movie with id: " + req.params.id);
            res.status(500).send('Cant find movie with id: ' + req.params.id);
            return;
        }
        var movieJSON = JSON.stringify(movie);
        console.log("GET /movies/" + req.params.id);
        res.send(movieJSON);
    });
});

app.listen(7777, () => console.log("Server address http://localhost:7777"));