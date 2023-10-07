import React from "react";
import Banner from "./components/Banner";
import DanhSachSanrPham from "../product/DanhSachSanPham";
import DanhSachCarousel from "../product/DanhSachCarousel";

function HomePage(){
    return(
        <div>
            <Banner />
            <br/>
            <DanhSachCarousel />
            <br/>
            <br/>
            <DanhSachSanrPham />
        </div>
    );
}

export default HomePage;