import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
	createGroup,
	fetchListMessages,
	getLastViewOfMembers,
	setCurrentChannel,
	setCurrentConversation,
} from "features/Chat/slice/chatSlice";
import {
	LeftOutlined,
	NumberOutlined,
	RollbackOutlined,
	SplitCellsOutlined,
	UserOutlined,
	UsergroupAddOutlined,
} from "@ant-design/icons";
import ConversationAvatar from "../ConversationAvatar";
import useWindowDimensions from "hooks/useWindowDimensions";
import dateUtils from "utils/dateUtils";
import ModalAddMemberToConver from "../ModalAddMemberToConver";
import conversationApi from "api/conversationApi";

const HeaderOptional = ({
	avatar,
	totalMembers,
	name,
	typeConver,
	isLogin,
	lastLogin,
	avatarColor,
	onPopUpInfo,
	onOpenDrawer,
}) => {
	const dispatch = useDispatch();
	const { width } = useWindowDimensions();

	const { currentConversation, currentChannel, channels } = useSelector(
		(state) => state.chat
	);

	const [isVisible, setIsvisible] = useState(false);
	const [typeModal, setTypeModal] = useState(1);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const handleBackToListConver = () => {
		dispatch(setCurrentConversation(""));
	};

	const handleCutText = (text) => {
		if (width < 577) {
			return text.slice(0, 14) + "...";
		}
		return text;
	};

	const checkTime = () => {
		if (lastLogin) {
			const time = dateUtils.toTime(lastLogin);
			if (
				lastLogin.indexOf("ngày") ||
				lastLogin.indexOf("giờ") ||
				lastLogin.indexOf("phút")
			) {
				return true;
			}
			return false;
		}
	};

	const handleViewGeneralChannel = () => {
		dispatch(setCurrentChannel(""));
		dispatch(
			fetchListMessages({ conversationId: currentConversation, size: 10 })
		);
		dispatch(getLastViewOfMembers({ conversationId: currentConversation }));
	};

	const handleAddMemberToGroup = () => {
		setIsvisible(true);
		if (typeConver) {
			setTypeModal(2);
		} else {
			setTypeModal(1);
		}
	};

	const handlePopUpInfo = () => {
		if (onPopUpInfo) {
			onPopUpInfo();
		}
	};

	const handleOpenDraweer = () => {
		if (onOpenDrawer) {
			onOpenDrawer();
		}
	};

	const hanleOnCancel = (value) => {
		setIsvisible(value);
	};

	const handleOk = async (userIds, name) => {
		if (typeModal === 1) {
			setConfirmLoading(true);
			dispatch(
				createGroup({
					name,
					userIds,
				})
			);
			setConfirmLoading(false);
		} else {
			// socket (đối với user đc add): io.emit('added-group', conversationId).
			setConfirmLoading(true);
			await conversationApi.addMembersToConver(
				userIds,
				currentConversation
			);
			setConfirmLoading(false);
		}

		setIsvisible(false);
	};

	return (
		<div id='header-optional'>
			<div className='header_wrapper'>
				<div className='header_leftside'>
					<div
						className='icon-header back-list'
						onClick={handleBackToListConver}
					>
						<LeftOutlined />
					</div>
					<div className='icon_user'>
						{
							<ConversationAvatar
								avatar={avatar}
								totalMembers={totalMembers}
								type={typeConver}
								name={name}
								isActived={isLogin}
								avatarColor={avatarColor}
							/>
						}
					</div>

					<div className='info_user'>
						<div className='info_user-name'>
							<span>{handleCutText(name)}</span>
						</div>

						{currentChannel ? (
							<div className='channel_info'>
								<div className='channel-icon'>
									<NumberOutlined />
								</div>

								<div className='channel-name'>
									{
										channels?.find(
											(ele) => ele._id === currentChannel
										).name
									}
								</div>
							</div>
						) : (
							<div className='lastime-access'>
								{typeConver ? (
									<div className='member-hover'>
										<UserOutlined />
										&nbsp;{totalMembers}
										<span>&nbsp;Thành viên</span>
									</div>
								) : (
									<>
										{isLogin ? (
											<span>Đang hoạt động</span>
										) : (
											<>
												{lastLogin && (
													<span>
														{`Truy cập ${dateUtils
															.toTime(lastLogin)
															.toLowerCase()}`}{" "}
														{`${
															checkTime()
																? "trước"
																: ""
														}`}
													</span>
												)}
											</>
										)}
									</>
								)}
							</div>
						)}
					</div>
				</div>

				<div className='header_rightside'>
					{currentChannel ? (
						<div
							title='Trở lại kênh chính'
							className='icon-header back-channel'
							onClick={handleViewGeneralChannel}
						>
							<RollbackOutlined />
						</div>
					) : (
						<>
							<div
								className='icon-header create-group'
								onClick={handleAddMemberToGroup}
							>
								<UsergroupAddOutlined />
							</div>
						</>
					)}

					<div className='icon-header pop-up-layout'>
						<SplitCellsOutlined onClick={handlePopUpInfo} />
					</div>

					<div className='icon-header pop-up-responsive'>
						<SplitCellsOutlined onClick={handleOpenDraweer} />
					</div>
				</div>
			</div>

			<ModalAddMemberToConver
				isVisible={isVisible}
				onCancel={hanleOnCancel}
				onOk={handleOk}
				loading={confirmLoading}
				typeModal={typeModal}
			/>
		</div>
	);
};

HeaderOptional.propTypes = {
	avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	totalMembers: PropTypes.number,
	name: PropTypes.string,
	typeConver: PropTypes.bool.isRequired,
	isLogin: PropTypes.bool,
	lastLogin: PropTypes.object,
	avatarColor: PropTypes.string,
	onPopUpInfo: PropTypes.func,
	onOpenDrawer: PropTypes.func,
};

HeaderOptional.defaultProps = {
	totalMembers: 0,
	name: "",
	isLogin: false,
	lastLogin: null,
	avatarColor: "",
	onPopUpInfo: null,
	onOpenDrawer: null,
};

export default HeaderOptional;
