import './App.css';
import Timetable from './components/Timetable'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Timetable timeStandard='24' />
      </header>
    </div>
  );
}

export default App;
