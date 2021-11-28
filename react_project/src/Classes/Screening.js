export default class Screening {
    constructor (date, startTime, movieID, screeningRoomNum, soldTicketsNumber, takenSeats, id) {
        this.id = id;
        this.date = date;
        this.startTime = startTime;
        this.movieID = movieID;
        this.screeningRoomNum = screeningRoomNum;
        this.soldTicketsNumber = soldTicketsNumber;
        this.availableTicketsNumber = screeningRoom.capacity - soldTicketsNumber;
        this.takenSeats = takenSeats;
    }
}