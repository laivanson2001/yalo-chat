import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Footer = ({ data }) => {
	return (
		<div className='footer'>
			<div className='box-container'>
				<div className='box'>
					<h3>Về chúng tôi</h3>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit. Sed eaque accusantium, quam eligendi rerum
						deserunt perspiciatis impedit enim vero totam!
					</p>
				</div>

				<div className='box'>
					<h3>Link nhanh</h3>
					<a href='#home'>Trang chủ</a>
					<a href='#features'>Tính năng</a>
					<a href='#about'>Ứng dụng</a>
					<a href='#developer'>Team phát triển</a>
					<Link to='/account/registry'>Đăng ký</Link>
					<Link to='/account/login'>Đăng nhập</Link>
				</div>
			</div>

			<h2 className='credit'>&copy; Copyright revert</h2>
		</div>
	);
};

Footer.propTypes = { data: PropTypes.object };

export default Footer;
