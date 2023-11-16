import './App.css';
import Banner from './components/Banner'
import Stage from './components/Stage';
import Jokes from './components/Jokes';
import { useState } from 'react';

function App() {
  const [botIsTalking, setBotIsTalking] = useState()

  const talkTracker = ( talkFlag ) => {
    setBotIsTalking(talkFlag)
  }

  return (
    <div className="App">
      <Banner />
      <Stage talkFlag={botIsTalking} />
      <Jokes talkTracker={talkTracker} />
      <p>TalkTracker is set to: {JSON.stringify(botIsTalking)}</p>
    </div>
  );
}

export default App;
