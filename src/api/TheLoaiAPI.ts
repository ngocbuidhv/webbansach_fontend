export async function fetchAllTheLoai(){
    const response = await fetch(`http://localhost:8080/the-loai`);
    if(!response.ok){
        throw new Error("Không thể tải dữ liệu thể loại!");

    }
    const data = await response.json();
    console.log(data); // Kiểm tra dữ liệu trả về
    if (!data || !data._embedded || !data._embedded.theLoais) {
        throw new Error("Dữ liệu trả về từ API không hợp lệ!");
    }
    const danhSachTheLoai = data._embedded.theLoais;
    return danhSachTheLoai;
}