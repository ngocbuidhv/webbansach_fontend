import React from "react";
import Banner from "./components/Banner";
import DanhSachSanPham from "../product/DanhSachSanPham";
import DanhSachCarousel from "../product/DanhSachHotBookl";
import Hotbook from "./components/Slide";
import Slide from "./components/Slide";
import DanhSachHotbook from "../product/DanhSachHotBookl";
import Carousel from "./components/Carousel";
import { useParams } from "react-router-dom";

interface HomePageProps{
    tuKhoaTimKiem: string
}
function HomePage({tuKhoaTimKiem} : HomePageProps) {
    const {maTheLoai} = useParams();
    let maTheLoaiNumber = 0;

    try {
        maTheLoaiNumber = parseInt(maTheLoai+''); //NAN
    } catch (error) {
        maTheLoaiNumber = 0;
        console.error('ERORR', error);
    }
    if(Number.isNaN(maTheLoaiNumber))
        maTheLoaiNumber =0;

    return (
        <div>
            <Banner />
            <Slide />

            {/* liệt kê toàn bộ sách trên một băng chuyền
            <h5>
                <strong>Sách đề cử</strong>
            </h5>
            <DanhSachHotbook />  */}

            <h5>
                <strong>Sách mới nhất</strong>
            </h5>
            <Carousel />

            <h5>
                <strong>Thư viện sách</strong>
            </h5>

            <DanhSachSanPham tuKhoaTimKiem={tuKhoaTimKiem} maTheLoai = {maTheLoaiNumber}/>
        </div>

    );
}

export default HomePage;