class SachModel {
    maSach: number;
    tenSach?: string; // có thể bị null
    giaBan?: number;
    giaNiemYet?: number;
    moTa?: string;
    soLuong?: number;
    tenTacGia?: string;
    trungBinhXepHang?: number;
    soTrang?: number;
    ngonNgu?: string;
    namXB?: number;
    moTaChiTiet?:string;
    isbn?: string;


    constructor(
        maSach: number,
        tenSach?: string, // có thể bị null
        giaBan?: number,
        giaNiemYet?: number,
        moTa?: string,
        soLuong?: number,
        tenTacGia?: string,
        trungBinhXepHang?: number,
        soTrang?: number,
        ngonNgu?: string,
        namXB?: number,
        moTaChiTiet?: string,
        isbn?: string
    ){
        this.maSach = maSach;
        this.tenSach = tenSach;
        this.giaBan = giaBan;
        this.giaNiemYet = giaNiemYet;
        this.moTa = moTa;
        this.soLuong = soLuong;
        this.tenTacGia = tenTacGia;
        this.trungBinhXepHang = trungBinhXepHang;
        this.soTrang = soTrang;
        this.ngonNgu = ngonNgu;
        this.namXB = namXB;
        this.moTaChiTiet = moTaChiTiet;
        this.isbn = isbn;
    }
}

export default SachModel;