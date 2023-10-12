import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/homePage/Home';
import About from './views/aboutPage/About';
import Contact from './views/contactPage/Contact';
import Login from './views/loginPage/Login';
import NotFound from './views/notFound/NotFound';
import Header from './components/header/Header';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
