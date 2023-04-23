import React from "react";
import PropTypes from "prop-types";
import ModalVideo from "react-modal-video";

const ModalVideoCustom = ({ isVisible, onClose, url }) => {
	const handleOnClose = () => {
		if (onClose) {
			onClose();
		}
	};

	return (
		<>
			<ModalVideo
				channel='custom'
				autoplay
				url={url}
				isOpen={isVisible}
				onClose={handleOnClose}
				animationSpeed={300}
				ratio='16:9'
			/>
		</>
	);
};

ModalVideoCustom.propTypes = {
	isVisible: PropTypes.bool,
	url: PropTypes.string,
	onClose: PropTypes.func,
};

ModalVideoCustom.defaultProps = {
	isVisible: false,
	url: "",
	onClose: null,
};

export default ModalVideoCustom;
