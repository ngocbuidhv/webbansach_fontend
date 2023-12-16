import React, { useState } from 'react';
import './App.css';
import Footer from './layouts/header-footer/Footer';
import HomePage from './layouts/hompage/HomePage';
import { layToanBoSach } from './api/SachAPI';
import DanhSachSanrPham from './layouts/product/DanhSachSanPham';
import Navbar from './layouts/header-footer/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './layouts/about/About';
import ChiTietSanPham from './layouts/product/ChiTietSanPham';
import SachForm from './layouts/admin/FormThemSach';
import DangKyNguoiDung from './layouts/user/DangKyNguoiDung';
import KichHoatTaiKhoan from './layouts/user/KichHoatTaiKhoan';
import DangNhap from './layouts/user/DangNhap';
import Test from './layouts/user/Test';
import ProfileCaNhan from './layouts/user/ProfileCaNhan';
import FormThemSach from './layouts/admin/FormThemSach';
import FormSuaSach from './layouts/admin/FormSuaSach';

function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');

  return (
    <div className='App'>
      <BrowserRouter>
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
             <Route path='/admin/them-sach' element={<FormThemSach setShowThemSach={undefined} />} />
             <Route path='/profile' element={<ProfileCaNhan tenDangNhap={'/dang-nhap'} />} />
             <Route path='/admin/sua-sach' element={<FormSuaSach setShowSuaSach={undefined} sach={undefined} />} />

        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
