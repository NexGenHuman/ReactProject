import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import movieValidator from './Validators/movieValidator.js';
import screeningValidator from './Validators/screeningValidator.js';
import screeningRoomValidator from './Validators/screeningRoomValidator.js';
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
            console.log("File read failed in GET /movies: " + err);
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
            console.log("File read failed in GET /movies/" + req.params.id + ": " + err);
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
    if (movieValidator(req.body)) {
        fs.readFile('./JSON/movies.json', 'utf8', (err, moviesJson) => {
            if (err) {
                console.log("File read failed in GET /movies/" + req.params.id + ": " + err);
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
                        console.log("Error writing file in POST /movies: " + err);
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
    } else {
        console.log("Movies POST body does not meet validator requirements");
        res.status(400).send('Movies POST body does not meet validator requirements');
        return;
    }
});

app.put('/movies/:id', (req, res) => {
    if (movieValidator(req.body)) {
        fs.readFile('./JSON/movies.json', 'utf8', (err, moviesJson) => {
            if (err) {
                console.log("File read failed in PUT /movies/" + req.params.id + ": " + err);
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
                        console.log("Error writing file in PUT /movies/" + req.params.id + ": " + err);
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
                        console.log("Error writing file in PUT /movies/" + req.params.id + ": " + err);
                        res.status(500).send('Error writing file movies.json');
                    } else {
                        res.status(200).send(req.body);
                        console.log("Successfully wrote file movies.json and edit movie with old id = " + req.params.id);
                    }
                });
            }
        });
    } else {
        console.log("Movies PUT body does not meet validator requirements");
        res.status(400).send('Movies PUT body does not meet validator requirements');
        return;
    }
});

app.delete('/movies/:id', (req, res) => {
    fs.readFile('./JSON/movies.json', 'utf8', (err, moviesJson) => {
        if (err) {
            console.log("File read failed in DELETE /movies: " + err);
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
                    //res.status(500).send('Error writing file movies.json');
                } else {
                    //res.status(204).send();
                    console.log("Successfully deleted movie with id = " + req.params.id);
                }
            });
        } else {
            console.log("Movie by id = " + req.params.id + " does not exists");
            res.status(500).send('Movie by id = ' + req.params.id + ' does not exists');
            return;
        }
    });

    fs.readFile('./JSON/screenings.json', 'utf8', (err, screeningsJson) => {
        if (err) {
            console.log("File read failed in DELETE /screenings: " + err);
            res.status(500).send('File read failed');
            return;
        }
        var screenings = JSON.parse(screeningsJson);

        let i = screenings.length - 1;
        while (i >= 0) {
            if (screenings[i].movieID == req.params.id) {
                screenings.splice(i, 1);
            }
            i--;
        }

        var newList = JSON.stringify(screenings);
        fs.writeFile('./JSON/screenings.json', newList, err => {
            if (err) {
                console.log("Error writing file in DELETE /screenings/" + req.params.id + ": " + err);
                res.status(500).send('Error writing file screenings.json');
            } else {
                res.status(204).send();
                console.log("Successfully deleted screenings with movie id = " + req.params.id);
            }
        });
    });
});

//-----------------------SCREENINGS

app.get('/screenings', (req, res) => {
    fs.readFile('./JSON/screenings.json', 'utf8', (err, screeningsJson) => {
        if (err) {
            console.log("File read failed in GET /screenings: " + err);
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
            console.log("File read failed in GET /screenings/" + req.params.id + ": " + err);
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

app.post('/screenings', (req, res) => {
    if (screeningValidator(req.body)) {
        fs.readFile('./JSON/screenings.json', 'utf8', (err, screeningsJson) => {
            if (err) {
                console.log("File read failed in GET /screenings/" + req.params.id + ": " + err);
                res.status(500).send('File read failed');
                return;
            }
            var screenings = JSON.parse(screeningsJson);
            var screening = screenings.find(screeningtmp => screeningtmp.id == req.params.id);
            if (!screening) {
                screenings.push(req.body);
                var newList = JSON.stringify(screenings);
                fs.writeFile('./JSON/screenings.json', newList, err => {
                    if (err) {
                        console.log("Error writing file in POST /screenings: " + err);
                        res.status(500).send('Error writing file screenings.json');
                    } else {
                        res.status(201).send(req.body);
                        console.log("Successfully wrote file screenings.json and added new screening with id = " + req.body.id);
                    }
                });
            } else {
                console.log("Screening by id = " + req.body.id + " already exists");
                res.status(500).send('Screening by id = ' + req.body.id + ' already exists');
                return;
            }
        });
    } else {
        console.log("Screenings POST body does not meet validator requirements");
        res.status(400).send('Screenings POST body does not meet validator requirements');
        return;
    }
});

app.put('/screenings/:id', (req, res) => {
    if (screeningValidator(req.body)) {
        fs.readFile('./JSON/screenings.json', 'utf8', (err, screeningsJson) => {
            if (err) {
                console.log("File read failed in PUT /screenings/" + req.params.id + ": " + err);
                res.status(500).send('File read failed');
                return;
            }
            var screenings = JSON.parse(screeningsJson);
            var screeningBody = screenings.find(screeningtmp => screeningtmp.id == req.body.id);
            if (screeningBody && screeningBody.id != req.params.id) {
                console.log("Screening by id = " + screeningBody.id + " already exists");
                res.status(500).send('Screening by id = ' + screeningBody.id + ' already exists');
                return;
            }
            var screening = screenings.find(screeningtmp => screeningtmp.id == req.params.id);
            if (!screening) {
                screenings.push(req.body);
                var newList = JSON.stringify(screenings);
                fs.writeFile('./JSON/screenings.json', newList, err => {
                    if (err) {
                        console.log("Error writing file in PUT /screenings/" + req.params.id + ": " + err);
                        res.status(500).send('Error writing file screenings.json');
                    } else {
                        res.status(201).send(req.body);
                        console.log("Successfully wrote file screenings.json and added new screening with id = " + req.body.screeningId);
                    }
                });
            } else {
                for (var i = 0; i < screenings.length; i++) {
                    if (screenings[i].id == screening.id) {
                        screenings[i] = req.body;
                    }
                }
                var newList = JSON.stringify(screenings);
                fs.writeFile('./JSON/screenings.json', newList, err => {
                    if (err) {
                        console.log("Error writing file in PUT /screenings/" + req.params.id + ": " + err);
                        res.status(500).send('Error writing file screenings.json');
                    } else {
                        res.status(200).send(req.body);
                        console.log("Successfully wrote file screenings.json and edit screening with old id = " + req.params.id);
                    }
                });
            }
        });
    } else {
        console.log("Screenings PUT body does not meet validator requirements");
        res.status(400).send('Screenings PUT body does not meet validator requirements');
        return;
    }
});

app.delete('/screenings/:id', (req, res) => {
    fs.readFile('./JSON/screenings.json', 'utf8', (err, screeningsJson) => {
        if (err) {
            console.log("File read failed in DELETE /screenings: " + err);
            res.status(500).send('File read failed');
            return;
        }
        var screenings = JSON.parse(screeningsJson);
        var screeningIndex = screenings.findIndex(screeningtmp => screeningtmp.id == req.params.id);
        if (screeningIndex != -1) {
            screenings.splice(screeningIndex, 1);
            var newList = JSON.stringify(screenings);
            fs.writeFile('./JSON/screenings.json', newList, err => {
                if (err) {
                    console.log("Error writing file in DELETE /screenings/" + req.params.id + ": " + err);
                    res.status(500).send('Error writing file screenings.json');
                } else {
                    res.status(204).send();
                    console.log("Successfully deleted screening with id = " + req.params.id);
                }
            });
        } else {
            console.log("Screening by id = " + req.params.id + " does not exists");
            res.status(500).send('Screening by id = ' + req.params.id + ' does not exists');
            return;
        }
    });
});

//-----------------------SCREENING ROOMS

app.get('/screeningRooms', (req, res) => {
    fs.readFile('./JSON/screeningRooms.json', 'utf8', (err, screeningRoomsJson) => {
        if (err) {
            console.log("File read failed in GET /screeningRooms: " + err);
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
            console.log("File read failed in GET /screeningRooms/" + req.params.number + ": " + err);
            res.status(500).send('File read failed');
            return;
        }
        var screeningRooms = JSON.parse(screeningRoomsJson);
        var screeningRoom = screeningRooms.find(screeningRoomtmp => screeningRoomtmp.number == req.params.number);
        if (!screeningRoom) {
            console.log("Can't find screening room with number: " + req.params.number);
            res.status(500).send('Cant find screening room with number: ' + req.params.number);
            return;
        }
        var screeningRoomJSON = JSON.stringify(screeningRoom);
        console.log("GET /screeningRooms/" + req.params.number);
        res.send(screeningRoomJSON);
    });
});

app.post('/screeningRooms', (req, res) => {
    if (screeningRoomValidator(req.body)) {
        fs.readFile('./JSON/screeningRooms.json', 'utf8', (err, screeningRoomsJson) => {
            if (err) {
                console.log("File read failed in GET /screeningRooms/" + req.params.number + ": " + err);
                res.status(500).send('File read failed');
                return;
            }
            var screeningRooms = JSON.parse(screeningRoomsJson);
            var screeningRoom = screeningRooms.find(screeningRoomtmp => screeningRoomtmp.number == req.params.number);
            if (!screeningRoom) {
                screeningRooms.push(req.body);
                var newList = JSON.stringify(screeningRooms);
                fs.writeFile('./JSON/screeningRooms.json', newList, err => {
                    if (err) {
                        console.log("Error writing file in POST /screeningRooms: " + err);
                        res.status(500).send('Error writing file screeningRooms.json');
                    } else {
                        res.status(201).send(req.body);
                        console.log("Successfully wrote file screeningRooms.json and added new screening room with number = " + req.body.number);
                    }
                });
            } else {
                console.log("Screening room by number = " + req.body.number + " already exists");
                res.status(500).send('Screening room by number = ' + req.body.number + ' already exists');
                return;
            }
        });
    } else {
        console.log("Screening rooms POST body does not meet validator requirements");
        res.status(400).send('Screening rooms POST body does not meet validator requirements');
        return;
    }
});

app.put('/screeningRooms/:number', (req, res) => {
    if (screeningRoomValidator(req.body)) {
        fs.readFile('./JSON/screeningRooms.json', 'utf8', (err, screeningRoomsJson) => {
            if (err) {
                console.log("File read failed in PUT /screeningRooms/" + req.params.number + ": " + err);
                res.status(500).send('File read failed');
                return;
            }
            var screeningRooms = JSON.parse(screeningRoomsJson);
            var screeningRoomBody = screeningRooms.find(screeningRoomtmp => screeningRoomtmp.number == req.body.number);
            if (screeningRoomBody && screeningRoomBody.number != req.params.number) {
                console.log("Screening room by number = " + screeningRoomBody.number + " already exists");
                res.status(500).send('Screening room by number = ' + screeningRoomBody.number + ' already exists');
                return;
            }
            var screeningRoom = screeningRooms.find(screeningRoomtmp => screeningRoomtmp.number == req.params.number);
            if (!screeningRoom) {
                screeningRooms.push(req.body);
                var newList = JSON.stringify(screeningRooms);
                fs.writeFile('./JSON/screeningRooms.json', newList, err => {
                    if (err) {
                        console.log("Error writing file in PUT /screeningRooms/" + req.params.number + ": " + err);
                        res.status(500).send('Error writing file screeningRooms.json');
                    } else {
                        res.status(201).send(req.body);
                        console.log("Successfully wrote file screeningRooms.json and added new screening room with number = " + req.body.screeningRoomnumber);
                    }
                });
            } else {
                for (var i = 0; i < screeningRooms.length; i++) {
                    if (screeningRooms[i].number == screeningRoom.number) {
                        screeningRooms[i] = req.body;
                    }
                }
                var newList = JSON.stringify(screeningRooms);
                fs.writeFile('./JSON/screeningRooms.json', newList, err => {
                    if (err) {
                        console.log("Error writing file in PUT /screeningRooms/" + req.params.number + ": " + err);
                        res.status(500).send('Error writing file screeningRooms.json');
                    } else {
                        res.status(200).send(req.body);
                        console.log("Successfully wrote file screeningRooms.json and edit screening room with old number = " + req.params.number);
                    }
                });
            }
        });
    } else {
        console.log("Screening rooms PUT body does not meet validator requirements");
        res.status(400).send('Screening rooms PUT body does not meet validator requirements');
        return;
    }
});

app.delete('/screeningRooms/:number', (req, res) => {
    fs.readFile('./JSON/screeningRooms.json', 'utf8', (err, screeningRoomsJson) => {
        if (err) {
            console.log("File read failed in DELETE /screeningRooms: " + err);
            res.status(500).send('File read failed');
            return;
        }
        var screeningRooms = JSON.parse(screeningRoomsJson);
        var screeningRoomIndex = screeningRooms.findIndex(screeningRoomtmp => screeningRoomtmp.number == req.params.number);
        if (screeningRoomIndex != -1) {
            screeningRooms.splice(screeningRoomIndex, 1);
            var newList = JSON.stringify(screeningRooms);
            fs.writeFile('./JSON/screeningRooms.json', newList, err => {
                if (err) {
                    console.log("Error writing file in DELETE /screeningRooms/" + req.params.number + ": " + err);
                    //res.status(500).send('Error writing file screeningRooms.json');
                } else {
                    //res.status(204).send();
                    console.log("Successfully deleted screening room with number = " + req.params.number);
                }
            });
        } else {
            console.log("Screening room by number = " + req.params.number + " does not exists");
            res.status(500).send('Screening room by number = ' + req.params.number + ' does not exists');
            return;
        }
    });

    fs.readFile('./JSON/screenings.json', 'utf8', (err, screeningsJson) => {
        if (err) {
            console.log("File read failed in DELETE /screenings: " + err);
            res.status(500).send('File read failed');
            return;
        }
        var screenings = JSON.parse(screeningsJson);

        let i = screenings.length - 1;
        while (i >= 0) {
            if (screenings[i].screeningRoomNum == req.params.number) {
                screenings.splice(i, 1);
            }
            i--;
        }

        var newList = JSON.stringify(screenings);
        fs.writeFile('./JSON/screenings.json', newList, err => {
            if (err) {
                console.log("Error writing file in DELETE /screenings/" + req.params.id + ": " + err);
                res.status(500).send('Error writing file screenings.json');
            } else {
                res.status(204).send();
                console.log("Successfully deleted screenings with room number " + req.params.number);
            }
        });
    });
});

app.listen(7777, () => console.log("Server address http://localhost:7777"));