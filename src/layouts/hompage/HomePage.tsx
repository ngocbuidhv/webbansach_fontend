import React from "react";
import Banner from "./components/Banner";
import DanhSachSanrPham from "../product/DanhSachSanPham";
import DanhSachCarousel from "../product/DanhSachHotBookl";
import Hotbook from "./components/Slide";
import Slide from "./components/Slide";
import DanhSachHotbook from "../product/DanhSachHotBookl";
import Carousel from "./components/Carousel";

function HomePage() {
    return (
        <div>
            <Banner />
            <Slide />

            {/* liệt kê toàn bộ sách trên một băng chuyền */}
            {/* <h5>
                <strong>Sách đề cử</strong>
            </h5>
            <DanhSachHotbook /> */}

            <h5>
                <strong>Sách mới nhất</strong>
            </h5>
            <Carousel />

            <h5>
                <strong>Thư viện sách</strong>
            </h5>

            <DanhSachSanrPham />
        </div>

    );
}

export default HomePage;