import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { text } from "stream/consumers";
import { URLSearchParams } from "url";
import SachModel from "../../models/SachModel";
import { laySachTheoMaSach } from "../../api/SachAPI";
import { error } from "console";


const ChiTietSanPham: React.FC = () => {
    // lấy mã sách từ URL
    const {maSach} = useParams();
    let maSachNumber = 0;
    try {
        maSachNumber = parseInt(maSach + ``);
        if(Number.isNaN(maSachNumber))
            maSachNumber = 0;
    } catch (error){
        maSachNumber = 0;
        console.error("Error", error);
    }

    // khai báo
    const [sach, setSach] = useState<SachModel|null>(null);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    useEffect(()=>{
        laySachTheoMaSach(maSachNumber)
        .then((sach)=>{
            setSach(sach);
            setDangTaiDuLieu(false);
        }
        )
        .catch((error)=>{
            setBaoLoi(error.message);
            setDangTaiDuLieu(false);
        }
        )
        
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

    if (!sach){
        return(
            <div>
                <h1>Sách không tồn tại</h1>
            </div>
        )
    }
    return (
        <div className="container">
    <div className="row mt-4 mb-4">
        <div className="col-4">
            <h5>maSach:{maSachNumber}</h5>
        </div>
        <div className="col-8">
    <h1>{sach.tenSach}</h1>
    <h4>{sach.trungBinhXepHang}</h4>
    <h4>{sach.giaBan}</h4>
    <hr/>
    <div dangerouslySetInnerHTML={{__html: (sach.moTa+'')}}/>
    <hr/>
</div>
<div className="col-4">
    {/* Bất kỳ nội dung nào bạn muốn thêm vào đây */}
</div>
<div className="col-4">
    <h5>maSach:{maSachNumber}</h5>
</div>
<div className="col-8">
    <h4>MUA HÀNG</h4>
</div>

    </div>
</div>

    );
}
export default ChiTietSanPham;