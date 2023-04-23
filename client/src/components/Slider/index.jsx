import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Carousel } from "antd";
import SliderItem from "components/SliderItem";

const Slider = (props) => {
	const { features } = useSelector((state) => state.home);

	return (
		<Carousel autoplay dots={false}>
			{features?.map((ele, index) => (
				<SliderItem
					key={index}
					src={ele.image}
					title={ele.title}
					detail={ele.descrpition}
				/>
			))}
		</Carousel>
	);
};

Slider.propTypes = {};

export default Slider;
