import React from "react";
import axios from "axios";

export default class DeleteMovieComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:7777/movies")
            .then(res => {
                const movies = res.data;
                this.setState({ movies });
            });
    }

    Movies = () => {
        return (
            <select name="movies" multiple className="scrollTroughList">
                {
                    this.state.movies.map(item =>
                        <option value={item.id}>{item.title} - {item.length}min.</option>
                    )
                }
            </select>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const toDelete = e.target.movies.value * 1;
        
        axios.delete("http://localhost:7777/movies/" + toDelete).then(res => {
            let temp = this.state.movies;

            let deleted = temp.findIndex(movietmp => movietmp.id == toDelete);
            temp.splice(deleted, 1);

            this.setState({ movies: temp })
        })
    }

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <this.Movies /><br/>
                <input type="submit" value="Delete" ></input>
            </form>
        );
    }
}