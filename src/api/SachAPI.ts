import React from "react";
import SachModel from "../models/SachModel";
import { my_request } from "./Request";

interface KetQuaInterface{
    ketQua: SachModel[];
    tongSoTrang: number;
    tongSoSach: number;
}

async function laySach(duongDan: string): Promise<KetQuaInterface> {
    const ketQua: SachModel[] = [];

    // Gọi phương thức request
    const response = await my_request(duongDan);

    // Lấy ra json sach
    const responseData = response._embedded.saches;
    console.log(responseData);

    // lấy thông tin trang
    const tongSoTrang:number = response.page.totalPages;
    const tongSoSach: number = response.page.totalElements;

    for (const key in responseData) {
        ketQua.push({
            maSach: responseData[key].maSach,
            tenSach: responseData[key].tenSach,
            giaBan: responseData[key].giaBan,
            giaNiemYet: responseData[key].giaNiemYet,
            moTa:responseData[key].moTa,
            soLuong:responseData[key].soLuong,
            tenTacGia:responseData[key].tenTacGia,
            trungBinhXepHang:responseData[key].trungBinhXepHang
        });
    }

    return {ketQua: ketQua, tongSoSach: tongSoTrang, tongSoTrang: tongSoTrang};
}

export async function layToanBoSach(trang: number): Promise<KetQuaInterface> {
   
    // Xác định endpoint
    const duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=16&page=${trang}`;

    return laySach(duongDan);

}

export async function layToanBoSachHotBook(): Promise<KetQuaInterface> {
   
    // Xác định endpoint
    const duongDan: string = 'http://localhost:8080/sach?sort=maSach';

    return laySach(duongDan);

}


export async function lay3SachMoiNhat(): Promise<KetQuaInterface> {
   
    // Xác định endpoint
    const duongDan: string = 'http://localhost:8080/sach?sort=maSach,desc&page=0&size=10';

    return laySach(duongDan);

}

export async function timKiemSach(tuKhoaTimKiem: string): Promise<KetQuaInterface> {

    // Xác định endpoint
    let duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=0`;
    if (tuKhoaTimKiem !== '') {
        duongDan=`http://localhost:8080/sach/search/findByTenSachContaining?sort=maSach,desc&size=16&page=0&tenSach=${tuKhoaTimKiem}`
    }

    return laySach(duongDan);

}