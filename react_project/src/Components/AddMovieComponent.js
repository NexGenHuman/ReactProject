import React from "react";
import axios from 'axios';
import Movie from '../Classes/Movie';

export default class AddMovieComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastID: 0
        }
    }

    componentDidMount() {
        axios.get("http://localhost:7777/movies")
            .then(res => {
                const lastID = res.data[res.data.length - 1].id;
                this.setState({ lastID });
            });
    }

    handleSubmit  = (e) => {
        e.preventDefault();

        let reqObj = new Movie(
            this.state.lastID + 1,
            e.target.title_input.value,
            e.target.length_input.value * 1
        )

        this.setState(prevState => {
            return { lastID: prevState.lastID + 1 };
        });

        const body = {
            id: reqObj.id,
            title: reqObj.title,
            length: reqObj.length
        }

        axios.post('http://localhost:7777/movies', body)
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <label>Movie title: </label><br/>
                <input type="text" name="title_input"/><br/>
                <label>Movie length in minutes: </label><br/>
                <input type="number" name="length_input"/><br/>
                <input type="submit" value="Create"></input>
            </form>
        );
    }
}