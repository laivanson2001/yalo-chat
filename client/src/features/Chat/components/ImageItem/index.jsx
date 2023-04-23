import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Image } from "antd";
import IMAGE_ITEM_STYLE from "./ImageItemStyle";
import { fallback } from "constants/images";
import OverlayImage from "components/OverlayImage";

const ImageItem = ({ url, height, width, type, onVisibleVideoModal }) => {
	const dementionStyle = {
		width: width,
		height: height,
	};

	const handleOnClick = () => {
		if (type === "video" && onVisibleVideoModal) {
			onVisibleVideoModal(url);
		}
	};

	return (
		<div className='item-img-wrapper' onClick={handleOnClick}>
			<div id='item-img' style={dementionStyle}>
				<Image
					style={IMAGE_ITEM_STYLE.IMAGE}
					src={url}
					fallback={fallback}
					width={width}
					height={height}
					preview={{ mask: <OverlayImage /> }}
				/>
			</div>
		</div>
	);
};

ImageItem.propTypes = {
	url: PropTypes.string,
	height: PropTypes.number,
	width: PropTypes.number,
	type: PropTypes.string,
	onVisibleVideoModal: PropTypes.func,
};

ImageItem.defaultProps = {
	url: "https://kenh14cdn.com/thumb_w/660/2020/7/23/h2-1595477334052655614583.jpg",
	height: 110,
	width: 110,
	type: "image",
	onVisibleVideoModal: null,
};

export default ImageItem;
