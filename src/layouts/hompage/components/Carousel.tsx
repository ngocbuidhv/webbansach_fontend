import React from "react";

function Carousel() {
    return (
        <div>
            <div id="carouselExampleDark" className="carousel carousel-dark slide">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <div className="row align-items-center">
                            <div className="col-5 text-center">
                                <img src={require('./../../../images/books/1.png')} className="float-end" style={{ width: '150px' }} />
                            </div>
                            <div className="col-7">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="carousel-item active" data-bs-interval="10000">
                        <div className="row align-items-center">
                            <div className="col-5 text-center">
                                <img src={require('./../../../images/books/1.png')} className="float-end" style={{ width: '150px' }} />
                            </div>
                            <div className="col-7">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                    </div>

                    <div className="carousel-item active" data-bs-interval="10000">
                        <div className="row align-items-center">
                            <div className="col-5 text-center">
                                <img src={require('./../../../images/books/2.png')} className="float-end" style={{ width: '150px' }} />
                            </div>
                            <div className="col-7">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                    </div>

                    <div className="carousel-item" data-bs-interval="10000">
                        <div className="row align-items-center">
                            <div className="col-5 text-center">
                                <img src={require('./../../../images/books/3.png')} className="float-end" style={{ width: '150px' }} />
                            </div>
                            <div className="col-7">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                    </div>

                    <div className="carousel-item" data-bs-interval="10000">
                        <div className="row align-items-center">
                            <div className="col-5 text-center">
                                <img src={require('./../../../images/books/4.png')} className="float-end" style={{ width: '150px' }} />
                            </div>
                            <div className="col-7">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                    </div>

                    <div className="carousel-item" data-bs-interval="10000">
                        <div className="row align-items-center">
                            <div className="col-5 text-center">
                                <img src={require('./../../../images/books/5.png')} className="float-end" style={{ width: '150px' }} />
                            </div>
                            <div className="col-7">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                    </div>

                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Carousel;