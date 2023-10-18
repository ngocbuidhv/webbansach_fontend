import React, { useState } from 'react';
import './App.css';
import Footer from './layouts/header-footer/Footer';
import HomePage from './layouts/hompage/HomePage';
import { layToanBoSach } from './api/SachAPI';
import DanhSachSanrPham from './layouts/product/DanhSachSanPham';
import Navbar from './layouts/header-footer/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './layouts/about/About';

function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar tuKhoaTimKiem = {tuKhoaTimKiem} setTuKhoaTimKiem = {setTuKhoaTimKiem}/>
      <Routes>
      <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />}/>
        <Route path='/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/sach/:maSach' element={<ChiTietSanPham/>}/>
      </Routes>
      <br/>
      <br/>
      <hr/>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
