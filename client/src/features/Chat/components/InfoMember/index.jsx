import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import {
	CaretDownOutlined,
	CopyOutlined,
	ExclamationCircleOutlined,
	LinkOutlined,
	LockOutlined,
	UnlockOutlined,
} from "@ant-design/icons";
import { GrGroup } from "react-icons/gr";
import { useSelector } from "react-redux";
import { Modal, message } from "antd";
import conversationApi from "api/conversationApi";

const { confirm } = Modal;

const styleIconDrop = {
	transform: "rotate(-90deg)",
};

const styleInteract = {
	maxHeight: "0px",
};

const InfoMember = ({ viewMemberClick, quantity }) => {
	const { user } = useSelector((state) => state.global);
	const { currentConversation, conversations } = useSelector(
		(state) => state.chat
	);

	const [isDrop, setIsDrop] = useState(true);
	const [checkLeader, setCheckLeader] = useState(false);
	const [status, setSatus] = useState(false);

	const handleOnClick = () => {
		setIsDrop(!isDrop);
	};

	const handleViewAll = () => {
		if (viewMemberClick) {
			viewMemberClick(1);
		}
	};

	const handleCopyLink = () => {
		navigator.clipboard.writeText(
			`${process.env.REACT_APP_URL}/jf-link/${currentConversation}`
		);
		message.info("Đã sao chép link");
	};

	const showConfirm = () => {
		confirm({
			title: "Cảnh báo",
			icon: <ExclamationCircleOutlined />,
			content: status
				? "Người dùng có thể không tham gia bằng link được nữa"
				: "Người dùng có thể tham gia bằng link",
			onOk: handleChangeSatus,
			okText: "Đồng ý",
			cancelText: "Hủy",
		});
	};

	const handleChangeSatus = async () => {
		try {
			await conversationApi.changeStatusForGroup(
				currentConversation,
				status ? 0 : 1
			);

			setSatus(!status);
			message.success("Cập nhật thành công");
		} catch (error) {
			message.error("Cập nhật thành công");
		}
	};

	useEffect(() => {
		const tempStatus = conversations.find(
			(ele) => ele._id === currentConversation
		).isJoinFromLink;
		const tempCheck =
			conversations.find((ele) => ele._id === currentConversation)
				.leaderId === user._id;
		setCheckLeader(tempCheck);
		setSatus(tempStatus);
	}, [currentConversation]);

	return (
		<div className='info_member'>
			<div className='info_member-header' onClick={handleOnClick}>
				<div className='info_member-header-title'>Thành viên nhóm</div>

				<div
					className='info_member-header-icon'
					style={isDrop ? {} : styleIconDrop}
				>
					<CaretDownOutlined />
				</div>
			</div>

			<div
				className='info_member-interact'
				style={isDrop ? {} : styleInteract}
			>
				<div
					className='info_member-interact-amount'
					onClick={handleViewAll}
				>
					<div className='info_member-interact-amount-icon'>
						<GrGroup />
					</div>

					<div className='info_member-interact-amount-text'>
						<span>{quantity} thành viên</span>
					</div>
				</div>

				<div className='info_member-interact-amount'>
					<div className='info_member-interact-amount-icon'>
						<LinkOutlined />
					</div>

					<div className='info_member-interact-amount-text'>
						<div className='info_member-interact_link-title'>
							Link tham gia nhóm
						</div>

						<div className='info_member-interact_link-des'>
							{`${process.env.REACT_APP_URL}/jf-link/${currentConversation}`}
						</div>
					</div>

					<div
						className={`info_member-interact_button ${
							checkLeader ? "" : "flex-end"
						}`}
					>
						<div
							className='copy-link cirle-button'
							onClick={handleCopyLink}
						>
							<CopyOutlined />
						</div>

						{checkLeader && (
							<>
								{status ? (
									<div
										className='authorize-toggle cirle-button  green'
										onClick={showConfirm}
									>
										<UnlockOutlined />
									</div>
								) : (
									<div
										className='authorize-toggle cirle-button  red'
										onClick={showConfirm}
									>
										<LockOutlined />
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

InfoMember.propTypes = {
	viewMemberClick: PropTypes.func,
	quantity: PropTypes.number.isRequired,
};

InfoMember.defaultProps = {
	viewMemberClick: null,
};

export default InfoMember;
