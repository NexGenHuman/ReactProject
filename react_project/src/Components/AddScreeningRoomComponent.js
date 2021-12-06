import React from "react";
import ScreeningRoom from "../Classes/ScreeningRoom"
import axios from "axios";

export default class AddScreeningRoomComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastID: 0
        }
    }

    componentDidMount() {
        axios.get("http://localhost:7777/screeningRooms")
            .then(res => {
                const lastID = res.data[res.data.length - 1].number;
                this.setState({ lastID });
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let reqObj = new ScreeningRoom(
            this.state.lastID + 1,
            e.target.capacity_input.value * 1
        );

        this.setState(prevState => {
            return { lastID: prevState.lastID + 1 };
        });

        const body = {
            number: reqObj.number,
            capacity: reqObj.capacity
        };

        axios.post('http://localhost:7777/screeningRooms', body)
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <label>Movie nr.{this.state.lastID + 1} capacity:</label><br/>
                <input type="number" name="capacity_input"/>
                <input type="submit" value="Create"></input>
            </form>
        )
    }
}