import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import DanhSachSanrPham from "../product/DanhSachSanPham";

function HomePage(){
    return(
        <div>
            <Banner />
            <br/>
            <Carousel />
            <br/>
            <br/>
            <DanhSachSanrPham />
        </div>
    );
}

export default HomePage;