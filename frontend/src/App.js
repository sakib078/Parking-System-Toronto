import logo from './logo.svg';
import './App.css';

import Admin from './components/Admin';
import Search from './components/parking/search';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Search />
      </header>
    </div>
  );
}

export default App;
