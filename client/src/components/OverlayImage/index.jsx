import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

const OverlayImage = (props) => {
	return <div className='overlay-item'>{props.children}</div>;
};

OverlayImage.propTypes = {};

export default OverlayImage;
