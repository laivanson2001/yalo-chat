import React from "react";
import Navbar from "../Navbar";
import { DownloadOutlined } from "@ant-design/icons";

const Header = () => {
	return (
		<>
			<Navbar />
			<section className='home' id='home'>
				<div className='content'>
					<h3>
						Ứng dụng trò chuyện trực tuyến
						<br />
						<span>Yalo</span>
					</h3>

					<p>
						Ứng dụng vô cùng tiện ích cho việc chat nhóm, trao đổi
						công việc, chia sẻ đa phương tiện
					</p>
					<a href='/' target='_blank' className='btn'>
						<DownloadOutlined /> Tải ngay phiên bản mobile
					</a>
				</div>
				<div className='image'>
					<img
						src='https://bookvexe.vn/wp-content/uploads/2023/04/tong-hop-25-mau-logo-zalo-dep-va-an-tuong_1.jpg'
						alt=''
					/>
				</div>
			</section>
		</>
	);
};

export default Header;
