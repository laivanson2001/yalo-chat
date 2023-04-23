import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Input, Modal } from "antd";

const ModalChangeNameChannel = ({ visible, onOk, onCancel, initialValue }) => {
	const [value, setValue] = useState("");

	const handleOk = () => {
		if (onOk) {
			onOk(value);
		}
	};

	const handleCancel = () => {
		if (onCancel) {
			onCancel();
			setValue("");
		}
	};

	const handleOnchange = (e) => {
		setValue(e.target.value);
	};

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue, visible]);

	return (
		<Modal
			title='Đổi tên Channel'
			open={visible}
			onOk={handleOk}
			onCancel={handleCancel}
			onText='Thay đổi'
			cancelText='Hủy'
			okButtonProps={{ disabled: value.trim().length === 0 }}
		>
			<Input
				placeholder='Nhập tên mới'
				allowClear
				value={value}
				onChange={handleOnchange}
			/>
		</Modal>
	);
};

ModalChangeNameChannel.propTypes = {
	visible: PropTypes.bool,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
	initialValue: PropTypes.string,
};

ModalChangeNameChannel.defaultProps = {
	visible: false,
	onOk: null,
	onCancel: null,
	initialValue: "",
};

export default ModalChangeNameChannel;
