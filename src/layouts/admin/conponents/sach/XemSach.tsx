import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SachModel from "../../../../models/SachModel";
import HinhAnhSanPham from "../../../product/components/HinhAnhSanPham";
import renderRating from "../../../utils/SaoXepHang";
import dinhDangSo from "../../../utils/DinhDangSo";
import parse from 'html-react-parser';
import { laySachTheoMaSach } from "../../../../api/SachAPI";


const XemSach: React.FC = () => {
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
    const [thugon, setThuGon] = useState(false);

    useEffect(() => {
        laySachTheoMaSach(maSachNumber).then(response => {
            // console.log(response);
            setSach(response);
            setDangTaiDuLieu(false);
        }).catch(error => {
            setBaoLoi(error.message);
            setDangTaiDuLieu(false);
        })
    }, [])

    const chuyenVanBan = () => {
        setThuGon(!thugon);
    }


    const thuGonVanBan = sach?.moTaChiTiet && sach.moTaChiTiet.length > 900 ? `${sach.moTaChiTiet.substring(0, 900)}...` : sach?.moTaChiTiet;

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

                        {/* Mô tả chi tiêt */}
                        <div className="mb-3">
                            <label htmlFor="moTaChiTiet" className="form-label">Nội dung:</label>
                            <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', lineHeight: '1.6', textAlign: 'justify' }}>
                                {thugon ? (sach.moTaChiTiet ? parse(sach.moTaChiTiet) : '') : (thuGonVanBan ? parse(thuGonVanBan) : '')}
                            </div>
                            {sach.moTaChiTiet && sach.moTaChiTiet.length > 900 && (
                                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                                    <button className="btn btn-danger" style={{ backgroundColor: 'orange', borderColor: 'orange' }} onClick={chuyenVanBan}>
                                        {thugon ? 'Thu gọn' : 'Xem thêm'}
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}
export default XemSach;
