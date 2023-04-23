import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import InfoTitle from "../InfoTitle";
import Scrollbars from "react-custom-scrollbars";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import { BarChartOutlined, NumberOutlined } from "@ant-design/icons";
import TabPaneVote from "../TabPaneVote";
import ListChannel from "../ListChannel";

const { TabPane } = Tabs;

const GroupNews = ({ onBack, tabActive, onChange }) => {
	const { channels } = useSelector((state) => state.chat);

	const handleChangeActiveKey = (key) => {
		if (onChange) {
			onChange(key);
		}
	};

	return (
		<div className='group-news_wrapper'>
			<div className='group-news_header'>
				<InfoTitle
					isBack={true}
					text='Bảng tin nhóm'
					onBack={onBack}
					type='broadcast'
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
				<div className='group-news_body'>
					<div className='group-news_tabpane'>
						<Tabs
							activeKey={tabActive.toString()}
							onChange={handleChangeActiveKey}
						>
							<TabPane
								tab={
									<span>
										<BarChartOutlined />
										Bình chọn
									</span>
								}
								key='1'
							>
								<TabPaneVote />
							</TabPane>

							<TabPane
								tab={
									<span>
										<NumberOutlined />
										Kênh
									</span>
								}
								key='2'
							>
								<ListChannel data={channels} />
							</TabPane>
						</Tabs>
					</div>
				</div>
			</Scrollbars>
		</div>
	);
};

GroupNews.propTypes = { onBack: PropTypes.func, tabActive: PropTypes.number };

GroupNews.defaultProps = {
	onBack: null,
	tabActive: 0,
};

export default GroupNews;
