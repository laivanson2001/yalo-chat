import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import FileItem from "components/FileItem";

const ContentTabPaneFile = ({ items }) => {
	return (
		<div id='conten-tabpane-file'>
			{items?.map((itemEle, index) => (
				<FileItem key={index} file={itemEle} inArchive={true} />
			))}
		</div>
	);
};

ContentTabPaneFile.propTypes = { items: PropTypes.array };

ContentTabPaneFile.defaultProps = {
	items: [],
};

export default ContentTabPaneFile;
