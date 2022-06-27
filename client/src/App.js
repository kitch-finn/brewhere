import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Home from './pages/Home';
import Map from './pages/Map';
import Mypage from './pages/Mypage';
import LoginModal from './components/Modal/Login/Login';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);

  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/map' element={<Map />} />
          <Route
            path='/mypage/mypage'
            element={<Mypage />}
            userinfo={userinfo}
          />
          <Route element={LoginModal} setUserinfo={setUserinfo} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
