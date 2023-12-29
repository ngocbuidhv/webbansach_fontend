import { useEffect, useState } from "react";

import SachModel from "../../../../models/SachModel";
import { capNhatMotQuyenSach, laySachTheoMaSach } from "../../../../api/SachAPI";
import { XCircle } from "react-bootstrap-icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link, useParams } from "react-router-dom";

interface HinhAnh {
    tenHinhAnh: string;
    isIcon: boolean;
    duongDan: string;
    duLieuAnh: null | ArrayBuffer | string;
}

const CapNhatSach: React.FC = () => {
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

    const [danhSachHinhAnh, setDanhSachHinhAnh] = useState<HinhAnh[]>([]);

    const handleHinhAnh = (e: any) => {
        const files = e.target.files;
        if (files.length + danhSachHinhAnh.length > 5) {
            alert("Số lượng hình ảnh không thể vượt quá 5!");
            return;
        }
        let newDanhSachHinhAnh = [...danhSachHinhAnh];
        for (let i = 0; i < files.length; i++) {
            const data = new FileReader();
            data.addEventListener("load", () => {
                newDanhSachHinhAnh.push({
                    tenHinhAnh: files[i].name,
                    isIcon: false,
                    duongDan: files[i].type,
                    duLieuAnh: data.result,
                });
                setDanhSachHinhAnh(newDanhSachHinhAnh);
            });
            data.readAsDataURL(files[i]);
        }
    };
    const handleXoaHinhAnh = (hinhAnh: HinhAnh) => {
        const newDanhSach = danhSachHinhAnh.filter((hinhAnh2, index) => hinhAnh2.tenHinhAnh != hinhAnh.tenHinhAnh);

        setDanhSachHinhAnh(newDanhSach);
    }

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

    const handleCong = () => {
        const soLuongTonKho = (sach && sach.soLuong ? sach.soLuong : 0);
        if (soLuong < soLuongTonKho) {
            setSoLuong(soLuong + 1);
        }
    };

    const handleTru = () => {
        if (soLuong >= 2) {
            setSoLuong(soLuong - 1);
        }
    };


    const handlerUpdateSach = async (e: React.FormEvent) => {
        e.preventDefault();
        //thực hiện lưu
        await capNhatMotQuyenSach(sach.maSach, sach, danhSachHinhAnh);
        setSach(prevSach => ({
            ...prevSach,
            maSach: 0, // thêm thuộc tính maSach
            tenSach: "", //có thể bị null
            giaBan: 0,
            giaNiemYet: 0,
            moTa: "",
            soLuong: 0,
            tenTacGia: "",
            trungBinhXepHang: 0,
            soTrang: 0,
            ngonNgu: "",
            namXB: 0,
            isbn: ""
        }));
    };

    function capNhatMoTaChiTiet(moTaChiTietMoi: string) {
        throw new Error("Function not implemented.");
    }

    function setTheLoai(value: string): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="container">
            <div className='container mt-4 mb-4' style={{ maxWidth: '900px', margin: '0 auto', padding: '2em', background: '#f7f7f7', borderRadius: '8px', border: '1px solid #007BFF', boxShadow: '5px 5px 15px rgba(0,0,0,0.1)' }}>
                <h1 className="mt-1 text-center">Cập nhật sách</h1>
                <form onSubmit={handlerUpdateSach} className="form">
                    {/* Nhập tên sách */}
                    <div className="mb-3">
                        <label htmlFor="tenSach" className="form-label">Nhập tên sách</label>
                        <input
                            type="text"
                            id="tenSach"
                            className="form-control"
                            value={sach.tenSach}
                            placeholder="Tên sách"
                            onChange={(e) => setSach({ ...sach, tenSach: e.target.value })}
                        />
                    </div>

                    {/* Nhập giá */}
                    <div className="row">
                        {/* Nhập giá bán */}
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="giaBan" className="form-label">Nhập giá bán (VNĐ)</label>
                                <input
                                    type="number"
                                    id="giaBan"
                                    className="form-control"
                                    value={sach.giaBan}
                                    onChange={(e) => setSach({ ...sach, giaBan: parseFloat(e.target.value) })}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Nhập giá niêm yết */}
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="giaNiemYet" className="form-label">Nhập niêm yết (VNĐ)</label>
                            <input
                                type="number"
                                id="giaNiemYet"
                                className="form-control"
                                value={sach.giaNiemYet}
                                onChange={(e) => setSach({ ...sach, giaNiemYet: parseFloat(e.target.value) })}
                            />
                        </div>
                    </div>

                    {/* Nhập mô tả */}
                    <div className="mb-3">
                        <label htmlFor="moTa" className="form-label">Nhập mô Tả</label>
                        <input
                            type="text"
                            id="moTa"
                            className="form-control"
                            value={sach.moTa}
                            placeholder="Mô tả không quá 50 từ"
                            onChange={(e) => setSach({ ...sach, moTa: e.target.value })}
                        />
                    </div>

                    <div className="row">
                        {/* Tên tác giả */}
                        <div className=" col mb-3">
                            <label htmlFor="tenTacGia" className="form-label">Nhập tên tác giả</label>
                            <input
                                type="text"
                                id="tenTacGia"
                                className="form-control"
                                value={sach.tenTacGia}
                                placeholder="Tên tác giả"
                                onChange={(e) => setSach({ ...sach, tenTacGia: e.target.value })}
                            />
                        </div>

                        {/* Ngôn ngữ */}
                        <div className="col mb-3">
                            <label htmlFor="ngonNgu" className="form-label">Nhập Ngôn ngữ</label>
                            <input
                                type="text"
                                id="ngonNgu"
                                className="form-control"
                                value={sach.ngonNgu}
                                placeholder="Ngôn ngữ"
                                onChange={(e) => setSach({ ...sach, ngonNgu: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Trung bình xếp hạng, số trang, năm xuất bản, isbn */}
                    <div className="row">
                        {/* Trung bình xếp hạng */}
                        <div className=" col mb-3">
                            <label htmlFor="trungBinhXepHang" className="form-label">Trung bình xếp hạng</label>
                            <input
                                type="number"
                                id="trungBinhXepHang"
                                className="form-control"
                                value={sach.trungBinhXepHang}
                                onChange={(e) => setSach({ ...sach, trungBinhXepHang: parseInt(e.target.value) })}
                            />
                        </div>

                        {/* Số trang */}
                        <div className=" col mb-3">
                            <label htmlFor="soTrang" className="form-label">Nhập số trang sách</label>
                            <input
                                type="number"
                                id="soTrang"
                                className="form-control"
                                value={sach.soTrang}
                                onChange={(e) => setSach({ ...sach, soTrang: parseInt(e.target.value) })}
                            />
                        </div>

                        {/* năm xuất bản  */}
                        <div className=" col mb-3">
                            <label htmlFor="namXB" className="form-label">Nhập năm xuất bản</label>
                            <input
                                type="number"
                                id="namXB"
                                className="form-control"
                                value={sach.namXB}
                                placeholder="Tên tác giả"
                                onChange={(e) => setSach({ ...sach, namXB: parseInt(e.target.value) })}
                            />
                        </div>

                        {/* mã ISBN  */}
                        <div className=" col mb-3">
                            <label htmlFor="isbn" className="form-label">Nhập mã ISBN sách</label>
                            <input
                                type="text"
                                id="isbn"
                                className="form-control"
                                value={sach.isbn}
                                placeholder="Mã ISBN"
                                onChange={(e) => setSach({ ...sach, isbn: e.target.value })}
                            />
                        </div>

                    </div>

                    <div className="row">
                        {/* Số lượng */}
                        <div className="col">
                            <label htmlFor="soLuong" className="form-label">
                                Chọn số lượng
                            </label>
                            <div className="form-floating mb-4 col-2 d-flex justify-content-between">
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    style={{ width: '30px', marginRight: '10px' }}
                                    onClick={() => handleTru()}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    style={{
                                        border: "1px solid rgb(127, 147, 168)",
                                        textAlign: "center",
                                        appearance: "textfield",
                                        borderRadius: "10px",
                                        padding: "5px",
                                        width: '90px'
                                    }}
                                    id="soLuong"
                                    className="form-control form-control-lg"
                                    placeholder="Số Lượng"
                                    value={sach.soLuong}
                                    onChange={(e) =>
                                        setSach({ ...sach, soLuong: parseInt(e.target.value) })
                                    }
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    style={{ width: '30px', marginLeft: '10px' }}
                                    onClick={() => handleCong()}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* upload ảnh */}
                        <div className="mb-3 col">
                            <label htmlFor="duLieuAnh" className="form-label">
                                Chọn hình ảnh
                            </label>
                            <input
                                className="form-control"
                                type="file"
                                id="duLieuAnh"
                                multiple
                                onChange={handleHinhAnh}
                            />
                        </div>
                    </div>
                    <div>

                        <div className="row">
                            {danhSachHinhAnh.map((hinhAnh, index) => (
                                <div className="col-1 position-relative" style={{ padding: '5px', margin: '20px' }}>
                                    <XCircle
                                        size={"20px"}
                                        style={{ position: "absolute", right: "10px", top: "10px", cursor: 'pointer', color: 'red' }}
                                        onClick={() => handleXoaHinhAnh(hinhAnh)}
                                    ></XCircle>
                                    <img
                                        src={hinhAnh.duLieuAnh + ""}
                                        className="rounded"
                                        alt="hinh-anh"
                                        style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mô tả chi tiết  */}
                    <div>
                        <div className="mb-3">
                            <label htmlFor="moTaChiTiet" className="form-label">Nhập mô tả chi tiết</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={sach.moTaChiTiet}
                                onChange={(event, editor) => {
                                    const moTaChiTietMoi: string = editor.getData();
                                    // Cập nhật mô tả chi tiết
                                    capNhatMoTaChiTiet(moTaChiTietMoi);
                                }}
                            ></CKEditor>
                        </div>
                    </div>

                    {/* nút thể loại */}
                    {/* <div className="mb-3">
                        <label htmlFor="theLoai" className="form-label">Thể Loại</label>
                        <select
                            id="theLoaij"
                            className="form-control"
                            value={theLoai}
                            onChange={(e) => setTheLoai(e.target.value)}
                        >
                            {danhSachTheLoai.map((theLoai, index) => (
                                <option key={index} value={theLoai}>
                                    {theLoai}
                                </option>
                            ))}
                            <option value="Hello">
                                Hello
                            </option>
                        </select>
                    </div> */}

                    <div className="d-flex justify-content-center container">
                        <button
                            className="btn btn-primary btn-block btn-lg w-100 "
                            type="submit"
                        >
                            Cập nhật
                        </button>
                    </div>
                </form >
            </div >
        </div >
    );
}
export default CapNhatSach;

