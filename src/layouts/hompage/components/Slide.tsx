import React from "react";

function Slide() {
    return (
        <div id="carouselExampleRide" className="carousel slide" data-bs-ride="true">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={'./../../../images/books/banner1.jpg'} className="d-block w-100 h-80" alt="..." style={{height:'480px', border: '20px solid #FFFFFF',}} />
                </div>
                <div className="carousel-item">
                    <img src={'./../../../images/books/banner2.jpg'} className="d-block w-100 h-80" alt="..." style={{height:'480px', border: '20px solid #FFFFFF'}} />
                </div>
                <div className="carousel-item">
                    <img src={'./../../../images/books/banner3.jpg'} className="d-block w-100 h-80" alt="..." style={{height:'480px', border: '20px solid #FFFFFF'}} />
                </div>
                <div className="carousel-item">
                    <img src={'./../../../images/books/banner4.jpg'} className="d-block w-100 h-80" alt="..." style={{height:'480px', border: '20px solid #FFFFFF'}} />
                </div>
                <div className="carousel-item">
                    <img src={'./../../../images/books/banner5.png'} className="d-block w-100 h-80" alt="..." style={{height:'480px', border: '20px solid #FFFFFF'}} />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Slide;