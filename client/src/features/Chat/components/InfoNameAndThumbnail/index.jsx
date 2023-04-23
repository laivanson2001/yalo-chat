import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Input, Modal, message } from "antd";
import { useSelector } from "react-redux";
import conversationApi from "api/conversationApi";
import UploadAvatar from "components/UploadAvatar";
import ConversationAvatar from "../ConversationAvatar";
import { EditOutlined } from "@ant-design/icons";

const InfoNameAndThumbnail = ({ conversation }) => {
	const { currentConversation } = useSelector((state) => state.chat);

	const refInitValue = useRef();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [value, setValue] = useState("");
	const [file, setFile] = useState(null);
	const [isClear, setIsClear] = useState(false);

	const handleOk = async () => {
		setConfirmLoading(true);
		try {
			if (refInitValue.current !== value) {
				await conversationApi.changeNameConversation(
					currentConversation,
					value
				);
			}

			if (file) {
				const frmData = new FormData();
				frmData.append("file", file);
				await conversationApi.changAvatarGroup(
					currentConversation,
					frmData
				);
			}

			message.success("Cập nhật thông tin thành công");
		} catch (error) {}
		setConfirmLoading(false);
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		setFile(null);
		setIsClear(true);
	};

	const handleGetfile = (file) => {
		setFile(file);
	};

	const handleInputChange = (e) => {
		setValue(e.target.value);
	};

	const handleOnClick = () => {
		setIsModalVisible(true);
	};

	useEffect(() => {
		if (conversation.type) {
			setValue(conversation.name);
			refInitValue.current = conversation.name;
		}

		if (isModalVisible) {
			setIsClear(false);
		}
	}, [currentConversation, isModalVisible]);

	return (
		<div className='info_name-and-thumbnail'>
			<Modal
				title='Cập nhật cuộc trò chuyện'
				open={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				okText='Thay đổi'
				cancelText='Hủy'
				closable={false}
				confirmLoading={confirmLoading}
				okButtonProps={{
					disabled:
						(refInitValue.current === value && !file) ||
						value.trim().length === 0,
				}}
			>
				<div className='update-profile_wrapper'>
					<div className='update-profile_upload'>
						<UploadAvatar
							avatar={
								typeof conversation.avatar === "string"
									? conversation.avatar
									: ""
							}
							getFile={handleGetfile}
							isClear={isClear}
						/>
					</div>

					<div className='update-profile_input'>
						<Input
							placeholder='Nhập tên mới'
							onChange={handleInputChange}
							value={value}
						/>
					</div>
				</div>
			</Modal>
			<div className='info-thumbnail'>
				<ConversationAvatar
					isGroupCard={true}
					totalMembers={conversation.totalMembers}
					type={conversation.type}
					avatar={conversation.avatar}
					name={conversation.name}
					avatarColor={conversation?.avatarColor}
				/>
			</div>

			<div className='info-name-and-button'>
				<div className='info-name'>
					<span>{conversation.name}</span>
				</div>

				{conversation.type && (
					<div className='info-button'>
						<EditOutlined onClick={handleOnClick} />
					</div>
				)}
			</div>
		</div>
	);
};

InfoNameAndThumbnail.propTypes = { conversation: PropTypes.object };

InfoNameAndThumbnail.defaultProps = {
	conversation: {},
};

export default InfoNameAndThumbnail;
