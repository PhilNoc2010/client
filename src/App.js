import './App.css';
import Banner from './components/Banner'
import Stage from './components/Stage';
import Jokes from './components/Jokes';
import AddJoke from './components/AddJoke';
import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react';

function App() {
  const [botIsTalking, setBotIsTalking] = useState()

  const talkTracker = ( talkFlag ) => {
    setBotIsTalking(talkFlag)
  }

  return (
    <div className="App">
      <Banner />
      <Routes>
        <Route path="/" element={<Navigate to="/tellajoke/" />}/>
        <Route path="/tellajoke/" element={[
                  <Stage talkFlag={botIsTalking} key={1}/>,
                  <Jokes talkTracker={talkTracker} />]} />
        <Route path="/addajoke" element={[<AddJoke />]} />
      </Routes>
    </div>
  );
}

export default App;
