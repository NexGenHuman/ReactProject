import React from 'react';
import axios from 'axios';
import Screening from '../Classes/Screening';

export default class AddScreeningComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            rooms: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:7777/movies")
            .then(res => {
                const movies = res.data;
                this.setState({ movies });
            });

        axios.get("http://localhost:7777/screeningRooms")
            .then(res => {
                const rooms = res.data;
                this.setState({ rooms });
            });
    }

    MovieList = () => {
        return (
            <select name="movies" multiple className="scrollTroughList">
                {
                    this.state.movies.map(movie => <option value={movie.id}>{movie.title} - {movie.length}min</option>)
                }
            </select>
        );
    }

    RoomList = () => {
        return (
            <select name="rooms" multiple className="scrollTroughList">
                {
                    this.state.rooms.map(room => <option value={room.number}>Number: {room.number} - Capacity: {room.capacity}</option>)
                }
            </select>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault()

        let reqObj = new Screening(
            9,
            e.target.screening_date.value,
            e.target.screening_time.value,
            e.target.movies.value * 1,
            e.target.rooms.value * 1,
            0, [], this.state.rooms.find(roomtmp => roomtmp.number === e.target.rooms.value * 1).capacity);

        const body = {
            id: reqObj.id,
            date: reqObj.date,
            startTime: reqObj.startTime,
            movieID: reqObj.movieID,
            screeningRoomNum: reqObj.screeningRoomNum,
            soldTicketsNumber: reqObj.soldTicketsNumber,
            availableTicketsNumber: reqObj.availableTicketsNumber,
            takenSeats: reqObj.takenSeats
        };

        axios.post('http://localhost:7777/screenings', body)
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <label>Screening date:</label><br />
                <input type="date" name="screening_date" /><br />
                <label>Screening time:</label><br />
                <input type="time" name="screening_time" /><br />
                <p>Select the movie to be aired</p>
                <this.MovieList />
                <p>Select the room to be aired in</p>
                <this.RoomList /><br />
                <input type="submit" value="Submit"></input>
            </form>
        );
    }
}