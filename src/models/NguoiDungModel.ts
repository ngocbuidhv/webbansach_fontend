class NguoiDungModel {
    maNguoiDung: number;
    hoDem?: string;
    ten?: string;
    tenDangNhap?: string;
    matKhau?: string;
    gioiTinh?: string;
    email?: string;
    soDienThoai?: string;
    diaChiMuaHang?: string;
    diaChiGiaoHang?: string;
    daKichHoat?: string;
    avartar?: string;

    constructor(
        maNguoiDung: number,
        hoDem: string,
        ten: string,
        tenDangNhap: string,
        matKhau: string,
        gioiTinh: string,
        email: string,
        soDienThoai: string,
        diaChiMuaHang: string,
        diaChiGiaoHang: string,
        daKichHoat: string,
        avartar: string,
    ){
        this.maNguoiDung = maNguoiDung;
        this.hoDem = hoDem
        this.ten = ten 
        this.tenDangNhap = tenDangNhap
        this.matKhau = matKhau
        this.gioiTinh = gioiTinh
        this.email = email
        this.soDienThoai = soDienThoai
        this.diaChiMuaHang = diaChiMuaHang
        this.diaChiGiaoHang = diaChiGiaoHang
        this.daKichHoat = daKichHoat
        this.avartar = avartar
    }
}
export default NguoiDungModel;