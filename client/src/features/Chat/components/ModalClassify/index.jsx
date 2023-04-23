import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Button, Input, Modal, Popover, Typography, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
	DeleteOutlined,
	EditOutlined,
	ExclamationCircleOutlined,
	InfoCircleFilled,
	LeftOutlined,
	PlusOutlined,
	TagTwoTone,
} from "@ant-design/icons";
import ClassifyApi from "api/ClassifyApi";
import { fetchListClassify } from "features/Chat/slice/chatSlice";

const { Text } = Typography;

const ModalClassify = ({ isVisible, onCancel, onOpen }) => {
	const dispatch = useDispatch();
	const previousName = useRef();

	const { classifies, colors } = useSelector((state) => state.chat);

	const [isModalEdit, setIsModalEdit] = useState(false);
	const [isShowModalAdd, setIsShowModalAdd] = useState(false);
	const [nameTag, setNameTag] = useState("");
	const [color, setColor] = useState({});
	const [isShowError, setIsShowError] = useState(false);

	const handleCancel = () => {
		if (onCancel) {
			onCancel();
		}
	};

	const handleEditClasify = (value) => {
		setIsModalEdit(true);
		setIsShowModalAdd(true);
		if (onCancel) {
			onCancel();
		}
		setNameTag(value.name);
		setColor(value.color);
		previousName.current = value;
	};

	const confirm = (value) => {
		Modal.confirm({
			title: "Cảnh báo",
			icon: <ExclamationCircleOutlined />,
			content: `Bạn có thực sự muốn xóa ? `,
			okText: "Đồng ý",
			cancelText: "Hủy",
			onOk: () => {
				handleDeleteClasify(value);
			},
		});
	};

	const handleDeleteClasify = async (value) => {
		try {
			await ClassifyApi.deleteClassify(value._id);
			message.success("Xóa thành công");
			dispatch(fetchListClassify());
		} catch (error) {
			message.error("Xóa thất bại");
		}
	};

	const handleShowModalAdd = () => {
		setIsShowModalAdd(true);
		setIsModalEdit(false);
		setNameTag("");
		if (onCancel) {
			onCancel();
		}
	};

	const handleBackModal = () => {
		setIsShowModalAdd(false);
		setIsModalEdit(false);

		if (onOpen) {
			onOpen();
		}
	};

	const handleCreateClassify = async () => {
		if (isModalEdit) {
			try {
				await ClassifyApi.updateClassify(
					previousName.current._id,
					nameTag,
					color._id
				);
				message.success("Cập nhật thành công");
				setIsShowModalAdd(false);
				dispatch(fetchListClassify());
				if (onOpen) {
					onOpen();
				}
			} catch (error) {
				message.error("Cập nhật thất bại");
			}
		} else {
			try {
				await ClassifyApi.addClassify(nameTag, color._id);
				message.success("Thêm thành công");
				setIsShowModalAdd(false);
				dispatch(fetchListClassify());
			} catch (error) {
				message.error("Thêm thất bại");
			}
		}

		setIsModalEdit(false);
	};

	const handleCancelModalAdd = () => {
		setIsShowModalAdd(false);
	};

	const handleInputChange = (e) => {
		const value = e.target.value;
		const index = classifies.findIndex(
			(ele) => ele.name.toLowerCase() === value.toLowerCase()
		);

		// !isModalEdit &&
		if (index >= 0) {
			if (!isModalEdit) {
				setIsShowError(true);
			} else {
				if (
					previousName.current.name.toLowerCase() !==
					classifies[index].name.toLowerCase()
				) {
					setIsShowError(true);
				}
			}
		} else {
			setIsShowError(false);
		}
		setNameTag(value);
	};

	const content = (
		<div className='popup-change-color'>
			<span>Thay đổi màu thẻ</span>
			<div className='list-color'>
				{colors.length > 0 &&
					colors?.map((ele, index) => (
						<div
							key={index}
							onClick={() => handleClickColor(ele)}
							className='popup-color-item'
							style={{ background: ele.code }}
						/>
					))}
			</div>
		</div>
	);

	const handleClickColor = (color) => {
		setColor(color);
	};

	useEffect(() => {
		if (colors.length > 0) {
			setColor(colors[0]);
		}
	}, [colors]);

	return (
		<>
			<Modal
				open={isVisible}
				title='Quản lý thẻ phân loại'
				onCancel={handleCancel}
				footer={null}
			>
				<div className='modal-classify_wrapper'>
					<span className='modal-classify_title'>
						Danh sách thẻ phân loại
					</span>

					<div className='modal-classify_list-classify'>
						{classifies?.map((ele, index) => (
							<div className='modal-classify-item' key={index}>
								<div className='modal-classify-item--left'>
									<div className='classify-item-tag'>
										<TagTwoTone
											twoToneColor={ele.color.code}
										/>
									</div>

									<div className='classify-item-name'>
										{ele.name}
									</div>
								</div>

								<div className='modal-classify-item--right'>
									<div
										className='classify-item-edit icon-classify'
										onClick={() => handleEditClasify(ele)}
									>
										<EditOutlined />
									</div>

									<div
										className='classify-item-remove icon-classify'
										onClick={() => confirm(ele)}
									>
										<DeleteOutlined />
									</div>
								</div>

								<div className='modal-classify-item-amount'>
									2
								</div>
							</div>
						))}
					</div>

					<div
						className='modal-classify_add'
						onClick={handleShowModalAdd}
					>
						<PlusOutlined />
						&nbsp;Thêm phân loại
					</div>
				</div>
			</Modal>

			<Modal
				title={
					<div className='modal-add_header'>
						<div
							className='modal-add_header--icon'
							onClick={handleBackModal}
						>
							<LeftOutlined />
						</div>
						<span>
							{isModalEdit
								? "Chi Tiết thẻ phân loại"
								: "Thêm thẻ phân loại"}
						</span>
					</div>
				}
				open={isShowModalAdd}
				onOk={handleCreateClassify}
				onCancel={handleCancelModalAdd}
				okButtonProps={{
					disabled:
						(nameTag.trim().length > 0 ? false : true) ||
						isShowError ||
						!(
							previousName.current?.name !== nameTag ||
							previousName.current?.color._id !== color._id
						),
				}}
				okText={isModalEdit ? "Cập nhật" : "Thêm phân loại"}
				cancelText='Hủy'
			>
				<div className='modal-add-classify_wrapper'>
					<div className='modal-add-classify--title'>
						Tên thẻ phân loại
					</div>

					<div className='modal-add-classify--input'>
						<Input
							spellCheck={false}
							value={nameTag}
							size='middle'
							placeholder='Nhập tên thẻ phân loại'
							onChange={handleInputChange}
							suffix={
								<div className='tag-select-icon'>
									<Popover content={content} trigger='click'>
										<Button
											type='text'
											icon={
												<TagTwoTone
													twoToneColor={color.code}
												/>
											}
										/>
									</Popover>
								</div>
							}
						/>
					</div>

					<div className='check-name-classify'>
						{isShowError && (
							<Text type='danger'>
								<InfoCircleFilled />
								Tên phân loại đã tồn tại
							</Text>
						)}
					</div>
				</div>
			</Modal>
		</>
	);
};

ModalClassify.propTypes = {
	isVisible: PropTypes.bool,
	onCancel: PropTypes.func,
	onOpen: PropTypes.func,
};

ModalClassify.defaultProps = {
	isVisible: false,
	onCancel: null,
	onOpen: null,
};

export default ModalClassify;
