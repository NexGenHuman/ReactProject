import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="http://localhost:7777/movies"
          target="_blank"
          rel="noopener noreferrer"
        >
          Przejdź do filmów.
        </a>
        <a
          className="App-link"
          href="http://localhost:7777/screeningRooms"
          target="_blank"
          rel="noopener noreferrer"
        >
          Przejdź do sali.
        </a>
        <a
          className="App-link"
          href="http://localhost:7777/screenings"
          target="_blank"
          rel="noopener noreferrer"
        >
          Przejdź do seansów.
        </a>
      </header>
    </div>
  );
}

export default App;
