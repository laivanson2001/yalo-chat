import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [isShowMenu, setIsShowMenu] = useState(false);
	return (
		<header>
			<Link to='/' className='logo'>
				Yalo
			</Link>

			<input type='checkbox' id='menu-bar' />
			<label
				htmlFor='menu-bar'
				onClick={() => setIsShowMenu(!isShowMenu)}
				className='menu-bar'
			>
				{isShowMenu ? <CloseOutlined /> : <MenuOutlined />}
			</label>

			<nav className='navbar'>
				<a href='#home' className='active'>
					Trang chủ
				</a>
				<a href='#features'>Tính năng</a>
				<a href='#about'>Ứng dụng</a>
				<a href='#developer'>Người phát triển</a>
				<Link to='/account/registry'>Đăng ký</Link>
				<Link to='/account/login'>Đăng nhập</Link>
			</nav>
		</header>
	);
};

export default Navbar;
