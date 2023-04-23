import React, { useState } from "react";
import PropTypes from "prop-types";
import { Divider, Menu } from "antd";
import { useDispatch } from "react-redux";
import ClassifyApi from "api/ClassifyApi";
import { fetchListClassify } from "features/Chat/slice/chatSlice";
import { TagFilled } from "@ant-design/icons";
import ModalClassify from "features/Chat/components/ModalClassify";

const { SubMenu } = Menu;

const SubMenuClassify = ({ data, idConver }) => {
	const dispatch = useDispatch();

	const [visible, setVisible] = useState(false);

	const handleClickClassify = async (id) => {
		await ClassifyApi.addClassifyForConversation(id, idConver);
		dispatch(fetchListClassify());
	};
	return (
		<SubMenu
			title={<span className='menu-item--highlight'>Phân loại</span>}
			key='sub-1'
		>
			{data.length > 0 &&
				data?.map((ele) => (
					<Menu.Item
						key={ele._id}
						icon={
							<TagFilled style={{ color: `${ele.color.code}` }} />
						}
						onClick={() => handleClickClassify(ele._id)}
					>
						{ele.name}
					</Menu.Item>
				))}

			<Divider style={{ margin: "1rem 2rem" }} />
			<Menu.Item
				key='0'
				icon={<TagFilled />}
				onClick={() => setVisible(true)}
			>
				<span className='menu-item--highlight'>
					Quản lý thẻ phân loại
				</span>
			</Menu.Item>

			<ModalClassify
				isVisible={visible}
				onCancel={() => setVisible(false)}
				onOpen={() => setVisible(true)}
			/>
		</SubMenu>
	);
};

SubMenuClassify.propTypes = {
	data: PropTypes.array,
	idConver: PropTypes.string.isRequired,
};

SubMenuClassify.defaultProps = {
	data: [],
};

export default SubMenuClassify;
