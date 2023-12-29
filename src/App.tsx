import React, { useState } from 'react';
import './App.css';
import Footer from './layouts/header-footer/Footer';
import HomePage from './layouts/hompage/HomePage';
import Navbar from './layouts/header-footer/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './layouts/about/About';
import ChiTietSanPham from './layouts/product/ChiTietSanPham';
import DangKyNguoiDung from './layouts/user/DangKyNguoiDung';
import KichHoatTaiKhoan from './layouts/user/KichHoatTaiKhoan';
import DangNhap from './layouts/user/DangNhap';
import Test from './layouts/user/Test';
import DashboardPage from './layouts/admin/DashboardPage';



function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
  const isAdminPath = window.location.pathname.includes('/admin');

  return (
    <div className='App'>
      <BrowserRouter>
        {isAdminPath ? (
          <DashboardPage/>

        ) : (
          <>
            <Navbar tuKhoaTimKiem={tuKhoaTimKiem}  setTuKhoaTimKiem={setTuKhoaTimKiem}/>
            <Routes>
              <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
              <Route path='/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
              <Route path='/about' element={<About />} />
              <Route path='/sach/:maSach' element={<ChiTietSanPham />} />
              <Route path='/dang-ky' element={<DangKyNguoiDung />} />
              <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan/>} />
              <Route path='/dang-nhap' element={<DangNhap />} />
              <Route path='/test' element={<Test />} />
            </Routes>
            <Footer/>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
