import React from "react";
import PropTypes from "prop-types";
import FeatureBox from "../FeatureBox";

const Feature = ({ data }) => {
	return (
		<section className='features' id='features'>
			<h1 className='heading'>Tính năng </h1>

			<div className='box-container'>
				<FeatureBox />
			</div>
		</section>
	);
};

Feature.propTypes = { data: PropTypes.array };

export default Feature;
