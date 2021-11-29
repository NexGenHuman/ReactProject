import axios from 'axios';

export default class Screening {
    constructor (date, startTime, movieID, screeningRoomNum, soldTicketsNumber, takenSeats, id) {
        //Unique ID number of a movie
        this.id = id;
        //Date of the screening expressed in YYYY-MM-DD format
        this.date = date;
        //Time when the screening starts expressed in HH:MM format
        this.startTime = startTime;
        //ID number used to find movie information
        this.movieID = movieID;
        //Number of the room reserved for the screening
        this.screeningRoomNum = screeningRoomNum;
        //Number of sold tickets
        this.soldTicketsNumber = soldTicketsNumber;
        //Number of tickets available for sale
        this.availableTicketsNumber = (available) => {
            let screeningRoomJSON = axios.get('http://localhost:7777/screeningRooms/' + this.screeningRoomNum).then(response => console.log(response.data));
            let screeningRoom = JSON.parse(screeningRoomJSON);
            available = screeningRoom.capacity - soldTicketsNumber;
        }
        //Array containing numbers of taken seats
        this.takenSeats = takenSeats;
    }
}