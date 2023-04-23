import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import InfoTitle from "features/Chat/components/InfoTitle";
import { useDispatch, useSelector } from "react-redux";
import Scrollbars from "react-custom-scrollbars";
import InfoNameAndThumbnail from "features/Chat/components/InfoNameAndThumbnail";
import InfoMember from "features/Chat/components/InfoMember";
import Channel from "features/Chat/components/Channel";
import ArchiveMedia from "features/Chat/components/ArchiveMedia";
import ArchiveFile from "features/Chat/components/ArchiveFile";
import AnotherSetting from "features/Chat/components/AnotherSetting";
import InfoMediaSearch from "features/Chat/components/InfoMediaSearch";
import InfoFriendSearch from "features/Chat/components/InfoFriendSearch";
import userApi from "api/userApi";
import UserCard from "components/UserCard";
import { fetchAllMedia } from "features/Chat/slice/mediaSlice";

const InfoContainer = ({ socket, onViewChannel, onOpenInfoBlock }) => {
	const dispatch = useDispatch();

	const {
		memberInConversation,
		type,
		currentConversation,
		conversations,
		channels,
	} = useSelector((state) => state.chat);
	const { media } = useSelector((state) => state.media);

	const [isFind, setFind] = useState({ tapane: 0, view: 0 });
	const [userChose, setUserChose] = useState(null);
	const [isVisible, setIsVisible] = useState(false);

	const handleOnBack = (value) => {
		setFind({ view: value, tabpane: 0 });
	};

	const handleViewMemberClick = (value) => {
		setFind({ view: value, tabpane: 0 });
	};

	const handleViewMediaClick = (value, tabpane) => {
		setFind({ view: value, tabpane });
	};

	const handleChoseUser = async (value) => {
		const user = await userApi.fetchUser(value.username);
		setUserChose(user);
		setIsVisible(true);
	};

	useEffect(() => {
		if (currentConversation)
			dispatch(fetchAllMedia({ conversationId: currentConversation }));
	}, [currentConversation]);

	return (
		<div id='main-info'>
			{(() => {
				if (isFind.view === 0) {
					return (
						<>
							<div className='info_title-wrapper'>
								<InfoTitle
									onBack={handleOnBack}
									text={
										conversations?.find(
											(ele) =>
												ele._id === currentConversation
										).type
											? "Thông tin nhóm"
											: " Thông tin hội thoại"
									}
								/>
							</div>
							<Scrollbars
								autoHide={true}
								autoHideTimeout={1000}
								autoHideDuration={200}
								style={{
									width: "100%",
									height: "calc(100vh - 68px)",
								}}
							>
								<div className='body-info'>
									<div className='info_name-and-thumbnail-wrapper'>
										<InfoNameAndThumbnail
											conversation={conversations?.find(
												(ele) =>
													ele._id ===
													currentConversation
											)}
										/>
									</div>

									{type && (
										<>
											<div className='info_member-wrapper'>
												<InfoMember
													viewMemberClick={
														handleViewMemberClick
													}
													quantity={
														memberInConversation.length
													}
												/>
											</div>

											<div className='info_member-wrapper'>
												<Channel
													onViewChannel={
														onViewChannel
													}
													data={channels}
												/>
											</div>
										</>
									)}

									<div className='info_archive-media-wrapper'>
										<ArchiveMedia
											viewMediaClick={
												handleViewMediaClick
											}
											name='Ảnh'
											items={media.images}
										/>
									</div>

									<div className='info_archive-media-wrapper'>
										<ArchiveMedia
											viewMediaClick={
												handleViewMediaClick
											}
											name='Video'
											items={media.videos}
										/>
									</div>

									<div className='info_archive-file-wrapper'>
										<ArchiveFile
											viewMediaClick={
												handleViewMediaClick
											}
											items={media.files}
										/>
									</div>

									{conversations?.find(
										(ele) => ele._id === currentConversation
									).type && (
										<div className='info_another-setting-wrapper'>
											<AnotherSetting socket={socket} />
										</div>
									)}
								</div>
							</Scrollbars>
						</>
					);
				} else if (isFind.view === 2) {
					return (
						<InfoMediaSearch
							onBack={handleOnBack}
							tabpane={isFind.tabpane}
						/>
					);
				} else {
					return (
						<InfoFriendSearch
							onBack={handleOnBack}
							members={memberInConversation}
							onChoseUser={handleChoseUser}
						/>
					);
				}
			})()}

			{userChose && (
				<UserCard
					isVisible={isVisible}
					onCancel={() => setIsVisible(false)}
					user={userChose}
				/>
			)}
		</div>
	);
};

InfoContainer.propTypes = {
	socket: PropTypes.object,
	onViewChannel: PropTypes.func,
	onOpenInfoBlock: PropTypes.func,
};

InfoContainer.defaultProps = {
	socket: {},
	onViewChannel: null,
	onOpenInfoBlock: null,
};

export default InfoContainer;
