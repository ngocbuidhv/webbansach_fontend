import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { Link } from "react-router-dom";
import { text } from "stream/consumers";
import { Carousel } from "react-responsive-carousel";
import DanhGiaModel from "../../../models/DanhGiaModel";
import { layToanBoDanhGiaCuaMotSach } from "../../../api/DanhGiaAPI";
import { Star, StarFill, StarHalf } from "react-bootstrap-icons";
import { render } from "@testing-library/react";
import renderRating from "../../utils/SaoXepHang";


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
            <h4>ĐÁNH GIÁ VÀ NHẬN XÉT:</h4>
            {danhSachDanhGia.map((danhGia, index) => (
                <div className="row mt-3" key={index}>
                    <div className="col-4 text-end">
                        <p>{renderRating(danhGia.diemXepHang || 0)}</p>
                        <p><strong>Rating:</strong> {danhGia.diemXepHang}</p>
                    </div>
                    <div className="col-8 text-start border-start ps-3">
                        <br/>
                        <p><strong>Review:</strong> {danhGia.nhanXet}</p>
                    </div>
                    <hr/>
                </div>
            ))}
        
        </div>
        
    );
}
export default DanhGiaSanPham;