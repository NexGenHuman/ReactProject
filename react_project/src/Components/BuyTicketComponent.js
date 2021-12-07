import React from "react";
import axios from 'axios';
import Screening from '../Classes/Screening';

export default class BuyTicketComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenings: [],
            toPrint: [],
            roomSeats: []
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
        const screeningIndex = this.state.screenings.findIndex(tempScreening => tempScreening.id == e.target.screenings.value)
        let screening = this.state.screenings[screeningIndex]

        screening.takenSeats.push(e.target.tickets.value * 1)
        screening.soldTicketsNumber++
        screening.availableTicketsNumber--

        axios.put("http://localhost:7777/screenings/" + screening.id, screening)
            .then(res => {
                console.log(res)
            })
    }

    screeningsOnChange = (e) => {
        e.preventDefault()

        const screening = this.state.screenings.find(tempScreening => tempScreening.id == e.target.value)

        let Seats = [];
        for (let i = 1; i <= screening.availableTicketsNumber + screening.soldTicketsNumber; i++) {
            if (!screening.takenSeats.includes(i)) {
                Seats.push(i);
            }
        }

        this.setState({ roomSeats: Seats })
    }

    Screenings = () => {

        return (
            <select name="screenings" multiple className="scrollTroughList" onChange={e => this.screeningsOnChange(e)}>
                {
                    this.state.toPrint.map(item =>
                        <option value={item.id}>{item.date} - {item.startTime} - {item.title} - Room No.{item.roomNum}</option>
                    )
                }
            </select>
        );
    }

    Tickets = () => {

        return (
            <select name="tickets" multiple className="scrollTroughList">
                {
                    this.state.roomSeats.map(item =>
                        <option value={item}>{item}</option>
                    )
                }
            </select>
        );
    }

    render() {

        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label>Choose screening:</label><br />
                    <this.Screenings /><br />
                    <label>Choose seat number:</label><br />
                    <this.Tickets /><br />
                    <input type="submit" value="Buy" ></input>
                </form>
            </div>
        );
    }
}
