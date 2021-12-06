import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddScreeningComponent from './Components/AddScreeningComponent';
import AddScreeningRoomComponent from './Components/AddScreeningRoomComponent';
import AddMovieComponent from './Components/AddMovieComponent'
import HomeComponent from './Components/HomeComponent'
import GetDateComponent from './Components/GetDateComponent';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="pageSelection">
          <p><Link to="/">Home</Link></p>
          <p><Link to="/addScreening">Add screening</Link></p>
          <p><Link to="/addMovie">Add movie</Link></p>
          <p><Link to="/addScreeningRoom">Add screening room</Link></p>
          <p><Link to="/GetDateComponent">Get date</Link></p>
        </div>

        <Routes>
          <Route exact path="/" element={<HomeComponent />} />
          <Route exact path="/addScreening" element={<AddScreeningComponent />} />
          <Route exact path="/addMovie" element={<AddMovieComponent />} />
          <Route exact path="/addScreeningRoom" element={<AddScreeningRoomComponent />} />
          <Route exact path="/GetDateComponent" element={<GetDateComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
