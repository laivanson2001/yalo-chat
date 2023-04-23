import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import FriendCard from "../FriendCard";
import friendApi from "api/friendApi";
import { useDispatch } from "react-redux";
import { fetchListMyRequestFriend } from "features/Friend/friendSlice";

const ListMyFriendRequest = ({ data }) => {
	const dispatch = useDispatch();

	const handleRemoveMyRequest = async (value) => {
		await friendApi.deleteSentRequestFriend(value._id);
		dispatch(fetchListMyRequestFriend());
	};

	return (
		<div className='list-my-friend-request'>
			{data &&
				data.length > 0 &&
				data.map((ele, index) => (
					<FriendCard
						key={index}
						isMyRequest={true}
						data={ele}
						onCancel={handleRemoveMyRequest}
					/>
				))}
		</div>
	);
};

ListMyFriendRequest.propTypes = { data: PropTypes.array };

export default ListMyFriendRequest;
