import { useState } from 'react';
import Header from './components/Header';
import PartyList from './components/PartyList';
import SuggestionBoard from './components/SuggestionBoard';
import './App.css';

function App() {
  const [party, setParty] = useState([]);

  return (
    <div className="app-layout">
      <Header />
      <div className="candle-dropzone" id="candle-zone" title="Drag unwanted bounty notices here to burn them!">
        <div className="flame"></div>
        <div className="candle-body">
          <div className="wax-drip"></div>
        </div>
        <div className="candle-holder">
          <div className="holder-base"></div>
          <div className="holder-handle"></div>
        </div>
      </div>
      <main className="main-content">
        <PartyList party={party} setParty={setParty} />
        <SuggestionBoard party={party} setParty={setParty} />
      </main>
    </div>
  );
}

export default App;
