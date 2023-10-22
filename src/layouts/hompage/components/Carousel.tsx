import React, { useEffect, useState } from "react";
import { lay3SachMoiNhat } from "../../../api/SachAPI";
import SachModel from "../../../models/SachModel";
import CarouselItem from "./CarouselItem";


const Carousel: React.FC = (props) => {
    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        lay3SachMoiNhat().then(
            kq => {
                setDanhSachQuyenSach(kq.ketQua);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            }
        );
    }, [] // Chi goi mot lan
    )

    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        );
    }


    return (
        <div>
            <div id="carouselExampleDark" className="carousel carousel-dark slide">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <CarouselItem key={0} sach={danhSachQuyenSach[0]} />
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <CarouselItem key={1} sach={danhSachQuyenSach[1]} />
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <CarouselItem key={2} sach={danhSachQuyenSach[2]} />
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <CarouselItem key={3} sach={danhSachQuyenSach[3]} />
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <CarouselItem key={4} sach={danhSachQuyenSach[4]} />
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <CarouselItem key={5} sach={danhSachQuyenSach[5]} />
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <CarouselItem key={6} sach={danhSachQuyenSach[6]} />
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <CarouselItem key={7} sach={danhSachQuyenSach[7]} />
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <CarouselItem key={8} sach={danhSachQuyenSach[8]} />
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <CarouselItem key={9} sach={danhSachQuyenSach[9]} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Carousel;