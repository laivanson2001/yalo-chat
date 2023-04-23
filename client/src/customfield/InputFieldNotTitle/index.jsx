import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import { ErrorMessage } from "formik";
import TagCustom from "components/TagCustom";

const InputFieldNotTitle = ({
	field,
	type,
	placeholder,
	maxLength,
	disabled,
}) => {
	const { name } = field;
	return (
		<div>
			<Input
				{...field}
				type={type}
				maxLength={maxLength}
				placeholder={placeholder}
				disabled={disabled}
			/>
			<ErrorMessage name={name}>
				{(text) => <TagCustom title={text} color='error' />}
			</ErrorMessage>
		</div>
	);
};

InputFieldNotTitle.propTypes = {
	type: PropTypes.string,
	placeholder: PropTypes.string,
	maxLength: PropTypes.number,
	disabled: PropTypes.bool,
};

InputFieldNotTitle.defaultProps = {
	type: "text",
	placeholder: "",
	maxLength: 100,
	disabled: false,
};

export default InputFieldNotTitle;
