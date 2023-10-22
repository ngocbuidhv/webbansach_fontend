import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { Link } from "react-router-dom";
import { text } from "stream/consumers";
import { Carousel } from "react-responsive-carousel";
import DanhGiaModel from "../../../models/DanhGiaModel";
import { layToanBoDanhGiaCuaMotSach } from "../../../api/DanhGiaAPI";


interface DanhGiaSanPham {
    maSach: number;
}

const DanhGiaSanPham: React.FC<DanhGiaSanPham> = (props) => {

    const maSach: number = props.maSach;

    const [danhSachDanhGia, setdanhSachDanhGia] = useState<DanhGiaModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        layToanBoDanhGiaCuaMotSach(maSach).then(
            danhSachDanhGia => {
                setdanhSachDanhGia(danhSachDanhGia);
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

    console.log(danhSachDanhGia.length);

    // console.log(danhSachDanhGia.length);

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
        <div className="container mt-2 mb-2 text-center">
            <h4>Đánh giá sản phẩm: </h4>
            {
                danhSachDanhGia.map((danhGia, index) => (
                    <div className="d-flex ">
                        <div>
                            <p>{danhGia.diemXepHang} </p>
                        </div>
                        <hr/>
                            <div className="rating">
                                Đánh giá:
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="star">★</span>
                                <span className="star">☆</span>
                            </div>

                            <div>
                                <p>Nhận xét: </p>
                                <p className="ms-3">{danhGia.nhanXet}</p>
                            </div>

                        </div>
                        )
                        )
            }



                    </div>
                );
}
            export default DanhGiaSanPham;