import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
	CaretDownOutlined,
	DashOutlined,
	ExclamationCircleOutlined,
	MessageTwoTone,
} from "@ant-design/icons";
import TypeMessagePin from "../TypeMessagePin";
import { Dropdown, Menu, Modal, message as MessageNotify, Button } from "antd";
import NutshellPinMessageStyle from "./NutshellPinMessageStyle";
import pinMessageApi from "api/pinMessageApi";
import { fetchPinMessages } from "features/Chat/slice/chatSlice";
import ModalDetailMessagePin from "../ModalDetailMessagePin";

const NutshellPinMessage = ({
	isItem,
	onOpenDrawer,
	message,
	quantity,
	isHover,
}) => {
	const dispatch = useDispatch();

	const { currentConversation } = useSelector((state) => state.chat);

	const [visible, setVisible] = useState(false);

	const confirm = () => {
		Modal.confirm({
			title: "Bỏ ghim",
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có chắc muốn bỏ ghim nội dung này không ?",
			okText: "Bỏ ghim",
			cancelText: "Không",
			onOk: async () => {
				await pinMessageApi.removePinMessage(message._id);
				MessageNotify.success("Xóa thành công");
				dispatch(
					fetchPinMessages({ conversationId: currentConversation })
				);
			},
			okButtonProps: { type: "primary", danger: true },
		});
	};

	const handleOnClick = () => {
		setVisible(true);
	};

	const handleOnClickMenu = ({ _, key }) => {
		if (key === "1") {
			confirm();
		}
	};

	const handleOnClickVisbleList = () => {
		if (onOpenDrawer) {
			onOpenDrawer();
		}
	};

	const handleCloseModal = () => {
		setVisible(false);
	};

	const menu = (
		<Menu onClick={handleOnClickMenu}>
			<Menu.Item key='1' danger>
				<span style={NutshellPinMessageStyle.MENU_ITEM}>Bỏ gim</span>
			</Menu.Item>
		</Menu>
	);

	return (
		<>
			<div
				className={`nutshell-pin-container ${isItem ? "select" : ""} ${
					isHover ? "" : "no-hover"
				}`}
			>
				<div
					className='nutshell-pin-container_left'
					onClick={handleOnClick}
				>
					<div className='nutshell-pin-container_icon'>
						<MessageTwoTone />
					</div>

					<div className='nutshell-pin-container_messsage'>
						<div className='nutshell-pin-container_title'>
							Tin nhắn
						</div>
						<div className='nutshell-pin-container_detail'>
							<TypeMessagePin
								name={message.user.name}
								content={message.content}
								type={message.type}
							/>
						</div>
					</div>
				</div>
				<div
					className={`nutshell-pin-container_right ${
						isItem ? "no-display" : ""
					}`}
				>
					{isItem ? (
						<Dropdown
							overlay={menu}
							placement='bottomLeft'
							trigger={["click"]}
						>
							<button className='nutshell-pin-container_button-interact'>
								<DashOutlined />
							</button>
						</Dropdown>
					) : (
						<Button
							style={NutshellPinMessageStyle.BUTTON_LIST}
							type='primary'
							ghost
							onClick={handleOnClickVisbleList}
						>
							{`${quantity} ghim tin khác`}
							<CaretDownOutlined />
						</Button>
					)}
				</div>
			</div>

			<ModalDetailMessagePin
				visible={visible}
				message={message}
				onClose={handleCloseModal}
			/>
		</>
	);
};

NutshellPinMessage.propTypes = {
	isItem: PropTypes.bool,
	onOpenDrawer: PropTypes.func,
	message: PropTypes.object,
	quantity: PropTypes.number,
	isCheckbox: PropTypes.bool,
	isHover: PropTypes.bool,
};

NutshellPinMessage.defaultProps = {
	isItem: false,
	onOpenDrawer: null,
	message: {},
	quantity: 0,
	isCheckbox: false,
	isHover: true,
};

export default NutshellPinMessage;
