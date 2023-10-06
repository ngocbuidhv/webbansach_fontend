import React from 'react';
import './App.css';
import { Navbar } from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import HomePage from './layouts/hompage/HomePage';
import { layToanBoSach } from './api/SachAPI';
import DanhSachSanrPham from './layouts/product/DanhSachSanPham';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <HomePage />
      <br/>
      <br/>
      <hr/>
      <Footer />
    </div>
  );
}

export default App;
