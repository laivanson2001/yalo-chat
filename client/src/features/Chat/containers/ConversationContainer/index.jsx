import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Menu, Modal, message } from "antd";
import { DeleteFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import conversationApi from "api/conversationApi";
import SubMenuClassify from "components/SubMenuClassify";
import ConversationSingle from "features/Chat/components/ConversationSingle";
import {
	fetchChannels,
	fetchListMessages,
	getLastViewOfMembers,
	getMembersConversation,
	setCurrentChannel,
	setTypeOfConversation,
} from "features/Chat/slice/chatSlice";

const ConversationContainer = ({ valueClassify, onClickConver }) => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.global);
	const { conversations, classifies } = useSelector((state) => state.chat);

	const tempClassify =
		classifies?.find((ele) => ele._id === valueClassify) || 0;

	const checkConverInClassify = (idMember) => {
		if (tempClassify === 0) return true;
		const index = tempClassify.conversationIds.findIndex(
			(ele) => ele === idMember
		);
		return index > -1;
	};

	const converFilter = [...conversations].filter((ele) => {
		if (checkConverInClassify(ele._id)) return true;
	});

	const handleOnClickItem = (e, id) => {
		if (e.key === 1) {
			confirm(id);
		}
	};

	const confirm = (id) => {
		Modal.confirm({
			title: "Xác nhận",
			icon: <ExclamationCircleOutlined />,
			content: (
				<span>
					Toàn bộ nội dung cuộc trò chuyện sẻ bị xóa, bạn có chắc chắn
					muốn xóa ?
				</span>
			),
			okText: "Xóa",
			cancelText: "Không",
			onOk: () => {
				deleteConver(id);
			},
		});
	};

	const deleteConver = async (id) => {
		try {
			await conversationApi.deleteConversation(id);
			message.success("Xóa thành công");
		} catch (error) {
			message.error("Đã có lỗi xảy ra");
		}
	};

	const handleConversationClick = async (conversationId) => {
		// dispatch(setCurrentConversation(conversationId));

		dispatch(setCurrentChannel(""));
		dispatch(getLastViewOfMembers({ conversationId }));
		dispatch(fetchListMessages({ conversationId, size: 10 }));
		dispatch(getMembersConversation({ conversationId }));
		dispatch(setTypeOfConversation(conversationId));
		dispatch(fetchChannels({ conversationId }));
	};

	return (
		<>
			<div id='conversation-main'>
				<ul className='list_conversation'>
					{converFilter?.map((conversationEle, index) => {
						if (true) {
							const { numberUnread } = conversationEle;
							if (conversationEle.lastMessage) {
								return (
									<Dropdown
										key={index}
										overlay={
											<Menu
												onClick={(e) =>
													handleOnClickItem(
														e,
														conversationEle._id
													)
												}
											>
												<SubMenuClassify
													data={classifies}
													idConver={
														conversationEle._id
													}
												/>

												{user._id ===
													conversationEle.leaderId && (
													<Menu.Item
														danger
														key='1'
														icon={<DeleteFilled />}
													>
														Xoá hội thoại
													</Menu.Item>
												)}
											</Menu>
										}
										trigger={["contextMenu"]}
									>
										<li
											key={index}
											className={`conversation-item ${
												numberUnread === 0
													? ""
													: "arrived-message"
											} `}
										>
											<ConversationSingle
												conversation={conversationEle}
												onClick={
													handleConversationClick
												}
											/>
										</li>
									</Dropdown>
								);
							}
						}
					})}
				</ul>
			</div>
		</>
	);
};

ConversationContainer.propTypes = {
	valueClassify: PropTypes.string.isRequired,
};

ConversationContainer.defaultProps = {
	valueClassify: "",
};

export default ConversationContainer;
