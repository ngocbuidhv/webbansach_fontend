const HOST_NAME = 'http://localhost:8080';

export async function get1User(tenDangNhap: string|undefined) {

    try {
        const response = await fetch(`${HOST_NAME}/nguoi-dung/search/findByTenDangNhap?tenDangNhap=${tenDangNhap}`)

        if(!response.ok){
            throw new Error("Không tìm thấy user");
        }
        const data = await response.json();
        
        const user = {
            // maNguoiDung: data.maNguoiDung,
            // tenDangNhap: data.tenDangNhap,
            // ten: data.ten,
            // hoDem: data.hoDem,
            // soDienThoai: data.soDienThoai,
            // email: data.email,
            // gioiTinh: data.gioiTinh,
            // diaChiMuaHang: data.diaChiMuaHang,
            // diaChiGiaoHang: data.diaChiGiaoHang,
            // avatar: data.avatar
            hoDem: data.hoDem,
            ten: data.ten,
            tenDangNhap: data.tenDangNhap,
            matKhau: data.matKhau,
            gioiTinh: data.gioiTinh,
            email: data.email,
            soDienThoai: data.soDienThoai,
            diaChiMuaHang: data.diaChiMuaHang,
            diaChiGiaoHang: data.diaChiGiaoHang,
            daKichHoat: data.daKichHoat,
            avartar: data.avartar
        }
        return user;
    } catch (error) {
        console.log(error);
    }
}
export async function capNhatTongTin1NguoiDung(user: any){
    const url = `${HOST_NAME}/nguoi-dung/${user.maNguoiDung}`;
    const token = localStorage.getItem('token')
    try {
        const response = await fetch(url,{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }, 
            body:JSON.stringify(user)
        });
        if(!response.ok){
            throw new Error("cập nhật thất bại")
        }
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}