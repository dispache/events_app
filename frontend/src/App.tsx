import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { EventParticipants, EventRegistration, EventsBoard } from './pages';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='' Component={EventsBoard} />
          <Route path='/event/:eventId/registration' Component={EventRegistration} />
          <Route path='/event/:eventId/participants' Component={EventParticipants} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
