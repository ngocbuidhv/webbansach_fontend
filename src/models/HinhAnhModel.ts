class HinhAnhModel{
    maHinhAnh: number;
    tenHinhAnh?: string;
    laIcon?: string;
    duongDan?: string;
    duLieuAnh?: string;

    constructor(
        maHinhAnh: number,
        tenHinhAnh: string,
        laIcon: string,
        duongDan: string,
        duLieuAnh: string,
    ){
        this.maHinhAnh = maHinhAnh;
        this.tenHinhAnh = tenHinhAnh;
        this.laIcon = laIcon;
        this.duongDan = duongDan;
        this.duLieuAnh = duLieuAnh;
    }

}
export default HinhAnhModel;