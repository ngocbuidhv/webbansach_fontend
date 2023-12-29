import { X, XCircle } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { themMotQuyenSach } from "../../../../api/SachAPI";
import dinhDangSo from "../../../utils/DinhDangSo";
import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { writer } from "repl";
import { NavLink } from "react-router-dom";


interface HinhAnh {
  tenHinhAnh: string;
  isIcon: boolean;
  duongDan: string;
  duLieuAnh: null | ArrayBuffer | string;
}
interface props {
  setShowThemSach: any;
}
const FormThemSach: React.FC<props> = ({ setShowThemSach }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [sach, setSach] = useState({
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
    isbn: "",
    moTaChiTiet: "",
    danhSachTheLoai: []
  });

  const [theLoai, setTheLoai] = useState("");
  const [danhSachTheLoai, setDanhSachTheLoai] = useState<string[]>([]);
  const updateTheLoai = () => {
    //lay ra the loai
    if (theLoai && !danhSachTheLoai.includes(theLoai)) {
      setDanhSachTheLoai(prevDanhSach => [...prevDanhSach, theLoai]);
    }
  };
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


  const getAllTheLoai = () => {
    //lay ra the loai
    if (theLoai) {
      danhSachTheLoai.push(theLoai);
    }
    return danhSachTheLoai;
  };

  const handleXoaTheLoai = (theLoai: string) => {
    const newDanhSachTheLoai = danhSachTheLoai.filter(
      (theloai) => theloai !== theLoai
    );
    setDanhSachTheLoai(newDanhSachTheLoai);
  };

  const handleXoaHinhAnh = (hinhAnh: HinhAnh) => {
    const newDanhSach = danhSachHinhAnh.filter((hinhAnh2, index) => hinhAnh2.tenHinhAnh != hinhAnh.tenHinhAnh);

    setDanhSachHinhAnh(newDanhSach);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setBtnLoading(true);
    e.preventDefault();
    //thực hiện lưu
    await themMotQuyenSach(sach, danhSachHinhAnh, danhSachTheLoai);
    setBtnLoading(false);
    setSach({
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
      isbn: "",
      moTaChiTiet: "",
      danhSachTheLoai: []
    });
  };
  const handleCong = () => {
    console.log(danhSachHinhAnh);

    sach.soLuong++;
    setSach({ ...sach });
  };
  const handleTru = () => {
    if (sach.soLuong >= 1) {
      sach.soLuong--;
      setSach({ ...sach });
    } else {
      alert("Số lượng không thể âm!");
    }
  };



  const capNhatMoTaChiTiet = (moTaChiTietMoi: string) => {
    setSach((prevSach) => {
      return { ...prevSach, moTaChiTiet: moTaChiTietMoi };
    });
  };




  return (
    <div className="container">
      <div className='container mt-4 mb-4' style={{ maxWidth: '900px', margin: '0 auto', padding: '2em', background: '#f7f7f7', borderRadius: '8px', border: '1px solid #007BFF', boxShadow: '5px 5px 15px rgba(0,0,0,0.1)' }}>
        <h1 className="mt-1 text-center">Thêm sách</h1>
        <form onSubmit={handleSubmit} className="form">

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
          <div className="mb-3">
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
          </div>
          {/* submit thêm sách */}
          <div className="d-flex justify-content-center container">
            <button
              className="btn btn-primary btn-block btn-lg w-100 "
              type="submit"
            >
              {!btnLoading ? (
                "Thêm sách"
              ) : (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden"></span>
                </div>
              )}
            </button>
          </div>
        </form >
      </div >
    </div >
  );
};

export default FormThemSach;
