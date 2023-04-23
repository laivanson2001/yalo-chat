import React from "react";
import PropTypes from "prop-types";
import DevInfoBox from "../DevInfoBox";

const Developer = ({ data }) => {
	return (
		<section className='review' id='developer'>
			<h1 className='heading'>Người phát triển </h1>

			<div className='box-container'>
				<DevInfoBox />
			</div>
		</section>
	);
};

Developer.propTypes = { data: PropTypes.array };

export default Developer;
