import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import "./Profile.css";
import { capNhatTongTin1NguoiDung, get1User } from "../../api/userAPI";
import { daDangNhap } from "../utils/TokenService";

interface ProfileInterface{
    tenDangNhap: string;
}
const Profile: React.FC<ProfileInterface> = (props) => {
    const navigate = useNavigate();
    const { tenDangNhap } = useParams();
    // const [showChangeAvatar, setShowChangeAvatar] = useState(false);
    const [user, setUser] = useState({
        hoDem: "",
        ten: "",
        tenDangNhap: tenDangNhap,
        matKhau: "",
        gioiTinh: "",
        email: "",
        soDienThoai: "",
        diaChiMuaHang: "",
        diaChiGiaoHang: "",
        daKichHoat: "",
        // avartar: "",
    });

    //các biến thiết yếu
    const [baoLoi, setBaoLoi] = useState("");
    const [thongBao, setThongBao] = useState("");
    const [dangLoad, setDangLoad] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!daDangNhap()) {
                    alert("Vui lòng đăng nhập!");
                    navigate("/");
                } else {
                    const data = await get1User(user.tenDangNhap);
                    console.log("Fetched Data:", data);
                    // setUser(data);
                }
            } catch (error) {
                console.error(error);
                setBaoLoi("Có lỗi xảy ra khi lấy dữ liệu người dùng.");
            } finally {
                setDangLoad(false);
            }
        };
    
        fetchData();
    }, [user.tenDangNhap]);
    

    //phần gửi đi cập nhật
    const handleSubmit = (e: React.FormEvent) => {
        setDangLoad(true);
        e.preventDefault();

        //call api
        capNhatTongTin1NguoiDung(user)
            .then((data) => {
                setThongBao("Cập Nhật Thông Tin Thành Công!");
                setDangLoad(false);
            })
            .catch((error) => {
                console.log(error);
                setDangLoad(false);
            });
    };
    // //chuyển avatar thành chuỗi base 64
    // const imageToBase64 = (file: File): Promise<string> => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => resolve(reader.result as string);
    //         reader.onerror = (error) => reject(error);
    //     });
    // };
    // //thay đổi avatar
    // const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //         const file = e.target.files[0];
    //         //chuyển đổi hình sang base64
    //         imageToBase64(file)
    //             .then((base64) => {
    //                 setUser({ ...user, avatar: base64 });
    //             })
    //             .catch((error) => {
    //                 setBaoLoi(error);
    //             });
    //     }
    // };

    return (
        <div className="container">
            {/* <div className="d-flex justify-content-center avatar">
                <img
                    src={user.avatar}
                    className="rounded-circle"
                    style={{ width: "250px" }}
                    alt="Avatar"
                    onClick={() => setShowChangeAvatar(!showChangeAvatar)}
                />
            </div>
            {showChangeAvatar && (
                <div className="d-flex justify-content-center mt-2">
                    <div className="w-25">
                        <input
                            className="form-control"
                            type="file"
                            accept="image/*"
                            id="formFile"
                            // onChange={handleChangeAvatar}
                        />
                    </div>
                </div>
            )} */}
            <h1>
                Thông Tin Cá Nhân <strong>#{user?.tenDangNhap}</strong>
            </h1>
            <form
                className="form  text-start"
                style={{ width: "90%" }}
                onSubmit={handleSubmit}
            >
                <div className="form-floating mb-4 ">
                    <input
                        value={user.tenDangNhap}
                        type="text"
                        id="tenDangNhap"
                        className="form-control form-control-lg"
                        readOnly
                    />
                    <span className="position-absolute text-danger"></span>
                </div>
                <div className="row">
                    <div className="col-5">
                        <div className="form-floating mb-4">
                            <input
                                type="text"
                                id="hoDem"
                                value={user.hoDem}
                                className="form-control form-control-lg"
                                placeholder="Họ Đệm"
                                onChange={(e) => setUser({ ...user, hoDem: e.target.value })}
                            />
                            <label className="form-label" htmlFor="hoDem">
                                Họ Đệm
                            </label>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-floating mb-4">
                            <input
                                type="text"
                                id="ten"
                                value={user.ten}
                                className="form-control form-control-lg"
                                placeholder="Tên"
                                onChange={(e) => setUser({ ...user, ten: e.target.value })}
                            />
                            <label className="form-label" htmlFor="ten">
                                Tên
                            </label>
                        </div>
                    </div>
                    <div className="col-4 pt-2">
                        <select
                            className="form-select"
                            id="gioiTinh"
                            value={user.gioiTinh}
                            onChange={(e) => setUser({ ...user, gioiTinh: e.target.value })}
                        >
                            <option value="n" selected>
                                Giới tính
                            </option>
                            <option value="m">Nam</option>
                            <option value="f">Nữ</option>
                            <option value="o">Khác</option>
                        </select>
                    </div>
                </div>
                <div className="form-floating mb-4">
                    <input
                        type="tel"
                        id="soDienThoai"
                        className="form-control form-control-lg"
                        placeholder="Số Điện Thoại"
                        value={user.soDienThoai}
                        onChange={(e) => setUser({ ...user, soDienThoai: e.target.value })}
                    />
                    <label className="form-label" htmlFor="soDienThoai">
                        Số Điện Thoại
                    </label>
                </div>
                <div className="form-floating mb-4 input-group">
                    <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                    <label className="form-label" htmlFor="email">
                        Email
                    </label>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-floating mb-4 input-group">
                            <input
                                type="text"
                                id="diaChiMuaHang"
                                className="form-control form-control-lg"
                                placeholder="Địa Chỉ Mua Hàng"
                                value={user.diaChiMuaHang}
                                onChange={(e) =>
                                    setUser({ ...user, diaChiMuaHang: e.target.value })
                                }
                            />
                            <label className="form-label" htmlFor="diaChiMuaHang">
                                Địa Chỉ Mua Hàng
                            </label>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-floating mb-4 input-group">
                            <input
                                type="text"
                                id="diaChiGiaoHang"
                                className="form-control form-control-lg"
                                placeholder="Địa Chỉ Giao Hàng"
                                value={user.diaChiGiaoHang}
                                onChange={(e) =>
                                    setUser({ ...user, diaChiGiaoHang: e.target.value })
                                }
                            />
                            <label className="form-label" htmlFor="diaChiGiaoHang">
                                Địa Chỉ Giao Hàng
                            </label>
                        </div>
                    </div>
                </div>
                <span className="text-danger bottom-0 "></span>
                <div className="d-flex justify-content-center">
                    <button
                        type="submit"
                        className="btn btn-primary btn-block btn-lg w-100 "
                    >
                        {dangLoad ? (
                            <div className="spinner-border text-light" role="status"></div>
                        ) : (
                            'Lưu Thay Đổi'
                        )}
                    </button>
                </div>
                {thongBao && (
                    <div className="d-flex justify-content-center">
                        <div
                            className="alert alert-primary mt-2 text-center w-25"
                            role="alert"
                        >
                            {thongBao}
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Profile;
