import { X, XCircle, XCircleFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import HinhAnhModel from "../../models/HinhAnhModel";
import { layToanBoAnhCuaMotSach } from "../../api/HinhAnhAPI";


interface props {
  setShowSuaSach: any;
  sach: any;
}

const FormSuaSach: React.FC<props> = ({ setShowSuaSach, sach }) => {
  const [theLoai, setTheLoai] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [danhSachHinhAnh, setDanhSachHinhAnh] = useState<HinhAnhModel[]>([]);
  const [danhSachHinhAnhTemp, setDanhSachHinhAnhTemp] = useState<HinhAnhModel[]>([]);  //lưu danh sách hình ảnh ban đầu

  const [sachUpdate, setSachUpdate] = useState({
    maSach: sach.maSach,
    tenSach: sach.tenSach,
    tenTacGia: sach.tenTacGia,
    giaBan: sach.giaBan,
    giaNiemYet: sach.giaNiemYet,
    moTa: sach.moTa,
    soLuong: sach.soLuong,
    trungBinhXepHang: sach.trungBinhXepHang,
    danhSachTheLoai: sach.danhSachTheLoai,
    isbn: sach.isbn,
  });

  //gọi api lấy hình ảnh
  useEffect(() => {
    layToanBoAnhCuaMotSach(sach.maSach).then(data =>{
      setDanhSachHinhAnh(data);
      setDanhSachHinhAnhTemp(data);
    }).catch(error =>console.log("Lỗi tại sửa sách: ",error)
    )
  }, []);

  const handleCong = () => {
    sachUpdate.soLuong++;
    setSachUpdate({ ...sachUpdate });
  };
  const handleTru = () => {
    if (sachUpdate.soLuong > 0) {
      sachUpdate.soLuong--;
      setSachUpdate({ ...sachUpdate });
    } else {
      alert("Số lượng không thể âm!");
    }
  };

  const handleTheLoai = () => {
    //lay ra the loai
    if (theLoai) {
      sachUpdate?.danhSachTheLoai?.push(theLoai);
      //set ve rong
      setTheLoai("");
    }
  };
  const handleXoaTheLoai = (theLoai: string) => {
    const newDanhSachTheLoai = sachUpdate.danhSachTheLoai.filter(
      (theloai: string) => theloai !== theLoai
    );
    setSachUpdate({ ...sachUpdate, danhSachTheLoai: newDanhSachTheLoai });
  };

//   const handleCapNhat = async (e: React.FormEvent) => {
//     setBtnLoading(true);
//     e.preventDefault();
//     const token = localStorage.getItem('token')

    
//     for(const hinhAnh of danhSachHinhAnhTemp){
//       if(hinhAnh.maHinhAnh != -1){
//         await xoaHinhAnh(hinhAnh.maHinhAnh, token)
//       }
//     }
//     await capNhatMotQuyenSach(sachUpdate, sachUpdate.danhSachTheLoai, danhSachHinhAnh);
//     setBtnLoading(false);
//   };

//   const handleHinhAnh = (e: any) => {
//     const files = e.target.files;
//     for (let i = 0; i < files.length; i++) {
//       const data = new FileReader();
//       data.addEventListener("load", () => {
//         danhSachHinhAnh.push({
//           maHinhAnh: -1,             //hình ảnh nào đc thêm mới ta sẽ xem như id là -1
//           tenHinhAnh: files[i].name,
//           isIcon: false,
//           duongDan: files[i].type,
//           duLieuAnh: data.result,
//         });
//         setDanhSachHinhAnh(danhSachHinhAnh);
//       });
//       data.readAsDataURL(files[i]);
//     }
//   };

  const handleXoaHinhAnh = (hinhAnh: HinhAnhModel)=>{
    const newDanhSach = danhSachHinhAnh.filter((hinhAnh2, index) => hinhAnh2.duLieuAnh != hinhAnh.duLieuAnh);
    console.log(newDanhSach);
    
    setDanhSachHinhAnh(newDanhSach);
  }


  return (
    <div className="container mb-5 p-5 pe-0 popup-sua-sach">
      <XCircle
        size={"60px"}
        style={{
          position: "absolute",
          top: "2%",
          right: "2%",
          cursor: "pointer",
        }}
        onClick={() => setShowSuaSach(false)}
      ></XCircle>
      <h1 className="text-start ">Chỉnh Sửa Sách</h1>
      <form
        className="form  text-start"
        style={{ width: "90%" }}
        // onSubmit={handleCapNhat}
      >
        <div className="row ">
          {/* ten sách */}
          <div className="form-floating mb-4 col-6">
            <input
              style={{ border: "1px solid rgb(127, 147, 168)" }}
              type="text"
              id="tenSach"
              className="form-control form-control-lg"
              placeholder="Tên Sách"
              value={sachUpdate.tenSach}
              onChange={(e) =>
                setSachUpdate({ ...sachUpdate, tenSach: e.target.value })
              }
            />
            <label className="form-label" htmlFor="tacGia">
              Tên Sách
            </label>
            <span className="position-absolute text-danger"></span>
          </div>
          <div className="form-floating mb-4 col-6">
            <input
              style={{ border: "1px solid rgb(127, 147, 168)" }}
              type="text"
              id="giaBan"
              className="form-control form-control-lg"
              placeholder="Giá bán"
              value={sachUpdate.giaBan}
              onChange={(e) =>
                setSachUpdate({ ...sachUpdate, giaBan: e.target.value })
              }
            />
            <label className="form-label" htmlFor="tacGia">
              Giá bán
            </label>
            <span className="position-absolute text-danger"></span>
          </div>
        </div>

        <div className="row">
          <div className="form-floating mb-4 col-6">
            <input
              style={{ border: "1px solid rgb(127, 147, 168)" }}
              type="text"
              id="tacGia"
              className="form-control form-control-lg"
              placeholder="Tác Giả"
              value={sachUpdate.tenTacGia}
              onChange={(e) =>
                setSachUpdate({ ...sachUpdate, tenTacGia: e.target.value })
              }
            />
            <label className="form-label" htmlFor="tacGia">
              Tác Giả
            </label>
            <span className="position-absolute text-danger"></span>
          </div>
          <div className="form-floating mb-4 col-6">
            <input
              style={{ border: "1px solid rgb(127, 147, 168)" }}
              type="text"
              id="giaNiemYet"
              className="form-control form-control-lg"
              placeholder="Giá Niêm Yet"
              value={sachUpdate.giaNiemYet}
              onChange={(e) =>
                setSachUpdate({ ...sachUpdate, giaNiemYet: e.target.value })
              }
            />
            <label className="form-label" htmlFor="giaNiemYet">
              Giá Niêm Yet
            </label>
            <span className="position-absolute text-danger"></span>
          </div>
        </div>
        <div className="row">
          <div className="form-floating mb-4 col-8">
            <input
              style={{ border: "1px solid rgb(127, 147, 168)" }}
              type="text"
              id="moTa"
              className="form-control form-control-lg"
              placeholder="Mô Tả"
              value={sachUpdate.moTa}
              onChange={(e) =>
                setSachUpdate({ ...sachUpdate, moTa: e.target.value })
              }
            />
            <label className="form-label" htmlFor="moTa">
              Mô Tả
            </label>
          </div>
          <div className="form-floating mb-4 col-2 d-flex">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => handleTru()}
            >
              -
            </button>
            <input
              type="number"
              style={{ border: "1px solid rgb(127, 147, 168)" }}
              id="soLuong"
              className="form-control form-control-lg"
              placeholder="Số Lượng"
              value={sachUpdate.soLuong}
              onChange={(e) =>
                setSachUpdate({ ...sachUpdate, soLuong: e.target.value })
              }
            />
            <label className="form-label ms-5" htmlFor="soLuong">
              Số lượng
            </label>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => handleCong()}
            >
              +
            </button>
          </div>
        </div>
        {/* Thể loại */}
        <div className="row">
          <div className=" col-4">
            <div className="input-group form-floating mb-4">
              <input
                style={{ border: "1px solid rgb(127, 147, 168)" }}
                type="text"
                id="theLoai"
                className="form-control"
                placeholder="Thể loại"
                aria-label="Thể loại"
                aria-describedby="button-addon2"
                value={theLoai}
                onChange={(e) => setTheLoai(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={handleTheLoai}
              >
                Thêm
              </button>
              <label className="form-label" htmlFor="tenSach">
                Thể Loại
              </label>
              <span className="position-absolute text-danger"></span>
            </div>
            {sachUpdate.danhSachTheLoai?.map(
              (theLoai: string, index: number) => (
                <div id="tag-the-loai" className="m-1">
                  {theLoai}{" "}
                  <X
                    className="icon-x"
                    onClick={() => handleXoaTheLoai(theLoai)}
                  />
                </div>
              )
            )}
          </div>
          <div className="form-floating mb-4 col-3">
            <input
              style={{ border: "1px solid rgb(127, 147, 168)" }}
              type="text"
              id="isbn"
              className="form-control form-control-lg"
              placeholder="isbn"
              value={sachUpdate.isbn}
              onChange={(e) =>
                setSachUpdate({ ...sachUpdate, isbn: e.target.value })
              }
            />
            <label className="form-label" htmlFor="moTa">
              ISBM
            </label>
          </div>
          <div className="form-floating mb-4 col-2">
            <input
              type="number"
              step={0.1}
              id="trungBinhXepHang"
              className="form-control form-control-lg"
              placeholder="Trung bình xếp hạng"
              style={{ border: "1px solid rgb(127, 147, 168)" }}
              value={sachUpdate.trungBinhXepHang}
              onChange={(e) =>
                setSachUpdate({
                  ...sachUpdate,
                  trungBinhXepHang: e.target.value,
                })
              }
            />
            <label className="form-label" htmlFor="tacGia">
              Trung Bình Xếp hạng
            </label>
            <span className="position-absolute text-danger"></span>
          </div>
          <div className="mb-3 col-2" style={{ translate: "0px -10px" }}>
            <label htmlFor="formFileMultiple" className="form-label">
              Thêm hình ảnh
            </label>
            <input
              className="form-control"
              type="file"
              id="formFileMultiple"
              multiple
            //   onChange={handleHinhAnh}
            />
          </div>
        </div>
        <div className="row  justify-content-end">
          {danhSachHinhAnh.map((hinhAnh, index) => (
            <div className="col-1 position-relative">
              <XCircle
                size={"20px"}
                style={{ position: "absolute", right: "10px" , cursor:'pointer'}}
                onClick={()=>handleXoaHinhAnh(hinhAnh)}
              ></XCircle>
              <img
                src={hinhAnh.duLieuAnh + ""}
                className="rounded float-end"
                alt="hinh-anh"
                width={"100%"}
              />
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center container gap-3">
          <button
            className="btn btn-primary btn-block btn-lg w-100 "
            type="submit"
          >
            {!btnLoading ? (
              "Lưu Chỉnh Sửa"
            ) : (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden"></span>
              </div>
            )}
          </button>
          <button
            className="btn btn-danger btn-block btn-lg w-100 "
            type="button"
            onClick={() => setShowSuaSach(false)}
          >
            Huỷ Bỏ
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSuaSach;
