import React, { useState } from 'react';
import './App.css';
import Footer from './layouts/header-footer/Footer';
import HomePage from './layouts/hompage/HomePage';
import { layToanBoSach } from './api/SachAPI';
import DanhSachSanrPham from './layouts/product/DanhSachSanPham';
import Navbar from './layouts/header-footer/Navbar';

function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
  return (
    <div className='App'>
      <Navbar tuKhoaTimKiem = {tuKhoaTimKiem} setTuKhoaTimKiem = {setTuKhoaTimKiem}/>
      <HomePage tuKhoaTimKiem={tuKhoaTimKiem} />
      <br/>
      <br/>
      <hr/>
      <Footer />
    </div>
  );
}

export default App;
