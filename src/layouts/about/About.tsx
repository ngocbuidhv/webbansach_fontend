import React from "react";
import useScrollToTop from "../../hooks/ScrollToTop";

function About() {
	useScrollToTop(); // Mỗi lần vào component này thì sẽ ở trên cùng
	return (
		<div className='w-100 h-100 d-flex align-items-center justify-content-center flex-column m-5'>
			<div className='w-50 h-50 p-3 rounded-5 shadow-4-strong bg-light'>
				<h3 className='text-center text-black'>Giới thiệu về BookStore</h3>
				<hr />
				<div className='row'>
					<div className='col-lg-8'>
						<p>
							<strong>Tên website: </strong>BookStore
						</p>
						<p>
							<strong>Địa chỉ: </strong> 128, Lê Duẫn, Đại học Vinh
						</p>
						<p>
							<strong>Số điện thoại: </strong> 0911102706
						</p>
						<p>
							<strong>Email: </strong> ngoc2001bui@gmail.com
						</p>
					</div>
					<div className='col-lg-4'>
						<div
							className='d-flex align-items-center justify-content-center rounded-5'
							style={{ border: "1px solid #ccc" }}
						>
							{/* <img
								src={"./../../../images/public/logo.svg"}
								width='150'
								alt='MDB Logo'
								loading='lazy'
							/> */}
						</div>
					</div>
				</div>
			</div>
			<div className='w-50 h-50 p-3 rounded-5 shadow-4-strong bg-light mt-3'>
				<h3 className='text-center text-black'>Google maps</h3>
				<hr />
				<div className='d-flex align-items-center justify-content-center'>
					<iframe
						title='Map'
						src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3780.08556626884!2d105.6959523!3d18.6601559!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139cd19383fe8fd%3A0xbfd9845b352477a2!2zxJDhu5lpIGPhu6l1IGjhu5kgbcOheSB0w61uaCBUcsaw4budbmcgxJHhuqFpIGjhu41jIFZpbmg!5e0!3m2!1svi!2s!4v1702205130278!5m2!1svi!2s" 
						width='1000'
						height='450'
						style={{ border: 0 }}
						allowFullScreen={true}
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
					></iframe>
				</div>
			</div>
		</div>
	);
}

export default About;
