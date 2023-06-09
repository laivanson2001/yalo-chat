import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Input, Modal } from "antd";

const ModalAddFriend = ({ isVisible, onCancel, onSearch, onEnter }) => {
	const [value, setValue] = useState("");

	const handleOk = () => {
		if (onSearch) {
			onSearch(value);
		}
	};

	const handleCancel = () => {
		if (onCancel) {
			onCancel();
		}
	};

	const handleInputChange = ({ target: { value } }) => {
		setValue(value);
	};

	const handleOnPressEnter = () => {
		if (onEnter) {
			onEnter(value);
		}
	};

	return (
		<Modal
			title='Thêm bạn'
			open={isVisible}
			onOk={handleOk}
			onCancel={handleCancel}
			// centered
			width={360}
			okText='Tìm kiếm'
			cancelText='Hủy'
			okButtonProps={{ disabled: !(value.trim().length > 0) }}
		>
			<div className='input-add-friend_wrapper'>
				<Input
					placeholder='Nhập số điện thoại hoặc email'
					allowClear
					value={value}
					onChange={handleInputChange}
					onPressEnter={handleOnPressEnter}
				/>
			</div>
		</Modal>
	);
};

ModalAddFriend.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	onCancel: PropTypes.func,
	onSearch: PropTypes.func,
};

ModalAddFriend.defaultProps = {
	onCancel: null,
	onSearch: null,
};

export default ModalAddFriend;
