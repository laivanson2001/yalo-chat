import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Avatar } from "antd";
import AvatarCustom from "components/AvatarCustom";

const LastView = ({ lastView }) => {
	return (
		<Avatar.Group
			maxCount={5}
			size='small'
			maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
		>
			{lastView?.map((ele, index) => (
				<AvatarCustom key={index} src={ele.avatar} name={ele.name} />
			))}
		</Avatar.Group>
	);
};

LastView.propTypes = { lastView: PropTypes.array };

LastView.defaultProps = {
	lastView: [],
};

export default LastView;
