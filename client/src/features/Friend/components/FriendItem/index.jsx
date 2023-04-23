import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Button, Dropdown, Menu } from "antd";
import {
	DashOutlined,
	DeleteOutlined,
	InfoCircleOutlined,
} from "@ant-design/icons";
import conversationApi from "api/conversationApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	fetchListMessages,
	setConversations,
	setCurrentConversation,
} from "features/Chat/slice/chatSlice";
import PersonalIcon from "features/Chat/components/PersonalIcon";
import dateUtils from "utils/dateUtils";

const FriendItem = ({ data, onClickMenu }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClickMenu = ({ key }) => {
		if (onClickMenu) {
			onClickMenu(key, data._id);
		}
	};

	const handleClickFriendItem = async () => {
		const response = await conversationApi.createConversationIndividual(
			data._id
		);
		const { _id, isExists } = response;

		if (!isExists) {
			const conver = await conversationApi.getConversationById(data._id);
			dispatch(setConversations(conver));
		}

		dispatch(fetchListMessages({ conversationId: _id, size: 10 }));
		dispatch(setCurrentConversation(_id));

		navigate("/chat");
	};

	const menu = (
		<Menu onClick={handleClickMenu}>
			<Menu.Item key='1' icon={<InfoCircleOutlined />}>
				<span className='menu-item--highlight'>Xem thông tin</span>
			</Menu.Item>
			<Menu.Item key='2' danger icon={<DeleteOutlined />}>
				<span className='menu-item--highlight'>Xóa bạn</span>
			</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown overlay={menu} trigger={["contextMenu"]}>
			<div id='friend-item'>
				<div
					className='friend-item_left'
					onClick={handleClickFriendItem}
				>
					<div className='friend-item-avatar'>
						<PersonalIcon
							isActive={data.isOnline && data.isOnline}
							avatar={data.avatar}
							name={data.name}
							color={data.avatarColor}
						/>
					</div>

					<div className='friend-item-name'>
						{data.name}

						{data.lastLogin && (
							<div className='recent-login'>
								{`Truy cập ${dateUtils.toTime(
									data.lastLogin
								)} trước`}
							</div>
						)}
					</div>
				</div>
				<div className='friend-item_right'>
					<div className='friend-item-interact'>
						<Dropdown overlay={menu} trigger={["click"]}>
							<Button
								type='text'
								icon={<DashOutlined />}
								style={{ background: "eeeff2" }}
							/>
						</Dropdown>
					</div>
				</div>
			</div>
		</Dropdown>
	);
};

FriendItem.propTypes = {
	data: PropTypes.object.isRequired,
	onClickMenu: PropTypes.func,
};

FriendItem.defaultProps = {
	onClickMenu: null,
};

export default FriendItem;
