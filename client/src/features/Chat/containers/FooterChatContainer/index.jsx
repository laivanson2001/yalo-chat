import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import NavigationChatBox from "features/Chat/components/NavigationChatBox";
import ReplyBlock from "features/Chat/components/ReplyBlock";
import TextEditor from "features/Chat/components/TextEditor";
import { useSelector } from "react-redux";
import { Mentions } from "antd";
import messageApi from "api/messageApi";
import MENTION_STYLE from "./MentionStyle";
import PersonalIcon from "features/Chat/components/PersonalIcon";
import { SendOutlined } from "@ant-design/icons";

const style_EditorText = {
	flexDirection: "column",
};

const style_addtion_interaction = {
	flex: 1,
	justifyContent: "flex-end",
	width: "100%",
};

const FooterChatContainer = ({
	onScrollWhenSentText,
	onOpenInfoBlock,
	socket,
	replyMessage,
	onCloseReply,
	userMention,
	onRemoveMention,
	onViewVotes,
}) => {
	const preMention = useRef();

	const { user } = useSelector((state) => state.global);
	const {
		currentConversation,
		conversations,
		currentChannel,
		memberInConversation,
	} = useSelector((state) => state.chat);

	const checkGroup = conversations?.find(
		(ele) => ele._id === currentConversation
	);
	const getTypeConversation = conversations?.find(
		(ele) => ele._id === currentConversation
	).type;

	const [isHightLight, setHightLight] = useState(false);
	const [showTextFormat, setShowTextFormat] = useState(false);
	const [valueText, setValueText] = useState("");
	const [isShowLike, setShowLike] = useState(true);
	const [detailConver, setDetailConver] = useState({});
	const [mentionSelect, setMentionSelect] = useState([]);
	const [mentionList, setMentionsList] = useState([]);

	const handleClickTextFormat = () => {
		setShowTextFormat(!showTextFormat);
		setValueText("");
	};

	const handleOnScroll = (id) => {
		if (onScrollWhenSentText) {
			onScrollWhenSentText(id);
		}
	};

	const handleOnFocus = (e) => {
		if (currentChannel) {
			socket.emit(
				"conversation-last-view",
				currentConversation,
				currentChannel
			);
		} else {
			socket.emit("conversation-last-view", currentConversation);
		}

		setHightLight(true);
	};

	const handleOnBlur = (e) => {
		setHightLight(false);
		socket.emit("not-typing", currentConversation, user);
	};

	const handleShowLike = (value) => {
		setShowLike(value);
	};

	const handleSetValueEditor = (content) => {
		setValueText(content);
	};

	const handleOnChageInput = (value) => {
		if (mentionSelect.length > 0) {
			mentionSelect.forEach((ele, index) => {
				const regex = new RegExp(`@${ele.name}`);
				if (regex.exec(value) === null) {
					const tempMensionList = [...mentionList];
					const checkExist = mentionList.every(
						(temp) => ele._id !== temp._id
					);
					if (checkExist) {
						tempMensionList.push(ele);
					}
					setMentionsList(tempMensionList);
					setMentionSelect(
						mentionSelect.filter((select) => select._id !== ele._id)
					);
					if (onRemoveMention) {
						onRemoveMention();
					}
					return false;
				}
			});
		}

		value.length > 0 ? setShowLike(false) : setShowLike(true);
		setValueText(value);

		if (value.length > 0 && !currentChannel) {
			socket.emit("typing", currentConversation, user);
		} else {
			socket.emit("not-typing", currentConversation, user);
		}
	};

	const handleKeyPress = (event) => {
		if (event.nativeEvent.keyCode === 13) {
			if (!event.shiftKey) {
				const valueInput = event.target.value;

				if (valueInput.trim().length > 0) {
					sendMessage(valueInput, "TEXT");
					setValueText("");
					socket.emit("not-typing", currentConversation, user);
				}

				event.preventDefault();
			}
		}
	};

	const sendMessage = async (value, type) => {
		const listId = mentionSelect?.map((ele) => ele._id);

		const newMessage = {
			content: value,
			type: type,
			conversationId: currentConversation,
			tags: listId,
		};
		if (replyMessage && Object.keys(replyMessage).length > 0) {
			newMessage.replyMessageId = replyMessage._id;
		}

		if (currentChannel) {
			newMessage.channelId = currentChannel;
		}

		await messageApi
			.sendTextMessage(newMessage)
			.then((res) => {
				const { _id } = res;
				handleOnScroll(_id);
				console.log("Send Message Success");
			})
			.catch((err) => console.log("Send Message Fail"));
		setMentionsList(memberInConversation);
		setMentionSelect([]);

		if (onCloseReply) {
			onCloseReply();
		}
		if (onRemoveMention) {
			onRemoveMention();
		}
	};

	const handleSelectMention = ({ object }, _) => {
		setMentionSelect([...mentionSelect, object]);
		setMentionsList(mentionList.filter((ele) => ele._id !== object._id));
	};

	const handleSentMessage = () => {
		if (valueText.trim()) {
			if (showTextFormat) {
				sendMessage(valueText, "HTML");
			} else {
				sendMessage(valueText, "TEXT");
			}
			setValueText("");
			socket.emit("not-typing", currentConversation, user);
		}
	};

	const checkIsExistInSelect = (userMen) => {
		if (mentionSelect.length > 0) {
			const index = mentionSelect.findIndex(
				(ele) => ele._id === userMen._id
			);
			return index >= 0;
		} else {
			return false;
		}
	};

	useEffect(() => {
		if (userMention && Object.keys(userMention).length > 0) {
			let tempMensionSelect = [...mentionSelect];
			let tempMensionList = [...mentionList];
			let tempValueText = valueText;

			if (preMention.current) {
				if (checkIsExistInSelect(preMention.current)) {
					const regex = new RegExp(`^@${preMention.current.name}`);
					const newText = valueText.replace(regex, "");
					tempValueText = newText;

					tempMensionSelect = mentionSelect.filter(
						(ele) => ele._id !== preMention.current._id
					);
					tempMensionList = [...mentionList, preMention.current];
				}
			}

			const checkExist = checkIsExistInSelect(userMention);

			if (!checkExist) {
				if (getTypeConversation) {
					tempValueText = `@${userMention.name} ${tempValueText}`;
				}
				setValueText(tempValueText);
				setMentionSelect([...tempMensionSelect, userMention]);
				tempMensionList = tempMensionList.filter(
					(ele) => ele._id !== userMention._id
				);
				setMentionsList(tempMensionList);
			}
			preMention.current = userMention;
		}
	}, [userMention]);

	useEffect(() => {
		if (memberInConversation.length > 0) {
			setMentionsList(memberInConversation);
		}
	}, [memberInConversation]);

	useEffect(() => {
		setValueText("");
		setMentionSelect([]);
	}, [currentConversation]);

	useEffect(() => {
		if (currentConversation) {
			const tempConver = conversations?.find(
				(conver) => conver._id === currentConversation
			);
			if (tempConver) {
				setDetailConver(tempConver);
			}
		}
	}, [currentConversation]);

	return (
		<div id='main-footer-chat'>
			<div className='navigation'>
				<NavigationChatBox
					isFocus={isHightLight}
					onClickTextFormat={handleClickTextFormat}
					onScroll={handleOnScroll}
					onViewVotes={onViewVotes}
					onOpenInfoBlock={onOpenInfoBlock}
				/>
			</div>

			{replyMessage && Object.keys(replyMessage).length > 0 && (
				<ReplyBlock
					replyMessage={replyMessage}
					onCloseReply={onCloseReply}
				/>
			)}

			<div
				className='chat-editor'
				style={showTextFormat ? style_EditorText : {}}
			>
				<div className='main-editor'>
					{showTextFormat ? (
						<TextEditor
							showFormat={showTextFormat}
							onFocus={handleOnFocus}
							onBlur={handleOnBlur}
							showLike={handleShowLike}
							valueHtml={valueText}
							onSetValue={handleSetValueEditor}
						/>
					) : (
						<Mentions
							autoSize={{ minRows: 1, maxRows: 5 }}
							placeholder={`Nhập @, tin nhắt tới ${detailConver.name}`}
							size='large'
							bordered='false'
							onChange={handleOnChageInput}
							onKeyPress={handleKeyPress}
							value={valueText}
							style={{
								whiteSpace: "pre-wrap",
								border: "none",
								outline: "none",
							}}
							spellCheck={false}
							onFocus={handleOnFocus}
							onBlur={handleOnBlur}
							onSelect={handleSelectMention}
							split=' '
							options={
								checkGroup &&
								mentionList
									?.filter((ele) => ele._id !== user._id)
									.map((ele) => ({
										value: ele.name,
										label: (
											<div
												className='mention-option_wrapper'
												style={
													MENTION_STYLE.MENTION_ITEM
												}
											>
												<div className='icon-user-item'>
													<PersonalIcon
														demention={24}
														avatar={ele.avatar}
														name={ele.name}
													/>
												</div>

												<div
													style={
														MENTION_STYLE.NAME_ITEM
													}
													className='name-user-item'
												>
													{ele.name}
												</div>
											</div>
										),
										object: ele,
									}))
							}
						/>
					)}
				</div>

				<div
					className='addtion-interaction'
					style={
						showTextFormat ? style_addtion_interaction : undefined
					}
				>
					<div className='like-emoji'>
						<div
							className='send-text-thumb'
							onClick={handleSentMessage}
						>
							<SendOutlined />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

FooterChatContainer.propTypes = {
	onScrollWhenSentText: PropTypes.func,
	socket: PropTypes.object,
	replyMessage: PropTypes.object,
	onCloseReply: PropTypes.func,
	userMention: PropTypes.object,
	onRemoveMention: PropTypes.func,
	onViewVotes: PropTypes.func,
	onOpenInfoBlock: PropTypes.func,
};

FooterChatContainer.defaultProps = {
	onScrollWhenSentText: null,
	socket: null,
	replyMessage: {},
	onCloseReply: null,
	userMention: {},
	onRemoveMention: null,
	onViewVotes: null,
	onOpenInfoBlock: null,
};

export default FooterChatContainer;
