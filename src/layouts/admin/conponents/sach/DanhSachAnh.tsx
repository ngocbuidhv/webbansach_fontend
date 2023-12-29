import React, { useEffect, useState } from "react";
import SachModel from "../../../../models/SachModel";
import HinhAnhModel from "../../../../models/HinhAnhModel";
import { lay1AnhCuaMotSach, layToanBoAnhCuaMotSach } from "../../../../api/HinhAnhAPI";


interface DanhSachAnhInterface {
    sach: SachModel;
}

const DanhSachAnh: React.FC<DanhSachAnhInterface> = (props) => {

    const maSach: number = props.sach.maSach;

    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        layToanBoAnhCuaMotSach(maSach).then(
            hinhAnhData => {
                setDanhSachAnh(hinhAnhData);
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

    let duLieuAnh: string = "";
    if (danhSachAnh[0] && danhSachAnh[0].duLieuAnh) {
        duLieuAnh = danhSachAnh[0].duLieuAnh;
    }

    return (
            <div>
                <img src={duLieuAnh} style={{width: "50px", height: "60px"}}/>
            </div>
    );
}
export default DanhSachAnh;