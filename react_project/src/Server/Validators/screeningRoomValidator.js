export default function screeningRoomValidator(room) {
    if(typeof room.number !== 'number' || room.number < 0) {
        console.log('Invalid room/num value in request body')
        return false; 
        }
    else if(typeof room.capacity !== 'number' || room.capacity < 10 || room.capacity > 200) {
        console.log('Invalid room/length value in request body')
        return false; 
        }
    else return true;
}