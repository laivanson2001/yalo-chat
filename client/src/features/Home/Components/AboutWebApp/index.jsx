import React from "react";
import PropTypes from "prop-types";
import { CheckCircleTwoTone, FireOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AboutWebApp = ({ data }) => {
	return (
		<section className='about' id='about'>
			<h1 className='heading'>Ứng dụng</h1>

			<div className='column'>
				<div className='image'>
					<img
						src='https://capquangfpt.pro/wp-content/uploads/2021/07/zalo-pc-co-gi-khac-voi-zalo-dien-thoai.png'
						alt=''
					/>
				</div>

				<div className='content'>
					<h3>Yalo</h3>

					<p>
						<CheckCircleTwoTone />
						&nbsp;Nhắn tin
					</p>
					<p>
						<CheckCircleTwoTone />
						&nbsp;Gọi điện
					</p>

					<div className='buttons'>
						<Link to='/account/login' className='btn'>
							<FireOutlined /> Trải nghiệm phiên bản web
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

AboutWebApp.propTypes = { data: PropTypes.object };

export default AboutWebApp;
