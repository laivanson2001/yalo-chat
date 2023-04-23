import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { FileIcon, defaultStyles } from "react-file-icon";
import fileHelpers from "utils/fileHelpers";
import { MdQuestionAnswer } from "react-icons/md";
import { CloseCircleFilled } from "@ant-design/icons";

const ReplyBlock = ({ replyMessage, onCloseReply }) => {
	const fileName =
		replyMessage.type === "FILE" &&
		fileHelpers.getFileName(replyMessage.content);
	const fileExtension =
		replyMessage.type === "FILE" && fileHelpers.getFileExtension(fileName);

	const handleOnCloseReply = () => {
		if (onCloseReply) {
			onCloseReply();
		}
	};

	return (
		<div className='reply-block'>
			<div className='vertical-bar' />

			{replyMessage.type === "IMAGE" ? (
				<div className='reply-block_logo'>
					<img src={replyMessage.content} alt='' />
				</div>
			) : replyMessage.type === "VIDEO" ? (
				<div className='reply-block_logo'>
					<img
						src='https://www.pngitem.com/pimgs/m/501-5010215_vidia-logos-download-video-logo-png-transparent-png.png'
						alt=''
					/>
				</div>
			) : replyMessage.type === "FILE" ? (
				<div className='reply-block_logo'>
					<div className='file_info-icon'>
						<FileIcon
							extension={fileExtension}
							{...defaultStyles[fileExtension]}
						/>
					</div>
				</div>
			) : replyMessage.type === "STICKER" ? (
				<div className='reply-block_logo'>
					<img src={replyMessage.content} alt='' />
				</div>
			) : (
				<div></div>
			)}

			<div className='reply-block_info'>
				<div className='info-blog_info--top'>
					<MdQuestionAnswer />
					&nbsp;
					<span>
						Trả lời{" "}
						<strong className='reply-block_info--user'>
							{replyMessage.user.name}
						</strong>
					</span>
				</div>

				<div className='info-blog_info--bottom'>
					{replyMessage.type === "IMAGE" ? (
						<span>[Hình ảnh]</span>
					) : replyMessage.type === "VIDEO" ? (
						<span>[Video]</span>
					) : replyMessage.type === "FILE" ? (
						<span>[File] {fileName}</span>
					) : replyMessage.type === "STICKER" ? (
						<span>[Stikcer]</span>
					) : replyMessage.type === "HTML" ? (
						<span>[Văn bản]</span>
					) : (
						replyMessage.content
					)}
				</div>
			</div>

			<div className='reply-block_close-btn' onClick={handleOnCloseReply}>
				<CloseCircleFilled />
			</div>
		</div>
	);
};

ReplyBlock.propTypes = {
	replyMessage: PropTypes.object,
	onCloseReply: PropTypes.func,
};

ReplyBlock.defaultProps = {
	replyMessage: null,
	onCloseReply: null,
};

export default ReplyBlock;
