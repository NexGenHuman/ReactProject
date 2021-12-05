export default class Screening {
    constructor(id, date, startTime, movieID, screeningRoomNum, soldTicketsNumber, takenSeats, roomCapacity) {
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
        this.availableTicketsNumber = roomCapacity - soldTicketsNumber;
        //Array containing numbers of taken seats
        this.takenSeats = takenSeats;
    }
}