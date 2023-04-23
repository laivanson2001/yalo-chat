import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import Scrollbars from "react-custom-scrollbars";
import FriendItem from "../FriendItem";
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import userApi from "api/userApi";
import friendApi from "api/friendApi";
import { fetchFriends } from "features/Friend/friendSlice";
import UserCard from "components/UserCard";

const ListFriend = ({ data }) => {
	const dispatch = useDispatch();

	const [isVisible, setIsVisible] = useState(false);
	const [userIsFind, setUserIsFind] = useState({});

	const handleOnClickMenu = async (key, id) => {
		if (key === "2") {
			confirm(id);
		} else {
			setIsVisible(true);
			const tempUser = data.find((ele) => ele._id === id);
			const realUser = await userApi.fetchUser(tempUser.username);
			setUserIsFind(realUser);
		}
	};

	const confirm = (id) => {
		Modal.confirm({
			title: "Xác nhận",
			icon: <ExclamationCircleOutlined />,
			content: (
				<span>
					Bạn có thực sự muốn xóa{" "}
					<b>{data.find((ele) => ele._id === id).name}</b> khỏi danh
					sách bạn bè{" "}
				</span>
			),
			okText: "Xóa",
			cancelText: "Hủy",
			onOk: () => handleOkModal(id),
		});
	};

	const handleOkModal = async (id) => {
		try {
			await friendApi.deleteFriend(id);
			dispatch(fetchFriends({ name: "" }));
			message.success("Xóa thành công");
			setIsVisible(false);
		} catch (error) {
			message.error("Xóa thất bại");
		}
	};

	const handleCancelModalUserCard = () => {
		setIsVisible(false);
	};

	return (
		<Scrollbars
			autoHide={true}
			autoHideTimeout={1000}
			autoHideDuration={200}
			style={{ height: "100%", width: "100%" }}
		>
			{data.length > 0 &&
				data.map((ele, index) => (
					<FriendItem
						key={index}
						data={ele}
						onClickMenu={handleOnClickMenu}
					/>
				))}

			<UserCard
				user={userIsFind}
				isVisible={isVisible}
				onCancel={handleCancelModalUserCard}
			/>
		</Scrollbars>
	);
};

ListFriend.propTypes = { data: PropTypes.array };

ListFriend.defaultProps = {
	data: [],
};

export default ListFriend;
