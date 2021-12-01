import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Getdate from './Getdate';

axios.get('http://localhost:7777/movies').then(response => console.log(response));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Routes>
          <Route path='/Getdate' element={<Getdate/>}>Get date</Route>
        </Routes>
        <a
          href="http://localhost:7777/movies"
        >
          View movies
        </a>
        <a
          href="http://localhost:7777/screeningRooms"
        >
          View rooms
        </a>
        <a
          href="http://localhost:7777/screenings"
        >
          View screening
        </a>
      </header>
    </div>
  );
}

export default App;
