import React from "react";
import PropTypes from "prop-types";
import FriendCard from "../FriendCard";
import { useDispatch, useSelector } from "react-redux";
import friendApi from "api/friendApi";
import {
	fetchFriends,
	fetchListRequestFriend,
	setAmountNotify,
} from "features/Friend/friendSlice";
import { fetchListFriends } from "features/Chat/slice/chatSlice";
import { message } from "antd";

const ListRequestFriend = ({ data }) => {
	const dispatch = useDispatch();

	const { amountNotify } = useSelector((state) => state.friend);

	const handeDenyRequest = async (value) => {
		await friendApi.deleteRequestFriend(value._id);
		dispatch(setAmountNotify(amountNotify - 1));
		dispatch(fetchListRequestFriend());
	};

	const handleOnAccept = async (value) => {
		await friendApi.acceptRequestFriend(value._id);
		dispatch(fetchListRequestFriend());
		dispatch(fetchFriends({ name: "" }));
		dispatch(fetchListFriends({ name: "" }));
		dispatch(setAmountNotify(amountNotify - 1));
		message.success("Thêm bạn thành công");
	};

	return (
		<div id='list-friend-card'>
			{data &&
				data.length > 0 &&
				data.map((ele, index) => (
					<FriendCard
						key={index}
						data={ele}
						onDeny={handeDenyRequest}
						onAccept={handleOnAccept}
					/>
				))}
		</div>
	);
};

ListRequestFriend.propTypes = { data: PropTypes.array };

ListRequestFriend.defaultProps = {
	data: [],
};

export default ListRequestFriend;
