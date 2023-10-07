import React, { useEffect, useState } from "react";
import Carousel from "../hompage/components/Carousel";
import { layToanBoSach } from "../../api/SachAPI";
import SachModel from "../../models/SachModel";

const DanhSachCarousel: React.FC = () => {

    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        layToanBoSach().then(
            sachData => {
                setDanhSachQuyenSach(sachData);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setBaoLoi(error.message);
            }
        );
    }, [] // chỉ gọi 1 lần
    )
    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        )
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        )
    }


    return (
        <div>
            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                <div className="carousel-inner"></div>
                <div className="container">

                    <div className="row mt-4">
                        {
                            danhSachQuyenSach.map((sach, index) => (

                                <div className={`carousel-item ${index == 0 ? 'active' : ''}` } data-bs-interval="10000">
                                    <Carousel key={sach.maSach} sach={sach} />
                                </div>
                            ))
                        }
                    </div>
                    <div>
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
            </div>

        </div>
    )
}

export default DanhSachCarousel;