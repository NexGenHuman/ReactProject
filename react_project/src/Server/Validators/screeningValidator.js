export default function screeningValidator(screening) {
    if (typeof screening.id !== 'number' || screening.id < 0) {
        console.log('Invalid screening/id value in request body');
        return false;
    }
    if (screening.date == '') {
        console.log('Empty date in request');
        return false;
    }
    let date = new Date(screening.date);
    if (!date) {
        console.log('Invalid screening/date value in request body');
        return false;
    }
    if (screening.startTime == '') {
        console.log('Empty date in request');
        return false;
    }
    date = new Date(screening.date + 'T' + screening.startTime);
    if (!date) {
        console.log('Invalid screening/time value in request body');
        return false;
    }
    if (date <= new Date()) {
        console.log('Invalid screening/date-time precedes current date');
        return false;
    }
    if (typeof screening.movieID !== 'number' || screening.movieID < 0) {
        console.log('Invalid screening/movieID value in request body');
        return false;
    }
    if (typeof screening.screeningRoomNum !== 'number' || screening.screeningRoomNum < 0) {
        console.log('Invalid screening/screeningRoomNum value in request body');
        return false;
    }
    if (typeof screening.soldTicketsNumber !== 'number' || screening.soldTicketsNumber < 0) {
        console.log('Invalid screening/soldTicketsNumber value in request body');
        return false;
    }
    if (typeof screening.availableTicketsNumber !== 'number' || screening.availableTicketsNumber < 0) {
        console.log('Invalid screening/availableTicketsNumber value in request body');
        return false;
    }
    if (!Array.isArray(screening.takenSeats)) {
        console.log('Invalid screening/takenSeats value in request body');
        return false;
    }
    let temp = true;
    var tempArr = [];
    screening.takenSeats.every(function (seatNum, index) {
        let tempSeat = tempArr.find(valtmp => valtmp === seatNum);
        if (tempSeat) {
            console.log('Value in screening/takenSeats/seatNum repeated');
            temp = false;
            return false;
        }
        tempArr.push(seatNum);
        if (typeof seatNum !== 'number' || seatNum <= 0) {
            console.log('Invalid screening/takenSeats/seatNum value in request body at index ' + index);
            temp = false;
            return false;
        }
        return true;
    });

    return temp;
}