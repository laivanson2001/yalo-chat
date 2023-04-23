import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

const SliderItem = ({ src, title, detail }) => {
	return (
		<div className='carousel-slider--item'>
			<div className='slider-img'>
				<img src={src} alt='' />
			</div>

			<div className='slider-content'>
				<div className='slider-content--title'>
					<span>{title}</span>
				</div>

				<div className='slider-content-detail'>
					<span>{detail}</span>
				</div>
			</div>
		</div>
	);
};

SliderItem.propTypes = {
	src: PropTypes.string,
	title: PropTypes.string,
	detail: PropTypes.string,
};

SliderItem.defaultProps = {
	src: "",
	title: "",
	detail: "",
};

export default SliderItem;
