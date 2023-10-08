import React from "react";

function Banner() {
    return (
        <div className="p-2 mb-2 bg-dark py-1">
  <div className="container-fluid py-3 text-white d-flex justify-content-center align-items-center">
    <div>
      <h3 className="display-5 fw-bold">
        Đọc sách chính là hộ chiếu <br /> cho vô số cuộc phiêu lưu
      </h3>
      <p className="">Mary Pope Osborne</p>
      <button className="btn btn-primary btn-lg text-white float-end">
        Khám phá sách tại BOOKSTORE.vn
      </button>
    </div>
  </div>
</div>

    );
}
export default Banner;