import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddScreeningComponent from './Components/AddScreeningComponent';
import AddScreeningRoomComponent from './Components/AddScreeningRoomComponent';
import AddMovieComponent from './Components/AddMovieComponent';
import HomeComponent from './Components/HomeComponent';
import GetDateComponent from './Components/GetDateComponent';
import BuyTicketComponent from './Components/BuyTicketComponent';
import GetPopularity from './Components/GetPopularity';
import DeleteScreeningComponent from './Components/DeleteScreeningComponent';
import DeleteScreeningRoomComponent from './Components/DeleteScreeningRoomComponent';
import DeleteMovieComponent from './Components/DeleteMovieComponent';

function App() {
  return (
    <div className="App routerContainer">
      <Router>
        <div className="pageSelection">
          <p><Link to="/">Home</Link></p>
          <p><Link to="/addScreening">Add screening</Link></p>
          <p><Link to="/addMovie">Add movie</Link></p>
          <p><Link to="/addScreeningRoom">Add screening room</Link></p>
          <p><Link to="/GetDate">Get date</Link></p>
          <p><Link to="/BuyTicket">Buy Ticket</Link></p>
          <p><Link to="/GetPopularity">How popular is the movie</Link></p>
          <p><Link to="/DeleteScreening">Delete chosen screening</Link></p>
          <p><Link to="/DeleteScreeningRoom">Delete chosen screening room</Link></p>
          <p><Link to="/DeleteMovie">Delete chosen movie</Link></p>
        </div>

        <Routes>
          <Route exact path="/" element={<HomeComponent />} />
          <Route exact path="/addScreening" element={<AddScreeningComponent />} />
          <Route exact path="/addMovie" element={<AddMovieComponent />} />
          <Route exact path="/addScreeningRoom" element={<AddScreeningRoomComponent />} />
          <Route exact path="/GetDate" element={<GetDateComponent />} />
          <Route exact path="/BuyTicket" element={<BuyTicketComponent/>}/>
          <Route exact path="/GetPopularity" element={<GetPopularity/>}/>
          <Route exact path="/DeleteScreening" element={<DeleteScreeningComponent/>}/>
          <Route exact path="/DeleteScreeningRoom" element={<DeleteScreeningRoomComponent/>}/>
          <Route exact path="/DeleteMovie" element={<DeleteMovieComponent/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
