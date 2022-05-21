import React from 'react';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Home } from '../Home';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reservation" element={<h2>Ahoj</h2>} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
