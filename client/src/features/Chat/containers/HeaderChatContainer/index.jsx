import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { useSelector } from "react-redux";
import HeaderOptional from "features/Chat/components/HeaderOptional";

const HeaderChatContainer = ({ onPopUpInfo, onOpenDrawer }) => {
	const { currentConversation, conversations, memberInConversation } =
		useSelector((state) => state.chat);

	const [detailConver, setDetailConver] = useState(null);

	useEffect(() => {
		if (currentConversation) {
			const tempConver = conversations?.find(
				(conver) => conver._id === currentConversation
			);
			if (tempConver) {
				setDetailConver(tempConver);
			}
		}
	}, [currentConversation, conversations]);
	return (
		<div id='header-main'>
			{detailConver && (
				<HeaderOptional
					avatar={detailConver.avatar}
					totalMembers={memberInConversation.length}
					name={detailConver.name}
					typeConver={detailConver.type}
					isLogin={detailConver?.isOnline}
					lastLogin={detailConver?.lastLogin}
					avatarColor={detailConver?.avatarColor}
					onPopUpInfo={onPopUpInfo}
					onOpenDrawer={onOpenDrawer}
				/>
			)}
		</div>
	);
};

HeaderChatContainer.propTypes = {
	onPopUpInfo: PropTypes.func,
	onOpenDrawer: PropTypes.func,
};

HeaderChatContainer.defaultProps = {
	onPopUpInfo: null,
	onOpenDrawer: null,
};

export default HeaderChatContainer;
