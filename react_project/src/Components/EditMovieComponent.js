import React from "react";
import axios from "axios";
import Movie from "../Classes/Movie";

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
        let reqObj = new Movie(
            e.target.movies.value * 1,
            e.target.title_input.value,
            e.target.length_input.value * 1
        )
        const body = {
            id: reqObj.id,
            title: reqObj.title,
            length: reqObj.length
        }

        const toEdit = e.target.movies.value * 1;
        
        axios.put("http://localhost:7777/movies/" + toEdit,body).then(res => {
            let temp = this.state.movies;
            this.setState({ movies: temp })
        })
    }

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <this.Movies /><br/>
                <label>Movie title: </label><br />
                <input type="text" name="title_input" /><br />
                <label>Movie length in minutes: </label><br />
                <input type="number" name="length_input" /><br />
                <input type="submit" value="Edit" ></input>
            </form>
        );
    }
}