import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Select } from "antd";
import dateUtils from "utils/dateUtils";

const { Option } = Select;

const DateOfBirthField = ({ field }) => {
	const { name, value } = field;
	const { day, month, year } = value;

	const [dateOfBirth, setDateOfBirth] = useState({ ...value });

	const renderDays = () => {
		let end = 31;

		const { month, year } = dateOfBirth;
		if (month === 4 || month === 6 || month === 9 || month === 11) end = 30;

		if (month === 2) {
			if (dateUtils.checkLeapYear(year)) end = 29;
			else end = 28;
		}

		const result = [];

		for (let i = 1; i <= end; i++) {
			result.push(
				<Option value={i} key={i}>
					{i}
				</Option>
			);
		}
		return result;
	};

	const renderMonths = () => {
		const result = [];

		for (let i = 1; i <= 12; i++) {
			result.push(
				<Option value={i} key={i} disabled={handleMonthDisabled(i)}>
					{i}
				</Option>
			);
		}
		return result;
	};

	const renderYears = () => {
		const result = [];

		const yearValid = new Date().getFullYear();
		for (let i = 1950; i <= yearValid; i++) {
			result.push(
				<Option value={i} key={i}>
					{i}
				</Option>
			);
		}
		return result;
	};

	const handleMonthDisabled = (month) => {
		const { day, year } = dateOfBirth;

		if (day === 31) {
			if (
				month === 2 ||
				month === 4 ||
				month === 6 ||
				month === 9 ||
				month === 11
			)
				return true;
		}

		if (day === 30 && month === 2) return true;

		if (day === 29 && month === 2 && !dateUtils.checkLeapYear(year))
			return true;
	};

	const handleDayChange = (dayValue) => {
		const valueTempt = { ...value, day: dayValue };
		setDateOfBirth(valueTempt);
		handleValueChange(valueTempt);
	};

	const handleValueChange = (value) => {
		const changeEvent = {
			target: {
				name,
				value,
			},
		};

		field.onChange(changeEvent);
	};

	const handleMonthChange = (monthValue) => {
		const valueTempt = { ...value, month: monthValue };
		setDateOfBirth(valueTempt);
		handleValueChange(valueTempt);
	};

	const handleYearChange = (yearValue) => {
		const valueTempt = { ...value, year: yearValue };
		setDateOfBirth(valueTempt);
		handleValueChange(valueTempt);
	};

	return (
		<div className='day-of-birth_wrapper'>
			<Select
				defaultValue={day}
				style={{ width: 120 }}
				onChange={handleDayChange}
			>
				{renderDays()}
			</Select>

			<Select
				defaultValue={month}
				style={{ width: 120 }}
				onChange={handleMonthChange}
			>
				{renderMonths()}
			</Select>

			<Select
				defaultValue={year}
				style={{ width: 120 }}
				onChange={handleYearChange}
			>
				{renderYears()}
			</Select>
		</div>
	);
};

DateOfBirthField.propTypes = {};

export default DateOfBirthField;
