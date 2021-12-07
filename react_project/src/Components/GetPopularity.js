import React from "react";
import axios from 'axios';

export default class GetPopularity extends React.Component {
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
            if (screening.date == e.target.screening_date.value && screening.movieID == e.target.movie_id.value) {
                axios.get("http://localhost:7777/movies/" + screening.movieID)
                    .then(res => {
                        const movie = res.data;
                        const item = {
                            id: movie.id,
                            title: movie.title,
                            popularity: screening.soldTicketsNumber
                        }
                        this.setState({ toPrint: [...this.state.toPrint, item] })
                    })
            } else if (screening.date == e.target.screening_date.value && screening.movieID != e.target.movie_id.value) {
                axios.get("http://localhost:7777/movies/" + screening.movieID)
                    .then(res => {
                        const movie = res.data;
                        const item = {
                            id: movie.id,
                            title: movie.title,
                            popularity: 0
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
                <label>Choose movie:</label><br />
                <input type="number" name="movie_id" /><br />
                <label>Choose date:</label><br />
                <input type="date" name="screening_date" /><br />
                <input type="submit" value="Get" ></input>
            </form>
            <div className="listBlock">
                {this.state.toPrint.map((item) => {
                    return (<p key={item.id}>{item.title} - {item.popularity}</p>)
                })}
            </div>
        </div>
    );
};}