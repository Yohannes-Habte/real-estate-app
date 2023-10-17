import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/homePage/Home';
import About from './views/aboutPage/About';
import Contact from './views/contactPage/Contact';
import Login from './views/loginPage/Login';
import NotFound from './views/notFound/NotFound';
import Header from './components/header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import Register from './views/registerPage/Register';
import Profile from './views/profilePage/Profile';

const App = () => {
  return (
    <div>
      <Router>
        <ToastContainer
          position="top-right"
          limit={1}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Profile page is protected */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
