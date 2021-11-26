export default class Screening {
    constructor (date, startTime, movie, screeningRoom, soldTicketsNumber, takenSeats) {
        this.date = date;
        this.startTime = startTime;
        this.movie = movie;
        this.screeningRoom = screeningRoom;
        this.soldTicketsNumber = soldTicketsNumber;
        this.availableTicketsNumber = screeningRoom.capacity - soldTicketsNumber;
        this.takenSeats = takenSeats;
    }
}