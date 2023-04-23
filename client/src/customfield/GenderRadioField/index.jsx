import React from "react";
import PropTypes from "prop-types";
import { Radio } from "antd";

const GenderRadioField = ({ field }) => {
	const { name, value } = field;

	const handleChange = (e) => {
		const selectedValue = e.target.value;

		const changeEvent = {
			target: {
				name: name,
				value: selectedValue,
			},
		};

		field.onChange(changeEvent);
	};

	return (
		<Radio.Group value={value} onChange={handleChange}>
			<Radio key={0} value={0}>
				Nam
			</Radio>

			<Radio key={1} value={1}>
				Nữ
			</Radio>
		</Radio.Group>
	);
};

GenderRadioField.propTypes = {};

export default GenderRadioField;
