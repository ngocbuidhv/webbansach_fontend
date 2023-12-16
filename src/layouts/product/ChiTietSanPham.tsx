import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { text } from "stream/consumers";
import { URLSearchParams } from "url";
import SachModel from "../../models/SachModel";
import { laySachTheoMaSach } from "../../api/SachAPI";
import { error } from "console";
import DanhGiaSanPham from "./components/DanhGiaSanPham";
import HinhAnhSanPham from "./components/HinhAnhSanPham";
import renderRating from "../utils/SaoXepHang";
import dinhDangSo from "../utils/DinhDangSo";

interface TheLoaiInterface {
    maTheLoai: number;
    tenTheLoai: string;
}


const ChiTietSanPham: React.FC = () => {
    // Lấy mã sách từ URL
    const { maSach } = useParams();

    let maSachNumber = 0;
    try {
        maSachNumber = parseInt(maSach + '');
        if (Number.isNaN(maSachNumber))
            maSachNumber = 0;
    } catch (error) {
        maSachNumber = 0;
        console.error("Error", error);
    }

    // Khai báo
    const [sach, setSach] = useState<SachModel | null>(null);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [soLuong, setSoLuong] = useState(1);
    const [thugon, setThuGon] = useState(false);

    const tangSoLuong = () => {
        const soLuongTonKho = (sach && sach.soLuong ? sach.soLuong : 0);
        if (soLuong < soLuongTonKho) {
            setSoLuong(soLuong + 1);
        }
    }
    const giamSoLuong = () => {
        if (soLuong >= 2) {
            setSoLuong(soLuong - 1);
        }
    }

    const handleSoLuongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const soLuongMoi = parseInt(event.target.value);
        const soLuongTonKho = (sach && sach.soLuong ? sach.soLuong : 0);
        if (!isNaN(soLuongMoi) && soLuongMoi >= 1 && soLuongMoi <= soLuongTonKho) {
            setSoLuong(soLuongMoi);
        }
    }

    const handleMuaNgay = () => {

    }

    const handleThemVaoGioHang = () => {

    }

    const chuyenVanBan = () => {
        setThuGon(!thugon);
    }

    const thuGonVanBan = sach?.moTaChiTiet && sach.moTaChiTiet.length > 900 ? `${sach.moTaChiTiet.substring(0, 900)}...` : sach?.moTaChiTiet;

    useEffect(() => {
        laySachTheoMaSach(maSachNumber)
            .then((sach) => {
                setSach(sach);
                setDangTaiDuLieu(false);
            }
            )
            .catch((error) => {
                setBaoLoi(error.message);
                setDangTaiDuLieu(false);
            })
    }, [maSach]
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

    if (!sach) {
        return (
            <div>
                <h1>Sách không tồn tại!</h1>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                <div className="col-4">
                    <HinhAnhSanPham maSach={maSachNumber} />
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-8">
                            <h1>
                                {sach.tenSach}
                            </h1>
                            <h3>
                                {renderRating(sach.trungBinhXepHang ? sach.trungBinhXepHang : 0)}
                            </h3>
                            <h3>
                                <span className="original-price" >
                                    <strong style={{ color: '#474747' }}>
                                        {dinhDangSo(sach.giaBan)} đ
                                    </strong>
                                </span>
                                <span className=" discounted-price" style={{ marginLeft: '10px' }}>
                                    <del style={{ color: '#FF7979' }}>
                                        <em>{dinhDangSo(sach.giaNiemYet)} đ </em>
                                    </del>
                                </span>
                            </h3>
                            <hr />
                            <div className="row">
                                <div className="col-12">
                                    <p className="mb-4">
                                        <strong>Thể loại:</strong> <em>{sach.moTa}</em>
                                    </p>
                                    <p className="mb-4">
                                        <strong>Số trang sách:</strong> <em>{sach.soTrang}</em>
                                    </p>
                                    <p className="mb-4">
                                        <strong>Năm xuất bản:</strong> <em>{sach.namXB}</em>
                                    </p>
                                    <p className="">
                                        <strong>Ngôn ngữ:</strong> <em>{sach.ngonNgu}</em>
                                    </p>

                                </div>
                            </div>
                            <hr />
                            <div style={{ textAlign: 'justify', textJustify: 'inter-word', lineHeight: '1.6', maxWidth: '600px' }}>
                                <p>
                                    <strong>Nội dung: </strong>
                                    {sach.moTa}
                                </p>
                            </div>

                        </div>
                        <div className="col-4">
                            <div>
                                <div className="mb-2">Số lượng</div>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-outline-secondary me-2" onClick={giamSoLuong}>-</button>
                                    <input
                                        className="form-control text-center"
                                        type="number"
                                        value={soLuong}
                                        min={1}
                                        onChange={handleSoLuongChange}
                                    />
                                    <button className="btn btn-outline-secondary ms-2" onClick={tangSoLuong}>+</button>
                                </div>
                                {
                                    sach.giaBan && (
                                        <div className="mt-2 text-center">
                                            Số tiền tạm tính <br />
                                            <h3><strong>{dinhDangSo(soLuong * sach.giaBan)} đ </strong></h3>
                                        </div>
                                    )
                                }
                                <div className="d-grid gap-2">
                                    <button type="button" className="btn btn-danger mt-3" onClick={handleMuaNgay}>Mua ngay</button>
                                    <button type="button" className="btn btn-outline-secondary mt-2" onClick={handleThemVaoGioHang}>Thêm vào giỏ hàng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                    <strong>Nội dung: </strong>
                    {thugon ? sach.moTaChiTiet : thuGonVanBan}
                </p>
                {sach.moTaChiTiet && sach.moTaChiTiet.length > 900 && (
                    <div style={{ textAlign: 'center' }}>
                        <button className="btn btn-danger mt-4" style={{ backgroundColor: 'orange', borderColor: 'orange' }} onClick={chuyenVanBan}>
                            {thugon ? 'Thu gọn' : 'Xem thêm'}
                        </button>
                    </div>
                )}
            </div>

            <div className="row mt-4 mb-4">
                <DanhGiaSanPham maSach={maSachNumber} />
            </div>
        </div>
    );
}
export default ChiTietSanPham;