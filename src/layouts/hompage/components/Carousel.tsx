import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhAnhAPI";

interface CarouselInterface{
    sach: SachModel;
}

const Carousel: React.FC<CarouselInterface> = (props) => {

    const maSach:number = props.sach.maSach;

    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
      layToanBoAnhCuaMotSach(maSach).then(
        hinhAnhData =>{
            setDanhSachAnh(hinhAnhData);
            setDangTaiDuLieu(false);
        }
      ).catch(
        error => {
            setDangTaiDuLieu(false);
            setBaoLoi(error.message);
        }
      );
    }, [])
    
    if (dangTaiDuLieu){
        return(
            <div>
                <h5>Đang tải dữ liệu</h5>
            </div>
        );
    }

    if(baoLoi){
        return(
            <div>
                <h5>Gặp lỗi: {baoLoi}</h5>
            </div>
        );
    }

    let duLieuAnh:string="";
    if(danhSachAnh[0] && danhSachAnh[0].duLieuAnh){
        duLieuAnh=danhSachAnh[0].duLieuAnh;
    }

    return (
        <div className="row align-items-center">
            <div className="col-lg-5 col-md-6 text-center">
                <img src={duLieuAnh} alt={props.sach.tenSach} className="img-fluid" style={{ maxWidth: '100%' }} />
            </div>
            <div className="col-lg-7 col-md-6">
                <div className="text-center text-md-start">
                    <h3 className="display-4">{props.sach.tenSach}</h3>
                    <p className="lead">{props.sach.moTa}</p>
                </div>
            </div>
        </div>
    );
}

export default Carousel;