import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import userApi from "api/userApi";
import PersonalIcon from "features/Chat/components/PersonalIcon";
import { Button, Tag } from "antd";
import UserCard from "components/UserCard";

const ContactItem = ({ data }) => {
	const [userIsFind, setUserIsFind] = useState({});
	const [visibleUserCard, setVisbleUserCard] = useState(false);

	const handleViewDetail = async () => {
		const user = await userApi.fetchUser(data.username);
		console.log(user);
		setUserIsFind(user);
		setVisbleUserCard(true);
	};

	const handleCancelModalUserCard = () => {
		setVisbleUserCard(false);
	};

	return (
		<div className='contact-card'>
			<div className='contact-card_info-user' onClick={handleViewDetail}>
				<div className='contact-card_avatar'>
					<PersonalIcon
						avatar={data.avatar}
						demention={72}
						name={data.name}
					/>
				</div>
				<div className='contact-card_info'>
					<div className='contact-card_name'>{data.name}</div>

					<div className='contact-card_status'>
						{data.status === "NOT_FRIEND" ? (
							<Tag color='#f50'>Chưa kết bạn</Tag>
						) : data.status === "YOU_FOLLOW" ? (
							<Tag color='#2db7f5'>Đã gửi lời mời kết bạn</Tag>
						) : (
							<Tag color='#87d068'>Bạn bè</Tag>
						)}
					</div>
				</div>
			</div>

			<div className='contact-card_interact'>
				<div className='contact-card_button contact-card_button--detail'>
					<Button
						type='default'
						shape='round'
						onClick={handleViewDetail}
					>
						Xem chi tiết
					</Button>
				</div>
			</div>

			<UserCard
				user={userIsFind}
				isVisible={visibleUserCard}
				onCancel={handleCancelModalUserCard}
				// onAddFriend={handleOnAddFriend}
			/>
		</div>
	);
};

ContactItem.propTypes = { data: PropTypes.object };

ContactItem.defaultProps = {
	data: {},
};

export default ContactItem;
