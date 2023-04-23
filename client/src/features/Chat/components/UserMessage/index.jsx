import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import NotifyMessage from "../MessageType/NotifyMessage";
import LastView from "../LastView";
import VoteMessage from "../MessageType/VoteMessage";
import { useDispatch, useSelector } from "react-redux";
import PersonalIcon from "../PersonalIcon";
import HTMLMessage from "../MessageType/HTMLMessage";
import ListReaction from "../ListReaction";
import messageApi from "api/messageApi";
import TextMessage from "../MessageType/TextMessage";
import ImageMessage from "../MessageType/ImageMessage";
import VideoMessage from "../MessageType/VideoMessage";
import FileMessage from "../MessageType/FileMessage";
import StickerMessage from "../MessageType/StickerMessage";
import ListReactionOfUser from "../ListReactionOfUser";
import { Button, Dropdown, Menu, message as mesageNotify } from "antd";
import MESSAGE_STYLE from "constants/MessageStyle/messageStyle";
import { MdQuestionAnswer } from "react-icons/md";
import { FaReplyAll } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import pinMessageApi from "api/pinMessageApi";
import {
	deleteMessageClient,
	fetchPinMessages,
} from "features/Chat/slice/chatSlice";
import {
	DeleteOutlined,
	PushpinOutlined,
	UndoOutlined,
} from "@ant-design/icons";
import ModalChangePinMessage from "components/ModalChangePinMessage";
import { checkLeader } from "utils/groupUtils";

const UserMessage = ({
	message,
	isMyMessage,
	isSameUser,
	viewUsers,
	onOpenModalShare,
	onReply,
	onMention,
}) => {
	const {
		_id,
		content,
		user,
		createdAt,
		type,
		isDeleted,
		reacts,
		tagUsers,
		replyMessage,
	} = message;
	const { name, avatar, avatarColor } = user;

	const dispatch = useDispatch();

	const global = useSelector((state) => state.global);
	const {
		messages,
		currentConversation,
		conversations,
		pinMessages,
		currentChannel,
	} = useSelector((state) => state.chat);

	const listReaction = ["👍", "❤️", "😆", "😮", "😭", "😡"];

	const myReact =
		reacts &&
		reacts.length > 0 &&
		reacts?.find((ele) => ele.user._id === global.user._id);

	const dateAt = new Date(createdAt);

	const isGroup = conversations?.find(
		(ele) => ele._id === currentConversation
	).type;

	const [isLeader, setIsLeader] = useState(false);
	const [listReactionCurrent, setListReactionCurrent] = useState([]);
	const [isVisbleModal, setVisibleModal] = useState(false);

	const setMarginTopAndBottom = (id) => {
		const index = messages.findIndex((message) => message._id === id);
		if (index === 0) {
			return "top";
		}
		if (index === messages.length - 1) {
			return "bottom";
		}
		return "";
	};

	const handleClickLike = () => {
		sendReaction(1);
	};

	const sendReaction = async (type) => {
		await messageApi.dropReaction(_id, type);
	};

	const handleClickReaction = (value) => {
		const type = listReaction.findIndex((element) => element === value) + 1;
		sendReaction(type);
	};

	const transferIcon = (type) => {
		return listReaction[parseInt(type) - 1];
	};

	const handleReplyMessage = () => {
		if (onReply) {
			onReply(message);
		}
		if (onMention) {
			onMention(user);
		}
	};

	const handleOpenModalShare = () => {
		if (onOpenModalShare) {
			onOpenModalShare(_id);
		}
	};

	const handleOnClick = async ({ item, key }) => {
		if (key === "1") {
			if (pinMessages.length === 3) {
				setVisibleModal(true);
			} else {
				try {
					await pinMessageApi.pinMessage(message._id);
					dispatch(
						fetchPinMessages({
							conversationId: currentConversation,
						})
					);
					mesageNotify.success("Ghim tin nhắn thành công");
				} catch (error) {
					mesageNotify.error("Ghim tin nhắn thất bại");
				}
			}
		}
		if (key === "2") {
			await messageApi.redoMessage(_id);
		}

		if (key === "3") {
			await messageApi.deleteMessageClientSide(_id);
			dispatch(deleteMessageClient(_id));
		}
	};

	const menu = (
		<Menu onClick={handleOnClick}>
			{isGroup && !currentChannel && type !== "STICKER" && (
				<Menu.Item
					key='1'
					icon={<PushpinOutlined />}
					style={MESSAGE_STYLE.dropDownStyle}
					title='Ghim tin nhắn'
				>
					Ghim tin nhắn
				</Menu.Item>
			)}

			{isMyMessage && (
				<Menu.Item
					key='2'
					icon={<UndoOutlined />}
					style={MESSAGE_STYLE.dropDownStyle}
					title='Thu hồi tin nhắn'
				>
					Thu hồi tin nhắn
				</Menu.Item>
			)}
			<Menu.Item
				key='3'
				icon={<DeleteOutlined />}
				style={MESSAGE_STYLE.dropDownStyle}
				danger
				title='Chỉ xóa ở phía tôi'
			>
				Chỉ xóa ở phía tôi
			</Menu.Item>
		</Menu>
	);

	const handleOnCloseModal = () => {
		setVisibleModal(false);
	};

	useEffect(() => {
		setIsLeader(checkLeader(user._id, conversations, currentConversation));
	}, [messages]);

	useEffect(() => {
		let temp = [];
		if (reacts && reacts.length > 0) {
			reacts.forEach((ele) => {
				if (!temp.includes(ele.type)) {
					temp.push(ele.type);
				}
			});
		}
		setListReactionCurrent(temp);
	}, [message]);

	return (
		<>
			{!isDeleted && type === "NOTIFY" ? (
				<>
					<NotifyMessage message={message} />
					<div className='last-view-avatar center'>
						{viewUsers && viewUsers.length > 0 && (
							<LastView lastView={viewUsers} />
						)}
					</div>
				</>
			) : (
				<>
					{type === "VOTE" && <VoteMessage data={message} />}

					<div
						className={`${setMarginTopAndBottom(
							_id
						)} user-message ${type === "VOTE" ? "hidden" : ""}`}
					>
						<div
							className={`interact-conversation ${
								isMyMessage ? "reverse" : ""
							}  `}
						>
							<div
								className={`avatar-user ${
									isSameUser ? "hidden" : ""
								}`}
							>
								<PersonalIcon
									isHost={isLeader}
									demention={40}
									avatar={avatar}
									name={user.name}
									color={avatarColor}
								/>
							</div>
							<div className='list-conversation'>
								<div className='message' id={`${_id}`}>
									<div
										className={`sub-message ${
											isMyMessage ? "reverse" : ""
										} ${isSameUser ? "same-user" : ""}`}
									>
										<div
											className={`content-message ${
												type === "IMAGE" ||
												type === "VIDEO" ||
												type === "STICKER"
													? "content-media"
													: ""
											} 
                                        ${
											isMyMessage &&
											type !== "IMAGE" &&
											type !== "VIDEO" &&
											type !== "STICKER"
												? "my-message-bg"
												: ""
										}`}
										>
											<span className='author-message'>
												{isSameUser && isMyMessage
													? ""
													: isSameUser && !isMyMessage
													? ""
													: !isSameUser && isMyMessage
													? ""
													: name}
											</span>
											<div className='content-message-description'>
												{isDeleted ? (
													<span className='undo-message'>
														Tin nhắn đã được thu hồi
													</span>
												) : (
													<>
														{type === "HTML" ? (
															<HTMLMessage
																content={
																	content
																}
																dateAt={dateAt}
																isSeen={
																	viewUsers &&
																	viewUsers.length >
																		0
																}
															>
																{!myReact && (
																	<ListReaction
																		isMyMessage={
																			isMyMessage
																		}
																		onClickLike={
																			handleClickLike
																		}
																		listReaction={
																			listReaction
																		}
																		onClickReaction={
																			handleClickReaction
																		}
																	/>
																)}
															</HTMLMessage>
														) : type === "TEXT" ? (
															<TextMessage
																tags={tagUsers}
																content={
																	content
																}
																dateAt={dateAt}
																isSeen={
																	viewUsers &&
																	viewUsers.length >
																		0
																}
																replyMessage={
																	replyMessage
																}
															>
																{!myReact && (
																	<ListReaction
																		isMyMessage={
																			isMyMessage
																		}
																		onClickLike={
																			handleClickLike
																		}
																		listReaction={
																			listReaction
																		}
																		onClickReaction={
																			handleClickReaction
																		}
																	/>
																)}
															</TextMessage>
														) : type === "IMAGE" ? (
															<ImageMessage
																content={
																	content
																}
																dateAt={dateAt}
																isSeen={
																	viewUsers &&
																	viewUsers.length >
																		0
																}
															>
																{type ===
																	"IMAGE" &&
																	!myReact && (
																		<ListReaction
																			type='media'
																			isMyMessage={
																				isMyMessage
																			}
																			onClickLike={
																				handleClickLike
																			}
																			listReaction={
																				listReaction
																			}
																			onClickReaction={
																				handleClickReaction
																			}
																		/>
																	)}
															</ImageMessage>
														) : type === "VIDEO" ? (
															<VideoMessage
																content={
																	content
																}
																dateAt={dateAt}
																isSeen={
																	viewUsers &&
																	viewUsers.length >
																		0
																}
															>
																{!myReact && (
																	<ListReaction
																		type='media'
																		isMyMessage={
																			isMyMessage
																		}
																		onClickLike={
																			handleClickLike
																		}
																		listReaction={
																			listReaction
																		}
																		onClickReaction={
																			handleClickReaction
																		}
																	/>
																)}
															</VideoMessage>
														) : type === "FILE" ? (
															<FileMessage
																content={
																	content
																}
																dateAt={dateAt}
																isSeen={
																	viewUsers &&
																	viewUsers.length >
																		0
																}
															>
																{!myReact && (
																	<ListReaction
																		type='media'
																		isMyMessage={
																			isMyMessage
																		}
																		onClickLike={
																			handleClickLike
																		}
																		listReaction={
																			listReaction
																		}
																		onClickReaction={
																			handleClickReaction
																		}
																	/>
																)}
															</FileMessage>
														) : type ===
														  "STICKER" ? (
															<StickerMessage
																content={
																	content
																}
																dateAt={dateAt}
																isSeen={
																	viewUsers &&
																	viewUsers.length >
																		0
																}
															/>
														) : (
															""
														)}
													</>
												)}
											</div>

											<div
												className={`reacted-block ${
													type === "IMAGE" ||
													type === "VIDEO"
														? "media"
														: ""
												} 
                                            ${isMyMessage ? "left" : "right"} `}
											>
												{listReactionCurrent.length >
													0 &&
													!isDeleted && (
														<ListReactionOfUser
															listReactionCurrent={
																listReactionCurrent
															}
															reacts={reacts}
															isMyMessage={
																isMyMessage
															}
															onTransferIcon={
																transferIcon
															}
														/>
													)}

												{myReact && !isDeleted && (
													<div
														className={`your-react ${
															isMyMessage
																? "bg-white"
																: ""
														}`}
													>
														<span className='react-current'>
															{myReact
																? transferIcon(
																		myReact.type
																  )
																: ""}
														</span>

														<ListReaction
															isMyMessage={
																isMyMessage
															}
															onClickLike={
																handleClickLike
															}
															listReaction={
																listReaction
															}
															onClickReaction={
																handleClickReaction
															}
															isLikeButton={false}
														/>
													</div>
												)}
											</div>
										</div>

										<div
											className={`interaction ${
												isDeleted ? "hidden" : ""
											}`}
										>
											<div className='reply icon-interact'>
												<Button
													style={
														MESSAGE_STYLE.styleButton
													}
													onClick={handleReplyMessage}
												>
													<MdQuestionAnswer />
												</Button>
											</div>

											<div className='forward icon-interact'>
												<Button
													style={
														MESSAGE_STYLE.styleButton
													}
													onClick={
														handleOpenModalShare
													}
												>
													<FaReplyAll />
												</Button>
											</div>

											<div className='additional icon-interact'>
												<Dropdown
													overlay={menu}
													trigger={["click"]}
												>
													<Button
														style={
															MESSAGE_STYLE.styleButton
														}
													>
														<BiDotsHorizontalRounded />
													</Button>
												</Dropdown>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* <LastView */}
						</div>

						<div
							className={`last-view-avatar  ${
								isMyMessage ? "reverse" : ""
							} `}
						>
							{viewUsers && viewUsers.length > 0 && (
								<LastView lastView={viewUsers} />
							)}
						</div>
					</div>
				</>
			)}

			<ModalChangePinMessage
				message={pinMessages}
				visible={isVisbleModal}
				idMessage={_id}
				onCloseModal={handleOnCloseModal}
			/>
		</>
	);
};

UserMessage.propTypes = {
	message: PropTypes.object,
	isMyMessage: PropTypes.bool,
	isSameUser: PropTypes.bool,
	viewUsers: PropTypes.array,
	onOpenModalShare: PropTypes.func,
	onReply: PropTypes.func,
	onMention: PropTypes.func,
};

UserMessage.defaultProps = {
	message: {},
	isMyMessage: false,
	isSameUser: false,
	viewUsers: [],
	onOpenModalShare: null,
	onReply: null,
	onMention: null,
};

export default UserMessage;
