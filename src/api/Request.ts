export async function my_request(duongDan:string) {
    // truy vấn đến đường dẫn
    const response = await fetch(duongDan);

    // nếu trả về bị lỗi
    if(!response.ok){
        throw new Error('Không thể truy cập $(duongDan)');
    }

    // nếu trả về ok
    return response.json();
}