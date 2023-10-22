import React from "react";
import Banner from "./components/Banner";
import DanhSachSanPham from "../product/DanhSachSanPham";
import Hotbook from "./components/Slide";
import Slide from "./components/Slide";
import Carousel from "./components/Carousel";
import { useParams } from "react-router-dom";

interface HomePageProps {
    tuKhoaTimKiem: string
}
function HomePage({ tuKhoaTimKiem }: HomePageProps) {
    const { maTheLoai } = useParams();
    let maTheLoaiNumber = 0;

    try {
        maTheLoaiNumber = parseInt(maTheLoai + ''); //NAN
    } catch (error) {
        maTheLoaiNumber = 0;
        console.error('ERORR', error);
    }
    if (Number.isNaN(maTheLoaiNumber))
        maTheLoaiNumber = 0;

    return (
        <div>
            <Banner />
            <Slide />

            {/* liệt kê toàn bộ sách trên một băng chuyền
            <h5>
                <strong>Sách đề cử</strong>
            </h5>
            <DanhSachHotbook />  */}
            <div  className="mb-4">
                <h5 style={{ textAlign: 'center', color: '#FF4500', fontSize: '2em' }}>
                    <strong>Sách mới nhất</strong>
                </h5>
            </div>
            <Carousel />
            <div  className="mt-4">
                <h5 style={{ textAlign: 'center', color: '#FF4500', fontSize: '2em' }}>
                    <strong>Thư viện sách</strong>
                </h5>
            </div>


            <DanhSachSanPham tuKhoaTimKiem={tuKhoaTimKiem} maTheLoai={maTheLoaiNumber} />
        </div>

    );
}

export default HomePage;