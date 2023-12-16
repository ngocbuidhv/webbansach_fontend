import React from "react";
import SachModel from "../models/SachModel";
import { my_request } from "./Request";
import { wait } from "@testing-library/user-event/dist/utils";
import { luuHinhAnhCuaMotSach } from "./HinhAnhAPI";

interface KetQuaInterface {
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
    const tongSoTrang: number = response.page.totalPages;
    const tongSoSach: number = response.page.totalElements;

    for (const key in responseData) {
        ketQua.push({
            maSach: responseData[key].maSach,
            tenSach: responseData[key].tenSach,
            giaBan: responseData[key].giaBan,
            giaNiemYet: responseData[key].giaNiemYet,
            moTa: responseData[key].moTa,
            soLuong: responseData[key].soLuong,
            tenTacGia: responseData[key].tenTacGia,
            trungBinhXepHang: responseData[key].trungBinhXepHang,
            soTrang: responseData[key].soTrang,
            ngonNgu: responseData[key].ngonNgu,
            namXB: responseData[key].namXB,
            moTaChiTiet: responseData[key].moTaChiTiet,
            isbn: responseData[key].isbn
        });
    }

    return { ketQua: ketQua, tongSoSach: tongSoTrang, tongSoTrang: tongSoTrang };
}

export async function layToanBoSach(trang: number): Promise<KetQuaInterface> {

    // Xác định endpoint
    const duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=12&page=${trang}`;

    return laySach(duongDan);

}

export async function layToanBoSachHotBook(): Promise<KetQuaInterface> {

    // Xác định endpoint
    const duongDan: string = 'http://localhost:8080/sach?sort=maSach';

    return laySach(duongDan);

}


export async function lay10SachMoiNhat(): Promise<KetQuaInterface> {

    // Xác định endpoint
    const duongDan: string = 'http://localhost:8080/sach?sort=maSach,desc&page=0&size=10';

    return laySach(duongDan);

}

export async function timKiemSach(tuKhoaTimKiem: string, maTheLoai: number): Promise<KetQuaInterface> {

    // Xác định endpoint
    let duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=12&page=0`;

    if (tuKhoaTimKiem !== '' && maTheLoai == 0) {
        duongDan = `http://localhost:8080/sach/search/findByTenSachContaining?sort=maSach,desc&size=16&page=0&tenSach=${tuKhoaTimKiem}`
    } else if (tuKhoaTimKiem === '' && maTheLoai > 0) {
        duongDan = `http://localhost:8080/sach/search/findByDanhSachTheLoai_MaTheLoai?sort=maSach,desc&size=16&page=0&maTheLoai=${maTheLoai}`
    } else if (tuKhoaTimKiem !== '' && maTheLoai > 0) {
        duongDan = `http://localhost:8080/sach/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai?sort=maSach,desc&size=16&page=0&maTheLoai=${maTheLoai}&tenSach=${tuKhoaTimKiem}`
    }

    return laySach(duongDan);

}

export async function laySachTheoMaSach(maSach: number): Promise<SachModel | null> {
    const duongDan = `http://localhost:8080/sach/${maSach}`
    let ketQua: SachModel;

    try {
        // Gọi phương thức request
        const response = await fetch(duongDan);

        if (!response.ok) {
            throw new Error("Gặp lỗi trong quá trình gọi API lấy sách")
        }

        const sachData = await response.json();

        if (sachData) {
            return {
                maSach: sachData.maSach,
                tenSach: sachData.tenSach,
                giaBan: sachData.giaBan,
                giaNiemYet: sachData.giaNiemYet,
                moTa: sachData.moTa,
                soLuong: sachData.soLuong,
                tenTacGia: sachData.tenTacGia,
                trungBinhXepHang: sachData.trungBinhXepHang,
                soTrang: sachData.soTrang,
                ngonNgu: sachData.ngonNgu,
                namXB: sachData.namXB,
                moTaChiTiet: sachData.moTaChiTiet,
                isbn: sachData.isbn
            }
        } else {
            throw new Error('Sách không tồn tại')
        }

    } catch (error) {
        console.error("Error", error);
        return null;
    }
}

export async function themMotQuyenSach(sach: any, danhSachHinhAnh: any, danhSachTheLoai: string[]) {
    console.log(danhSachHinhAnh);
    
    const token = localStorage.getItem("token");
    const url = `http://localhost:8080/sach`;
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sach),
    })
        .then((reponse) => {
            if (reponse.ok) {
                return reponse.json();
            } else {
                throw new Error("Lỗi ở handleSubmit");
            }
        })
        .then((data) => {
            //sao khi lưu sách thành công ta sẽ lưu hình ảnh và thể loại
            luuHinhAnhCuaMotSach(data, danhSachHinhAnh, token);
            // themTheLoaiChoMotQuyenSach(data, danhSachTheLoai);
            alert("Đã thêm sách thành công!");

        })
        .catch((error) => {
            console.log(error);
        });
}