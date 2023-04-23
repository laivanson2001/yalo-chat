import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Empty } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	fetchListMessages,
	setCurrentConversation,
} from "features/Chat/slice/chatSlice";
import ConversationAvatar from "features/Chat/components/ConversationAvatar";

const ConverMutipleSearch = ({ data }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClickItem = (value) => {
		dispatch(fetchListMessages({ conversationId: value._id, size: 10 }));
		dispatch(setCurrentConversation(value._id));

		navigate("/chat");
	};

	return (
		<div className='list-filter_single-conver'>
			{data.length === 0 && <Empty />}

			{data?.map((ele, index) => (
				<div
					key={index}
					className='single-conver_item'
					onClick={() => handleClickItem(ele)}
				>
					<ConversationAvatar
						avatar={ele.avatar}
						totalMembers={ele.totalMembers}
						type={ele.type}
						name={ele}
					/>

					<div className='single-conver_name'>{ele.name}</div>
				</div>
			))}
		</div>
	);
};

ConverMutipleSearch.propTypes = { data: PropTypes.array };

ConverMutipleSearch.defaultProps = {
	data: [],
};

export default ConverMutipleSearch;
