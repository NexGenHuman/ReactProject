export default function movieValidator(movie) {
    if(typeof movie.id !== 'number' || movie.id < 0) {
        console.log('Invalid movie/id value in request body')
        return false; 
        }
    else if(typeof movie.title !== 'string' || 
                   movie.title.length <= 1 || 
                   !(!isNaN(movie.title.charAt(0)) || 
                   movie.title.charAt(0) === movie.title.charAt(0).toUpperCase())) {
        console.log('Invalid movie/title value in request body')
        return false; 
        }
    else if(typeof movie.length !== 'number' || movie.length <= 30 || movie.length >= 300) {
        console.log('Invalid movie/length value in request body')
        return false; 
        }
    else return true;
}