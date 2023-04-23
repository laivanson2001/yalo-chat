import React from "react";
import PropTypes from "prop-types";
import ContactItem from "../ContactItem";

const ListContact = ({ data }) => {
	return (
		<div id='list-friend-card'>
			{data &&
				data.length > 0 &&
				data.map((ele, index) => {
					if (ele.isExists) {
						return <ContactItem key={index} data={ele} />;
					}
				})}
		</div>
	);
};

ListContact.propTypes = { data: PropTypes.array };

ListContact.defaultProps = {
	data: [],
};

export default ListContact;
