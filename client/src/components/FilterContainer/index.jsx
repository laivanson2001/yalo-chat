import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Tabs } from "antd";
import ConverPersonalSearch from "components/ConverPersonalSearch";
import ConverMutipleSearch from "components/ConverMutipleSearch";

const FilterContainer = ({ dataMutiple, dataSingle }) => {
	const items = [
		{
			key: "1",
			label: "Cá nhân",
			children: <ConverPersonalSearch data={dataSingle} />,
		},
		{
			key: "2",
			label: "Nhóm",
			children: <ConverMutipleSearch data={dataMutiple} />,
		},
	];

	return (
		<div className='filter-container'>
			<Tabs defaultActiveKey='1' items={items} />
		</div>
	);
};

FilterContainer.propTypes = {
	dataSingle: PropTypes.array,
	dataMutiple: PropTypes.array,
};

FilterContainer.defaultProps = {
	dataMutiple: [],
	dataSingle: [],
};

export default FilterContainer;
