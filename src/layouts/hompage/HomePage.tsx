import React from "react";
import Banner from "./components/Banner";
import DanhSachSanrPham from "../product/DanhSachSanPham";
import DanhSachCarousel from "../product/DanhSachCarousel";
import Hotbook from "./components/Slide";
import Slide from "./components/Slide";

function HomePage() {
    return (
        <div>
            <Banner />
            <Slide />

            <h5>
                <strong>Sách Hot</strong>
            </h5>
            <DanhSachCarousel />

            <h3>
                <strong>Sách đề cử</strong>
            </h3>

            <DanhSachSanrPham />
        </div>

    );
}

export default HomePage;