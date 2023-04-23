import React from "react";
import PropTypes from "prop-types";
import { Upload, message } from "antd";
import { useSelector } from "react-redux";
import ACCEPT_FILE from "constants/acceptFile";
import messageApi from "api/messageApi";

const UploadFile = ({ typeOfFile, children }) => {
	const { currentConversation, currentChannel } = useSelector(
		(state) => state.chat
	);

	const handleCustomRequest = async ({ file }) => {
		const fmData = new FormData();
		let typeFile;

		if (typeOfFile === "media") {
			typeFile = file.type.startsWith("image") ? "IMAGE" : "VIDEO";
		} else {
			typeFile = "FILE";
		}
		fmData.append("file", file);

		const attachInfo = {
			type: typeFile,
			conversationId: currentConversation,
		};

		if (currentChannel) {
			attachInfo.channelId = currentChannel;
		}

		try {
			await messageApi.sendFileThroughMessage(
				fmData,
				attachInfo,
				(percentCompleted) => {
					console.log("value", percentCompleted);
				}
			);
			message.success(`Đã tải lên ${file.name}`);
		} catch (e) {
			message.error(`Tải lên ${file.name} thất bại.`);
		}
	};

	return (
		<Upload
			accept={
				typeOfFile === "media"
					? ACCEPT_FILE.IMAGE_VIDEO
					: ACCEPT_FILE.FILE
			}
			multiple={true}
			progress
			customRequest={handleCustomRequest}
			showUploadList={false}
		>
			{children}
		</Upload>
	);
};

UploadFile.propTypes = { typeOfFile: PropTypes.string };

UploadFile.defaultProp = {
	typeOfFile: "",
};

export default UploadFile;
