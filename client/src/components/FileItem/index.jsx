import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { FileIcon, defaultStyles } from "react-file-icon";
import fileHelpers from "utils/fileHelpers";
import { CloudDownloadOutlined, ShareAltOutlined } from "@ant-design/icons";

const FileItem = ({ file, inArchive }) => {
	const fileName = fileHelpers.getFileName(file.content);
	const fileExtension = fileHelpers.getFileExtension(fileName);

	const handleOnClickShare = () => {};

	const handleOnClickDownLoad = () => {
		window.open(file.content, "_blank");
	};

	return (
		<div
			className='item-file'
			// onClick={handleOnClickDownLoad}
		>
			<div className='item-file--icon'>
				<FileIcon
					extension={fileExtension}
					{...defaultStyles[fileExtension]}
				/>
			</div>

			<div className='item-file--name'>{fileName}</div>

			<div className='item-file--interact'>
				<div
					className='item-file_button item-file_button--mg-right'
					onClick={handleOnClickShare}
				>
					<ShareAltOutlined />
				</div>

				<div
					className='item-file_button'
					onClick={handleOnClickDownLoad}
				>
					<CloudDownloadOutlined />
				</div>
			</div>
		</div>
	);
};

FileItem.propTypes = {
	file: PropTypes.object.isRequired,
	inArchive: PropTypes.bool,
};

FileItem.defaultProps = {
	inArchive: false,
};

export default FileItem;
