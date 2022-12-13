import './App.css';
import React, { useContext } from 'react'
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'
import Profile from './components/Profile.js'
import Public from './components/Public.js'
import { UserContext } from '../src/context/UserProvider';
import { Routes, Route, Navigate } from 'react-router-dom';

export default function App(){
  const { token, logout } = useContext(UserContext)
  return(
  <div className="app">
     <Navbar logout={logout}/>
      <Routes>
        <Route 
          exact path="/" 
          element={token ? <Navigate to="/profile"/> : <Auth />}
        />
        <Route 
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/"/> }
        />
        <Route 
          path="/public"
          element={ <Public />}
        />
      </Routes>
  </div>
  )
}