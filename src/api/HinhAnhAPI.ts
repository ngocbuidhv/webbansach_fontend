import React from "react";
import HinhAnhModel from "../models/HinhAnhModel";
import { my_request } from "./Request";

async function layAnhCuaMotSach(duongDan:string):Promise<HinhAnhModel[]>{
    const ketQua:HinhAnhModel[] = [];

    // Gọi phương thức request
    const response =  await my_request(duongDan);

    // lấy ra json sach
    const responseData = response._embedded.hinhAnhs;
    // console.log(responseData);

    for(const key in responseData){
        ketQua.push({
            maHinhAnh: responseData[key].maHinhAnh,
            tenHinhAnh: responseData[key].tenHinhAnh,
            laIcon: responseData[key].laIcon,
            duongDan: responseData[key].duongDan,
            duLieuAnh: responseData[key].duLieuAnh,
        });
    }
    return ketQua;
}
export async function layToanBoAnhCuaMotSach(maSach: number):Promise<HinhAnhModel[]>{
    // xác định endpoint
    const duongDan:string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh`;

    return layAnhCuaMotSach(duongDan);
}

export async function lay1AnhCuaMotSach(maSach: number):Promise<HinhAnhModel[]>{
    // xác định endpoint
    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh?sort=maHinhAnh,asc&page=0&size=1`;
    return layAnhCuaMotSach(duongDan);
}

export async function luuHinhAnhCuaMotSach(sach: any, danhSachHinhAnh: any, token: string | null) {
    try {
        const url = `http://localhost:8080/hinh-anh`;
         for (const hinhAnh of danhSachHinhAnh) {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ ...hinhAnh, sach: `sach/${sach.maSach}` })
            });
            if (!response.ok) {
                throw new Error(`Không lưu được: ${hinhAnh.tenHinhAnh}`);
              }
        }
    } catch (error) {
        console.log(error);
    }

}

export async function capNhatHinhAnhChoMotQuyenSach(sach:any, danhSachHinhAnh:any) {
    try {
        const token = localStorage.getItem('token')
        for(const hinhAnh of danhSachHinhAnh){
            //kiểm tra hình ảnh đó đã tồn tại trong database hay chưa
            if(hinhAnh.maHinhAnh != -1){//đã tồn tại
                await xoaHinhAnh(hinhAnh.maHinhAnh, token)
            }
        }
        //sau khi đã xoá tất cả những hình ảnh đã tồn tại trước đó
        await luuHinhAnhCuaMotSach(sach, danhSachHinhAnh, token)
    } catch (error) {
        console.log("lỗi tại cập nhật hình ảnh sách: ",error);
        
    }
}

export async function xoaHinhAnh(maHinhAnh: number, token:string|null) {
    try {
        const response = fetch(`http://localhost:8080/hinh-anh/${maHinhAnh}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });
    } catch (error) {
        console.log("Lỗi xoá hình ảnh: ", error);
        
    }
}
