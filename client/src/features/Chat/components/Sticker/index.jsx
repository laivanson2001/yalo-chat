import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Tabs } from "antd";
import { GiftOutlined } from "@ant-design/icons";
import ListSticker from "../ListSticker";

const { TabPane } = Tabs;

const Sticker = ({ data, onClose, onScroll }) => {
	const handleOnClose = () => {
		if (onClose) {
			onClose();
		}
	};

	const handleOnChange = () => {};

	return (
		<div id='sticker'>
			<Tabs defaultActiveKey='1' onChange={handleOnChange}>
				<TabPane
					tab={
						<span className='menu-item'>
							<GiftOutlined /> STICKER
						</span>
					}
					key='1'
				>
					<ListSticker
						data={data}
						onClose={handleOnClose}
						onScroll={onScroll}
					/>
				</TabPane>
			</Tabs>
		</div>
	);
};

Sticker.propTypes = {
	data: PropTypes.array,
	onClose: PropTypes.func,
	onScroll: PropTypes.func,
};

Sticker.defaultProps = {
	data: [],
	onClose: null,
	onScroll: null,
};

export default Sticker;
