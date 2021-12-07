import React from "react";
import axios from "axios";

export default class DeleteScreeningRoomComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screeningRooms: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:7777/screeningRooms")
            .then(res => {
                const screeningRooms = res.data;
                this.setState({ screeningRooms });
            });
    }

    ScreeningRooms = () => {
        return (
            <select name="screeningRooms" multiple className="scrollTroughList">
                {
                    this.state.screeningRooms.map(item =>
                        <option value={item.number}>Room No.{item.number} - Capacity: {item.capacity}</option>
                    )
                }
            </select>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const toDelete = e.target.screeningRooms.value * 1;
        
        axios.delete("http://localhost:7777/screeningRooms/" + toDelete).then(res => {
            let temp = this.state.screeningRooms;

            let deleted = temp.findIndex(screeningRoomtmp => screeningRoomtmp.id == toDelete);
            temp.splice(deleted, 1);

            this.setState({ screeningRooms: temp })
        })
    }

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <this.ScreeningRooms /><br/>
                <input type="submit" value="Delete" ></input>
            </form>
        );
    }
}