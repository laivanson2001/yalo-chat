import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import PersonalIcon from "features/Chat/components/PersonalIcon";

const SuggestCard = ({ data, onClick }) => {
	const handleOnClick = () => {
		if (onClick) {
			onClick(data);
		}
	};

	return (
		<div className='suggest_card' onClick={handleOnClick}>
			<div className='suggest_card-img'>
				<PersonalIcon
					avatar={data.avatar}
					name={data.name}
					demention={90}
					color={data.avatarColor}
				/>
			</div>
			<div className='suggest_card-info'>
				<strong className='suggest_card-info--name'>{data.name}</strong>
				<span className='suggest_card-info--common'>
					{`${data.numberCommonGroup} nhóm chung`}
				</span>
				<span className='suggest_card-info--common'>
					{`${data.numberCommonFriend} bạn chung`}
				</span>
			</div>
		</div>
	);
};

SuggestCard.propTypes = { data: PropTypes.object, onClick: PropTypes.func };

SuggestCard.defaultProps = {
	data: {},
	onClick: null,
};

export default SuggestCard;
