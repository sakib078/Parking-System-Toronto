import './App.css';

// import Admin from './components/Admin';
import Search from './components/parking/search';
import Nearestspots from './components/layout/nearestSpot.jsx'
import GMap from './components/map/Map.jsx';

function App() {
  

  return (
    <div className="App">
      
      
      <div className="App-header">
        <GMap />
        <Search />
        <Nearestspots />
      </div>

    </div>
  );
} 

export default App;
