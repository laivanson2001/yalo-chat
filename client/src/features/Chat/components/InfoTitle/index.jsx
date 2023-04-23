import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { LeftOutlined } from "@ant-design/icons";

const InfoTitle = ({ text, onBack, isBack, isSelected, type }) => {
	const handleOnClick = () => {
		if (onBack) {
			if (type === "broadcast") {
				onBack();
			} else {
				onBack(0);
			}
		}
	};

	return (
		<div className='info_title'>
			{isBack && (
				<div className='back-icon' onClick={handleOnClick}>
					<LeftOutlined />
				</div>
			)}

			<span>{text}</span>
		</div>
	);
};

InfoTitle.propTypes = {
	text: PropTypes.string,
	onBack: PropTypes.func,
	isBack: PropTypes.bool,
	isSelected: PropTypes.bool,
	type: PropTypes.string,
};

InfoTitle.defaultProps = {
	text: "",
	onBack: null,
	isBack: false,
	isSelected: false,
	type: "",
};

export default InfoTitle;
