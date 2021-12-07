import React from "react";
import axios from 'axios';
import Screening from '../Classes/Screening';

export default class BuyTicketComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenings: [],
            toPrint: [],
            id: 0,
            date: "",
            startTime: "",
            movieID: 0,
            screeningRoomNum: 0,
            seats: [0],
            max: 0,
            amount: 0
        }
    }

    componentDidMount() {
        axios.get("http://localhost:7777/screenings")
            .then(res => {
                const screenings = res.data;
                this.setState({ screenings });

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
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.state.screenings.map((Screening) => {
            if (Screening.id == e.target.screenings.value) {
                axios.get("http://localhost:7777/screenings/" + Screening.id)
                    .then(res => {
                            this.setState( {
                            id:e.target.screenings.value,
                            date: res.data.date,
                            startTime: res.data.startTime,
                            movieID: res.data.movieID,
                            screeningRoomNum: res.data.screeningRoomNum,
                            seats: res.data.takenSeats,
                            amount: res.data.soldTicketsNumber,
                            max: res.data.availableTicketsNumber
                        } )
                    })
            }
        })

        const maxs = this.state.max
        if (maxs != 0) {
            let seats = this.state.seats;
            let amount = this.state.amount;
            let add = 0;
            add = e.target.seat_num.value;
            if (!seats.includes(add)) {
                amount = amount + 1;
                seats.push(add);
            }
            this.setState({ seats });
            this.setState({ amount });
        }
        this.state.screenings.map((Screening) => {
            if (Screening.id == e.target.screenings.value) {
                axios.put("http://localhost:7777/screenings/" + Screening.id, {
                    id: this.state.id,
                    date: this.state.date,
                    startTime: this.state.startTime,
                    movieID: this.state.movieID,
                    screeningRoomNum: this.state.screeningRoomNum,
                    soldTicketsNumber: this.state.amount,
                    availableTicketsNumber: this.state.max,
                    takenSeats: this.state.seats
                })
            }
        })
    }

    Screenings = () => {

        return (
            <select name="screenings" multiple className="scrollTroughList">
                {
                    this.state.toPrint.map(item =>
                        <option value={item.id}>{item.date} - {item.startTime} - {item.title} - Room No.{item.roomNum}</option>
                    )
                }
            </select>
        );
    }

    render() {
        console.log(this.state.toPrint);
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <this.Screenings />
                    <label>Choose Seat number:</label><br />
                    <input type="number" name="seat_num" /><br />
                    <input type="submit" value="Buy" ></input>
                </form>
            </div>
        );
    }
}
