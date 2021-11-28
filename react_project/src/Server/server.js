import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios'
import { Console } from 'console';

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

app.post('/movies', (req, res) => {
    fs.readFile('./JSON/movies.json', 'utf8', (err, moviesJson) => {
        if (err) {
            console.log("File read failed in GET /movies/" + req.params.id + ": "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var movies = JSON.parse(moviesJson);
        var movie = movies.find(movietmp => movietmp.id == req.params.id);
        if (!movie) {
            movies.push(req.body);
            var newList = JSON.stringify(movies);
            fs.writeFile('./JSON/movies.json', newList, err => {
                if (err) {
                    console.log("Error writing file in POST /movies: "+ err);
                    res.status(500).send('Error writing file movies.json');
                } else {
                    res.status(201).send(req.body);
                    console.log("Successfully wrote file movies.json and added new movie with id = " + req.body.id);
                }
            });
        } else {
            console.log("Movie by id = " + req.body.id + " already exists");
            res.status(500).send('Movie by id = ' + req.body.id + ' already exists');
            return;
        }
    });
});

app.put('/movies/:id', (req, res) => {
    fs.readFile('./JSON/movies.json', 'utf8', (err, moviesJson) => {
        if (err) {
            console.log("File read failed in PUT /movies/" + req.params.id+": "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var movies = JSON.parse(moviesJson);
        var movieBody = movies.find(movietmp => movietmp.id == req.body.id);
        if (movieBody && movieBody.id != req.params.id) {
            console.log("Movie by id = " + movieBody.id + " already exists");
            res.status(500).send('Movie by id = ' + movieBody.id + ' already exists');
            return;
        }
        var movie = movies.find(movietmp => movietmp.id == req.params.id);
        if (!movie) {
            movies.push(req.body);
            var newList = JSON.stringify(movies);
            fs.writeFile('./JSON/movies.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /movies/" + req.params.id+": "+err);
                    res.status(500).send('Error writing file movies.json');
                } else {
                    res.status(201).send(req.body);
                    console.log("Successfully wrote file movies.json and added new movie with id = " + req.body.movieId);
                }
            });
        } else {
            for (var i = 0; i < movies.length; i++) {
                if (movies[i].id == movie.id) {
                    movies[i] = req.body;
                }
            }
            var newList = JSON.stringify(movies);
            fs.writeFile('./JSON/movies.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /movies/" + req.params.id+": "+ err);
                    res.status(500).send('Error writing file movies.json');
                } else {
                    res.status(200).send(req.body);
                    console.log("Successfully wrote file movies.json and edit movie with old id = " + req.params.id);
                }
            });
        }
    });
});

app.delete('/movies/:id', (req, res) => {
    fs.readFile('./JSON/movies.json', 'utf8', (err, moviesJson) => {
        if (err) {
            console.log("File read failed in DELETE /movies: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var movies = JSON.parse(moviesJson);
        var movieIndex = movies.findIndex(movietmp => movietmp.id == req.params.id);
        if (movieIndex != -1) {
            movies.splice(movieIndex, 1);
            var newList = JSON.stringify(movies);
            fs.writeFile('./JSON/movies.json', newList, err => {
                if (err) {
                    console.log("Error writing file in DELETE /movies/" + req.params.id + ": " + err);
                    res.status(500).send('Error writing file movies.json');
                } else {
                    res.status(204).send();
                    console.log("Successfully deleted movie with id = " + req.params.id);
                }
            });
        } else {
            console.log("Movie by id = " + req.params.id + " does not exists");
            res.status(500).send('Movie by id = ' + req.params.id + ' does not exists');
            return;
        }
    });
});

//-----------------------SCREENINGS

app.get('/screenings', (req, res) => {
    fs.readFile('./JSON/screenings.json', 'utf8', (err, screeningsJson) => {
        if (err) {
            console.log("File read failed in GET /screenings: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        console.log("GET: /screenings");
        res.send(screeningsJson);
    });
});

app.get('/screenings/:id', (req, res) => {
    fs.readFile('./JSON/screenings.json', 'utf8', (err, screeningsJson) => {
        if (err) {
            console.log("File read failed in GET /screenings/" + req.params.id + ": "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var screenings = JSON.parse(screeningsJson);
        var screening = screenings.find(screeningtmp => screeningtmp.id == req.params.id);
        if (!screening) {
            console.log("Can't find screening with id: " + req.params.id);
            res.status(500).send('Cant find screening with id: ' + req.params.id);
            return;
        }
        var screeningJSON = JSON.stringify(screening);
        console.log("GET /screenings/" + req.params.id);
        res.send(screeningJSON);
    });
});

//-----------------------SCREENING ROOMS

app.get('/screeningRooms', (req, res) => {
    fs.readFile('./JSON/screeningRooms.json', 'utf8', (err, screeningRoomsJson) => {
        if (err) {
            console.log("File read failed in GET /screeningRooms: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        console.log("GET: /screeningRooms");
        res.send(screeningRoomsJson);
    });
});

app.get('/screeningRooms/:number', (req, res) => {
    fs.readFile('./JSON/screeningRooms.json', 'utf8', (err, screeningRoomsJson) => {
        if (err) {
            console.log("File read failed in GET /screeningRooms/" + req.params.number + ": "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var screeningRooms = JSON.parse(screeningRoomsJson);
        var screeningRoom = screeningRooms.find(screeningRoomtmp => screeningRoomtmp.number == req.params.number);
        if (!screeningRoom) {
            console.log("Can't find screeningRoom with number: " + req.params.number);
            res.status(500).send('Cant find screeningRoom with number: ' + req.params.number);
            return;
        }
        var screeningRoomJSON = JSON.stringify(screeningRoom);
        console.log("GET /screeningRooms/" + req.params.number);
        res.send(screeningRoomJSON);
    });
});

app.listen(7777, () => console.log("Server address http://localhost:7777"));