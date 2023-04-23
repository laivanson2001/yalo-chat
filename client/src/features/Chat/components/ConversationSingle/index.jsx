import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ConversationAvatar from "../ConversationAvatar";
import { useSelector } from "react-redux";
import classifyUtils from "utils/classifyUtils";
import { TagFilled } from "@ant-design/icons";
import ShortMessage from "../ShortMessage";

const ConversationSingle = ({ conversation, onClick }) => {
	const {
		_id,
		name,
		avatar,
		numberUnread,
		lastMessage,
		totalMembers,
		avatarColor,
	} = conversation;
	const { type, createdAt } = lastMessage;

	const { classifies, conversations } = useSelector((state) => state.chat);

	const [classify, setClassify] = useState(null);

	const handleClick = () => {
		if (onClick) onClick(_id);
	};

	useEffect(() => {
		if (classifies.length > 0) {
			const temp = classifyUtils.getClassifyOfObject(_id, classifies);
			if (temp) {
				setClassify(temp);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [conversation, conversations, classifies]);

	return (
		<div className='conversation-item_box' onClick={handleClick}>
			<div className='left-side-box'>
				<div className='icon-users'>
					<ConversationAvatar
						totalMembers={totalMembers}
						avatar={avatar}
						type={conversation.type}
						name={name}
						avatarColor={avatarColor}
					/>
				</div>
			</div>

			{lastMessage ? (
				<>
					<div className='middle-side-box'>
						<span className='name-box'>{name}</span>

						<div className='lastest-message'>
							{classify && (
								<span className='tag-classify'>
									<TagFilled
										style={{
											color: `${classify.color?.code}`,
										}}
									/>
								</span>
							)}

							<ShortMessage
								message={lastMessage}
								type={conversation.type}
							/>
						</div>
					</div>

					<div className='right-side-box'>
						<span className='lastest-time'>{createdAt}</span>

						<span className='message-count'>{numberUnread}</span>
					</div>
				</>
			) : (
				""
			)}
		</div>
	);
};

ConversationSingle.propTypes = {
	conversation: PropTypes.object,
	onClick: PropTypes.func,
};

export default ConversationSingle;
