import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Badge, Button, Popover } from "antd";
import PersonalIcon from "features/Chat/components/PersonalIcon";
import { Link, useLocation } from "react-router-dom";
import {
	ContactsOutlined,
	LockOutlined,
	LogoutOutlined,
	MessageOutlined,
	SettingOutlined,
	UserOutlined,
} from "@ant-design/icons";
import ModalUpdateProfile from "features/Chat/components/ModalUpdateProfile";
import ModalChangePassword from "components/ModalChangePassword";
import NavbarStyle from "./NavbarStyle";
import { useDispatch, useSelector } from "react-redux";
import { setTabActive } from "app/globalSlice";
import { setToTalUnread } from "features/Chat/slice/chatSlice";

const NavbarContainer = ({ onSaveCodeRevoke }) => {
	const dispatch = useDispatch();
	const location = useLocation();

	const { user } = useSelector((state) => state.global);
	const { conversations, toTalUnread } = useSelector((state) => state.chat);
	const { amountNotify } = useSelector((state) => state.friend);

	const [isPopoverAvatarVisible, setIsPopoverAvatarVisible] = useState(false);
	const [isPopoverSettingVisible, setIsPopoverSettingVisible] =
		useState(false);
	const [isModalUpdateProfileVisible, setIsModalUpdateProfileVisible] =
		useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [visibleModalChangePassword, setvisibleModalChangePassword] =
		useState(false);

	const handlePopoverAvatarVisibleChange = () => {
		setIsPopoverAvatarVisible(!isPopoverAvatarVisible);
	};

	const handlePopoverSettingVisibleChange = () => {
		setIsPopoverSettingVisible(!isPopoverSettingVisible);
	};

	const checkCurrentPage = (iconName) => {
		if (iconName === "MESSAGE" && location.pathname === "/chat") {
			return true;
		}
		if (iconName === "FRIEND" && location.pathname === "/chat/friends") {
			return true;
		}
		return false;
	};

	const handleSetTabActive = (value) => {
		dispatch(setTabActive(value));
	};

	const handleCancelModalUpdateProfile = (value) => {
		setIsModalUpdateProfileVisible(value);
	};

	const handleOklModalUpdateProfile = (value) => {
		setConfirmLoading(true);
		setConfirmLoading(false);
		setIsModalUpdateProfileVisible(false);
	};

	const handleUpdateProfile = () => {
		setIsModalUpdateProfileVisible(true);
		setIsPopoverAvatarVisible(false);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
		window.location.reload();
	};

	const handleChangePassword = () => {
		setvisibleModalChangePassword(true);
	};

	const content = (
		<div className='pop_up-personal'>
			<div
				className='pop_up-personal--item'
				onClick={handleUpdateProfile}
			>
				<div className='pop_up-personal--item-icon'>
					<UserOutlined />
				</div>

				<div className='pop_up-personal--item-text'>Tài khoản</div>
			</div>

			<div className='pop_up-personal--item'>
				<div className='pop_up-personal--item-icon'>
					<LogoutOutlined />
				</div>

				<div
					className='pop_up-personal--item-text'
					onClick={handleLogout}
				>
					Đăng xuất
				</div>
			</div>
		</div>
	);

	const setting = (
		<div className='pop_up-personal'>
			<div
				className='pop_up-personal--item'
				onClick={handleChangePassword}
			>
				<div className='pop_up-personal--item-icon'>
					<LockOutlined />
				</div>

				<div className='pop_up-personal--item-text'>Đổi mật khẩu</div>
			</div>
		</div>
	);

	useEffect(() => {
		dispatch(setToTalUnread());
	}, [conversations]);

	return (
		<div id='sidebar_wrapper'>
			<div className='sidebar-main'>
				<ul className='sidebar_nav'>
					<li className='sidebar_nav_item icon-avatar'>
						<Popover
							placement='bottomLeft'
							content={content}
							trigger='click'
							open={isPopoverAvatarVisible}
							onOpenChange={handlePopoverAvatarVisibleChange}
						>
							<Button style={NavbarStyle.BUTTON}>
								<div className='user-icon-navbar'>
									<PersonalIcon
										isActive={true}
										common={true}
										avatar={user.avatar}
										name={user.name}
										color={user.avatarColor}
									/>
								</div>
							</Button>
						</Popover>
					</li>

					<Link className='link-icon' to='/chat'>
						<li
							className={`sidebar_nav_item  ${
								checkCurrentPage("MESSAGE") ? "active" : ""
							}`}
							onClick={() => handleSetTabActive(1)}
						>
							<div className='sidebar_nav_item--icon'>
								<Badge
									count={toTalUnread > 0 ? toTalUnread : 0}
								>
									<MessageOutlined />
								</Badge>
							</div>
						</li>
					</Link>

					<Link className='link-icon' to='/chat/friends'>
						<li
							className={`sidebar_nav_item  ${
								checkCurrentPage("FRIEND") ? "active" : ""
							}`}
							onClick={() => handleSetTabActive(2)}
						>
							<div className='sidebar_nav_item--icon'>
								<Badge count={amountNotify}>
									<ContactsOutlined />
								</Badge>
							</div>
						</li>
					</Link>
				</ul>

				<ul className='sidebar_nav'>
					<li className='sidebar_nav_item'>
						<div className='sidebar_nav_item--icon'>
							<Popover
								placement='rightTop'
								content={setting}
								trigger='click'
								open={isPopoverSettingVisible}
								onOpenChange={handlePopoverSettingVisibleChange}
							>
								<Button style={NavbarStyle.BUTTON_SETTING}>
									<SettingOutlined />
								</Button>
							</Popover>
						</div>
					</li>
				</ul>
			</div>

			<ModalUpdateProfile
				isVisible={isModalUpdateProfileVisible}
				onCancel={handleCancelModalUpdateProfile}
				onOk={handleOklModalUpdateProfile}
				loading={confirmLoading}
			/>

			<ModalChangePassword
				visible={visibleModalChangePassword}
				onCancel={() => setvisibleModalChangePassword(false)}
				onSaveCodeRevoke={onSaveCodeRevoke}
			/>
		</div>
	);
};

NavbarContainer.propTypes = { onSaveCodeRevoke: PropTypes.func };

NavbarContainer.defaultProps = {
	onSaveCodeRevoke: null,
};

export default NavbarContainer;
