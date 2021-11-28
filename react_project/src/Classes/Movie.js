export default class Movie {
    constructor (title, length, id) {
        //Unique ID number of a movie
        this.id = id;
        //Title of a movie
        this.title = title;
        //Length of a movie given in minutes
        this.length = length;
    }
}