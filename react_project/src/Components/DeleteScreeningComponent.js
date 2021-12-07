import React from "react";
import axios from "axios";

export default class DeleteScreeningComponent extends React.Component {
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

    handleSubmit = (e) => {
        e.preventDefault();

        const toDelete = e.target.screenings.value * 1;
        
        axios.delete("http://localhost:7777/screenings/" + toDelete).then(res => {
            let temp = this.state.toPrint;

            let deleted = temp.findIndex(screeningtmp => screeningtmp.id == toDelete);
            temp.splice(deleted, 1);

            this.setState({ toPrint: temp })
        })
    }

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <this.Screenings /><br/>
                <input type="submit" value="Delete" ></input>
            </form>
        );
    }
}