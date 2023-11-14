import logo from './logo.svg';

import './App.css';
import Banner from './components/Banner'
import Stage from './components/Stage';
import Jokes from './components/Jokes';

function App() {
  return (
    <div className="App">
      <Banner />
      <Stage />
      <Jokes />
    </div>
  );
}

export default App;
