import React, { FormEvent, useEffect, useState } from 'react';
import RequireAdmin from './RequireAdmin';
import { resolve } from 'path';
import { rejects } from 'assert';
import { error } from 'console';
import { layToanBoAnhCuaMotSach } from '../../api/HinhAnhAPI';
import { laySachTheoMaSach } from '../../api/SachAPI';


const SachForm: React.FC = (props) => {
    const [sach, setSach] = useState({
        maSach: 0,
        tenSach: '',
        giaBan: 0,
        giaNiemYet: 0,
        danhSachAnh: '',
        moTa: '',
        soLuong: 0,
        tenTacGia: '',
        isbn: '',
        trungBinhXepHang: 0,
    });

    const [danhSachHinhAnh, setdanhSachHinhAnh] = useState<File | null>(null);

    // Convert file to Base64
    const getBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result ? (reader.result as string) : null);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        const base64HinhAnh = danhSachHinhAnh ? await getBase64(danhSachHinhAnh) : null;
        console.log("danhSachAnh" + base64HinhAnh);
        fetch('http://localhost:8080/sach',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(sach)
            }
        ).then((reponse) => {
            if (reponse.ok) {
                alert("Đã thêm sách thành công!");
                setSach({
                    maSach: 0,
                    tenSach: '',
                    giaBan: 0,
                    giaNiemYet: 0,
                    danhSachAnh: '',
                    moTa: '',
                    soLuong: 0,
                    tenTacGia: '',
                    isbn: '',
                    trungBinhXepHang: 0,
                })
            } else {
                alert("Gặp lỗi trong quá trình thêm sách!");
            }
        })
    }

    const handledanhSachHinhAnh = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setdanhSachHinhAnh(file);
        }
    };


    return (
        <div className='container row d-flex align-items-center justify-content-center'>
            <div className=''>
                <h1>THÊM SÁCH</h1>
                <form onSubmit={handleSubmit} className='form'>
                    <input
                        type='hidden'
                        id='maSach'
                        value={sach.maSach}
                    />

                    <label htmlFor='tenSach'>Tên sách</label>
                    <input
                        className='form-control'
                        type='text'
                        value={sach.tenSach}
                        onChange={(e) => setSach({ ...sach, tenSach: e.target.value })}
                        required
                    />

                    <label htmlFor='giaBan'>Giá bán</label>
                    <input
                        className='form-control'
                        type='number'
                        value={sach.giaBan}
                        onChange={(e) => setSach({ ...sach, giaBan: parseFloat(e.target.value) })}
                        required
                    />

                    <label htmlFor='giaNiemYet'>Giá niêm yết</label>
                    <input
                        className='form-control'
                        type='number'
                        value={sach.giaNiemYet}
                        onChange={(e) => setSach({ ...sach, giaNiemYet: parseFloat(e.target.value) })}
                        required
                    />

                    <label htmlFor='soLuong'>soLuong</label>
                    <input
                        className='form-control'
                        type='number'
                        value={sach.soLuong}
                        onChange={(e) => setSach({ ...sach, soLuong: parseInt(e.target.value) })}
                        required
                    />

                    <label htmlFor='tenSach'>Tên tác giả</label>
                    <input
                        className='form-control'
                        type='text'
                        value={sach.tenTacGia}
                        onChange={(e) => setSach({ ...sach, tenTacGia: e.target.value })}
                        required
                    />
                    <label htmlFor='moTa'>Mô tả</label>
                    <input
                        className='form-control'
                        type='moTa'
                        value={sach.moTa}
                        onChange={(e) => setSach({ ...sach, moTa: e.target.value })}
                        required
                    />

                    <div className="mb-3">
                        <label htmlFor="danhSachHinhAnh" className="form-label">Danh sách hình ảnh</label>
                        <input
                            type="file"
                            id="avatar"
                            className="form-control"
                            accept='images/*'
                            onChange={handledanhSachHinhAnh}
                        />
                    </div>

                    <label htmlFor='isbn'>ISBN</label>
                    <input
                        className='form-control'
                        type='isbn'
                        value={sach.isbn}
                        onChange={(e) => setSach({ ...sach, isbn: e.target.value })}
                        required
                    />

                    <button type='submit' className='btn btn-success mt-2'>Lưu</button>
                </form>
            </div>
        </div>
    )
}

const SachForm_Admin = RequireAdmin(SachForm);
export default SachForm_Admin;