import React from 'react';
import axios from 'axios';
import Screening from '../Classes/Screening';

export default class AddScreeningComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenings:[],
            movies: [],
            rooms: [],
            toPrint:[],
            lastID: 0
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
        axios.get("http://localhost:7777/screenings")
            .then(res => {
                const screenings=res.data;
                const lastID = res.data[res.data.length - 1].id;
                this.setState({screenings });
                this.state.screenings.map((screening) => {
                    axios.get("http://localhost:7777/movies/" + screening.movieID)
                        .then(res => {
                            const movie = res.data;

                            const item = {
                                id: screening.id,
                                title: movie.title,
                                date: screening.date,
                                startTime: screening.startTime,
                                roomNum: screening.screeningRoomNum
                            }

                            this.setState({ toPrint: [...this.state.toPrint, item] })
                        })
                })
                this.setState({ lastID,
                screenings });

            });
    }
    ScreeningList=()=>{
        return(
            <select name="screenings" multiple className="scrollTroughList">
                {
                   this.state.toPrint.map(item =>
                    <option value={item.id}>{item.date} - {item.startTime} - {item.title} - Room No.{item.roomNum}</option>
                    )
                }

            </select>
        )
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
        let reqObj = new Screening(
            e.target.item.value * 1,
            e.target.screening_date.value,
            e.target.screening_time.value,
            e.target.movies.value * 1,
            e.target.rooms.value * 1,
            0, [], this.state.rooms.find(roomtmp => roomtmp.number === e.target.rooms.value * 1).capacity)

        const body = {
            id: reqObj.id,
            date: reqObj.date,
            startTime: reqObj.startTime,
            movieID: reqObj.movieID,
            screeningRoomNum: reqObj.screeningRoomNum,
            soldTicketsNumber: reqObj.soldTicketsNumber,
            availableTicketsNumber: reqObj.availableTicketsNumber,
            takenSeats: reqObj.takenSeats
        }
        const toEdit=e.target.item.value * 1;
        axios.put('http://localhost:7777/screenings/'+ toEdit, body)
            .then(res => {
                let temp = this.state.screenings;
                this.setState({ screenings: temp })
    }
            )};

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <p>Select screening to edit</p>
                <this.ScreeningList/><br />
                <label>Screening date:</label><br />
                <input type="date" name="screening_date" /><br />
                <label>Screening time:</label><br />
                <input type="time" name="screening_time" /><br />
                <p>Select the movie to be aired</p>
                <this.MovieList />
                <p>Select the room to be aired in</p>
                <this.RoomList /><br />
                <input type="submit" value="Edit"></input>
            </form>
        );
    }
}