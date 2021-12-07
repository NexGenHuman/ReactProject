import React from "react";
import axios from 'axios';

export default class GetDateComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenings: [],
            toPrint: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:7777/screenings")
            .then(res => {
                const screenings = res.data;
                this.setState({ screenings });
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.state.screenings.map((screening) => {
            if (screening.date == e.target.screening_date.value) {
                axios.get("http://localhost:7777/movies/" + screening.movieID)
                    .then(res => {
                        const movie = res.data;
                        const item = {
                            id: screening.id,
                            title: movie.title,
                            startTime: screening.startTime,
                            roomNum: screening.screeningRoomNum
                        }
                        this.setState({ toPrint: [...this.state.toPrint, item] })
                    })
            }
        })
    }

    render() {
        console.log(this.state.toPrint);
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label>Screening date:</label><br />
                    <input type="date" name="screening_date" /><br />
                    <input type="submit" value="Get" ></input>
                </form>
                <div className="listBlock">
                        {this.state.toPrint.map((item) => {
                            return (<p key={item.id}>{item.title} - {item.startTime} - {item.roomNum}</p>)
                        })}
                </div>
            </div>
        );
    }
}