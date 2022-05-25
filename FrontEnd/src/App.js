import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import themeLight from './theme/LightTheme/LightTheme';
import {  BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import { CssBaseline } from '@mui/material';
import NavbarComponent from './component/navbar/navbar';

function App() {
  const [light, setLight] = React.useState(true);

  return (
   
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      <BrowserRouter>
      {<NavbarComponent/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
     
  );
}

export default App;
