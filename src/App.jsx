import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BooksList from './components/BooksList';
import ReadersList from './components/ReadersList';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/readers" element={<ReadersList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;