import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import MainPage from './components/MainPage';
import Profile from './components/Profile';
import Music from './components/Music';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Registration from './components/Registration';
import Login from './components/Login';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAuth } from './features/authSlice';
import AlertModule from './components/AlertModule';
import 'boxicons/css/boxicons.min.css';

function App() {
  const [hovered, changeHovered] = useState(false);
  const [module, setModule] = useState(false);
  return (
    <>
      <Router>
        {module ? <AlertModule /> : null}
        <Navbar hovered={hovered} changeHovered={changeHovered} />
        <div className="container ">
          <Routes>
            <Route
              path="/"
              element={<MainPage changeHovered={changeHovered} />}
            ></Route>
            <Route
              path="/music"
              element={
                <Music setModule={setModule} changeHovered={changeHovered} />
              }
            ></Route>
            <Route
              path="/contacts"
              element={<Contacts changeHovered={changeHovered} />}
            ></Route>
            <Route
              path="/profile"
              element={<Profile changeHovered={changeHovered} />}
            ></Route>
            <Route
              path="/registration"
              element={<Registration changeHovered={changeHovered} />}
            ></Route>
            <Route
              path="/login"
              element={
                <Login setModule={setModule} changeHovered={changeHovered} />
              }
            ></Route>
          </Routes>
        </div>

        <Footer hovered={hovered} />
      </Router>
    </>
  );
}

export default App;
