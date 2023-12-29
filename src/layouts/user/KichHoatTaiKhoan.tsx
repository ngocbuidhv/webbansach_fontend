import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function KichHoatTaiKhoan() {
    const { email, maKichHoat } = useParams();
    const [daKichHoat, setDaKichHoat] = useState(false);
    const [thongBao, setThongBao] = useState("");
    const [inputMaKichHoat, setInputMaKichHoat] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Email:", email);
        console.log("MaKichHoat:", inputMaKichHoat);

        try {
            const url: string = `http://localhost:8080/tai-khoan/kich-hoat?email=${email}&maKichHoat=${inputMaKichHoat}`;
            const response = await fetch(url, { method: "GET" });

            if (response.ok) {
                setDaKichHoat(true);
                setThongBao("Kích hoạt tài khoản thành công!");
    
                // Chờ 5 giây và sau đó chuyển hướng về trang chủ
                setTimeout(() => {
                    window.location.href = "http://localhost:3000/trangchu";
                }, 3000);
            }
                 else {
                setThongBao("Kích hoạt tài khoản thất bại. Vui lòng kiểm tra lại mã kích hoạt.");
            }
        } catch (error) {
            console.log("Lỗi khi kích hoạt: ", error);
            setThongBao("Đã xảy ra lỗi khi kích hoạt tài khoản. Vui lòng thử lại sau.");
        }
    };

    return (
        <div className='container mt-4 mb-4' style={{ maxWidth: '500px', margin: '0 auto', padding: '2em', background: '#f7f7f7', borderRadius: '8px', border: '1px solid #007BFF', boxShadow: '5px 5px 15px rgba(0,0,0,0.1)' }}>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12 text-center mb-4">
                    <h1>Kích hoạt tài khoản</h1>
                    <h5>Vui lòng kiểm tra email: </h5>
                    <h6 style={{ opacity: 0.7 }}>
                        <i>{email}</i>
                    </h6>
                </div>
                <div className="col-12 mb-4">
                    <div className="form-floating">
                        <input
                            type="text"
                            id="maKichHoat"
                            className="form-control"
                            placeholder="Mã kích hoạt"
                            value={inputMaKichHoat}
                            onChange={(e) => setInputMaKichHoat(e.target.value)}
                        />
                        <label htmlFor="maKichHoat">Mã kích hoạt</label>
                        <span className="position-absolute text-danger"></span>
                    </div>
                </div>
                <div className="col-12 text-center mb-4">
                    <button type="submit" className="btn btn-primary btn-lg">
                        Xác nhận
                    </button>
                </div>
                {thongBao && (
                    <div className={`col-12 text-center ${daKichHoat ? "text-success" : "text-danger"}`}>
                        {thongBao}
                    </div>
                )}
            </form>
        </div>

    );
}

export default KichHoatTaiKhoan;