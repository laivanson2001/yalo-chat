import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import PersonalIcon from "../PersonalIcon";
import { Avatar, Tooltip } from "antd";
import { CloseCircleFilled, UsergroupAddOutlined } from "@ant-design/icons";

const ItemsSelected = ({ items, onRemove }) => {
	const handleRemoveSelect = (id) => {
		if (onRemove) {
			onRemove(id);
		}
	};

	return (
		<>
			{items &&
				items.length > 0 &&
				items?.map((item, index) => (
					<div key={index} className='item-selected_wrapper'>
						<div className='item-selected--text'>
							<div className='item-selected-avatar'>
								{!item.type && (
									<PersonalIcon
										demention={20}
										avatar={item.avatar}
										name={item.name}
										color={item.avatarColor}
									/>
								)}

								{item.type &&
									typeof item.avatar === "string" && (
										<PersonalIcon
											demention={20}
											avatar={item.avatar}
											name={item.name}
											color={item.avatarColor}
										/>
									)}

								{item.type &&
									typeof item.avatar === "object" && (
										<Tooltip>
											<Avatar
												style={{
													backgroundColor: "#f56a00",
												}}
												icon={<UsergroupAddOutlined />}
												size={20}
											/>
										</Tooltip>
									)}
							</div>

							<div className='item-selected-name'>
								<span>{item.name}</span>
							</div>
						</div>

						<div
							className='item-selected-remove'
							onClick={() => handleRemoveSelect(item._id)}
						>
							<CloseCircleFilled />
						</div>
					</div>
				))}
		</>
	);
};

ItemsSelected.propTypes = { items: PropTypes.array };

ItemsSelected.defaultProps = {
	items: [],
};

export default ItemsSelected;
