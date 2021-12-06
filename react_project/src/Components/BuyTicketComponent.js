import React from "react";
import axios from 'axios';
import Screening from '../Classes/Screening';

export default class BuyTicketComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenings:[],
        id:0,
        date:1,
        startTime:0,
         movieID:0,
        screeningRoomNum:0,
            seats:[0],
            max:0,
            amount:0,
            toPrint:""
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
        this.state.screenings.map((Screening) => {
            if (Screening.id == e.target.screening_id.value) {
        axios.get("http://localhost:7777/screenings/"+ Screening.id)
        .then(res => {
            const id = res.data.id;
            const date=res.data.date;
            const startTime=res.data.startTime;
            const movieID=res.data.movieID;
            const screeningRoomNum=res.data.screeningRoomNum;
            const seats=res.data.takenSeats;
            const amount=res.data.soldTicketsNumber;
            const max=res.data.availableTicketsNumber;
            this.setState({id});
            this.setState({date});
            this.setState({startTime});
            this.setState({movieID});
            this.setState({screeningRoomNum});
            this.setState({seats});
            this.setState({amount});
            this.setState({max});
        })
    }})

        const maxs=this.state.max
        if(maxs!=0){
            let seats=this.state.seats;
            let amount=this.state.amount;
            let add=0;
            add=e.target.seat_num.value;
            if(!seats.includes(add)){
            amount+=1;
            seats.push(add);
        }
            this.setState({seats});
            this.setState({amount});
    }
    this.state.screenings.map((Screening) => {
        if (Screening.id == e.target.screening_id.value) {
                axios.put("http://localhost:7777/screenings/" + Screening.id,{
                    id: this.state.id,
                    date: this.state.date,
                    startTime: this.state.startTime,
                    movieID: this.state.movieID,
                    screeningRoomNum: this.state.screeningRoomNum,
                    soldTicketsNumber: this.state.amount,
                    availableTicketsNumber: this.state.max,
                    takenSeats: this.state.seats
                }).then(res => {
                    this.setState({ toPrint:"Dodano" })
                })

    }})
}

    render() {
        console.log(this.state.toPrint);
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label>Screening Ticket:</label><br />
                    <input type="number" name="screening_id" /><br />
                    <input type="number" name="seat_num"/><br/>
                    <input type="submit" value="Buy" ></input>
                </form>
            </div>
        );
    }
}
