import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Home from './components/Home';
import NoteEditor from './components/NoteEditor';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:noteName" element={<NoteEditor />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
};

export default App;
