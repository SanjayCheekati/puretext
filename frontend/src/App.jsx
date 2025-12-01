import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NoteEditor from './components/NoteEditor';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:noteName" element={<NoteEditor />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
