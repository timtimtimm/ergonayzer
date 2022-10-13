import React from 'react';
import './App.css';
import Header from './components/Header.jsx/Header';
import Notes from './components/Notes.jsx/Notes';
import Calendar from './components/Calendar.jsx/Calendar';

function App() {
  return (
    <div className="wrapper">
     <Header />
     <Notes />
     <Calendar />
    </div>
  );
}

export default App;
