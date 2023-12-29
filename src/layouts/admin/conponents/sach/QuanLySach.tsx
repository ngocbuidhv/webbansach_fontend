import { ChangeEvent, SetStateAction, useCallback, useEffect, useState } from "react";
import SachModel from "../../../../models/SachModel";
import { lay6CuonSach, layToanBoSach, timKiemSach, xoaSachTheoMaSach } from "../../../../api/SachAPI";
import { PhanTrang } from "../../../utils/PhanTrang";
import { Link, NavLink, useParams } from "react-router-dom";
import DanhSachAnh from "./DanhSachAnh";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Search } from "react-bootstrap-icons";




const QuanLySach: React.FC = () => {
  const [sach, setSach] = useState<SachModel[]>([]);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [tongSoTrang, setTongSoTrang] = useState(0);
  const [tongSoSach, setTongSoSach] = useState(0);

  const layDuLieu = useCallback(() => {
    lay6CuonSach(trangHienTai - 1)
      .then((data: { ketQua: SetStateAction<SachModel[]>; tongSoTrang: SetStateAction<number>; tongSoSach: SetStateAction<number>; }) => {
        setSach(data.ketQua);
        setTongSoTrang(data.tongSoTrang);
        setTongSoSach(data.tongSoSach);
      })
      .catch((error: any) => {
        console.log(`Lỗi quản lý sách: ${error}`);
      });
  }, [trangHienTai]);

  useEffect(layDuLieu, [layDuLieu]);


  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
  const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState('');

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTuKhoaTamThoi(e.target.value)
  }

  const handerSearch = () => {
    setTuKhoaTimKiem(tuKhoaTamThoi);
  }

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handerSearch();
    }
  };

  const phanTrang = (trang: number) => {
    setTrangHienTai(trang);
  };

  const handlerXoaSach = async (maSach: number) => {
    try {
        await xoaSachTheoMaSach(maSach);
        console.log(`Đã xoá sách có mã: ${maSach}`);
        window.location.reload();  // Tải lại trang
    } catch (error) {
        console.error("Lỗi khi thực hiện hàm xoaSachTheoMaSach: ", error);
    }
}

  return (
    <div className="container">
      <div className="row">
        <div className="col-8 d-flex">
          <NavLink className="btn btn-info" style={{ marginRight: '10px', backgroundColor: '#48C602' }} to='/admin/them-sach'>
            Thêm mới
          </NavLink>
        </div>
        <div className="col-4">
          <div className="input-group">
            <input
              className="form-control"
              type="search"
              placeholder="Tìm kiếm"
              aria-label="Search"
              onChange={onSearchInputChange}
              value={tuKhoaTamThoi}
              onKeyUp={handleKeyUp}
            />
            <button className="btn btn-outline-success" type="button" onClick={handerSearch}>
              <Search />
            </button>
          </div>
        </div>
      </div>


      <table className="table table-bordered table-striped mb-4 mt-4 ">
        <thead className="table-info">
          <tr>
            <th className="mb-4" style={{ textAlign: "center" }}>STT</th>
            <th>Tên sách</th>
            <th className="text-center">Hình ảnh</th>
            <th className="text-center">Giá bán</th>
            <th>SL</th>
            <th>Tác giả</th>
            <th className="text-center">Ngôn ngữ</th>
            <th className="text-center">Năm XB</th>
            <th>Thể loại</th>
            <th>Xem chi tiết</th>
            <th className="text-center">Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody id="data">
          {sach.map((sach, index) => (
            <tr key={index}>
              <td>
                <div style={{ marginTop: "1.2rem", textAlign: "center" }}>
                  {index + 1}
                </div>
              </td>

              <td style={{ width: "30ch", whiteSpace: "normal" }}>
                <div style={{ marginTop: "1.1rem" }}>
                  {sach.tenSach}
                </div>
              </td>

              <td className="text-center">
                <DanhSachAnh key={sach.maSach} sach={sach} />
              </td>
              <td className="text-center">
                <div style={{ marginTop: "1.3rem" }}>
                  {sach.giaBan} VNĐ
                </div>
              </td>
              <td className="text-center">
                <div style={{ marginTop: "1.3rem" }}>
                  {sach.soLuong}
                </div>
              </td>

              <td style={{ width: "20ch", whiteSpace: "normal" }}>
                <div style={{ marginTop: "1.3rem" }}>
                  {sach.tenTacGia}
                </div>
              </td>
              <td className="text-center">
                <div style={{ marginTop: "1.3rem" }}>
                  {sach.ngonNgu}
                </div>
              </td>
              <td className="text-center">
                <div style={{ marginTop: "1.3rem" }}>
                  {sach.namXB}
                </div>
              </td>
              <td>{/* Thể loại */}</td>
              <td>
                <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <Link to={`/admin/xem-sach/${sach.maSach}`}>
                    <button className="btn btn-outline-primary" style={{ marginRight: '10px' }}>

                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </Link>
                </div>
              </td>
              <td className="text-center">
                
                <div style={{ marginTop: "1rem" }}>
                  <Link to={`/admin/sua-sach/${sach.maSach}`} className="btn btn-info"
                    style={{ marginRight: '10px' }}
                  > Chỉnh sửa </Link>
                    <a className="btn btn-warning" onClick={() => handlerXoaSach(sach.maSach)}>Xóa</a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination" id="pagination"></div>
      <div className="mt-0.5">
        <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang} />
      </div>
    </div>
  );
};
export default QuanLySach;



