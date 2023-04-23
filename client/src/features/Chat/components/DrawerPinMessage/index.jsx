import React from "react";
import PropTypes from "prop-types";
import { Drawer } from "antd";
import "./style.scss";
import DrawerPinMessageStyle from "./DrawerPinMessageStyle";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import NutshellPinMessage from "../NutshellPinMessage";

const DrawerPinMessage = ({ isOpen, onClose, message }) => {
	const handleOnCloseDrawer = () => {
		if (onClose) {
			onClose();
		}
	};

	const handlViewNews = () => {
		if (onClose) {
			onClose();
		}
	};
	return (
		<div id='drawer-pin'>
			<div id='drawer-container'>
				<Drawer
					onClose={handleOnCloseDrawer}
					open={isOpen}
					placement='top'
					closable={false}
					getContainer={false}
					style={{ position: "absolute", overflow: "hidden" }}
					bodyStyle={DrawerPinMessageStyle.WRAPPER_STYLE}
				>
					<div className='drawer-header'>
						<div className='drawer-header-title'>
							{`Danh sách ghim (${message.length})`}
						</div>

						<div
							className='drawer-header-collapse'
							onClick={handleOnCloseDrawer}
						>
							Thu gọn <CaretUpOutlined />
						</div>
					</div>

					<div className='drawer-body'>
						{message?.map((ele, index) => (
							<NutshellPinMessage
								key={index}
								message={ele}
								isItem={true}
							/>
						))}
					</div>

					<div className='drawer-footer' onClick={handlViewNews}>
						<CaretDownOutlined />
					</div>
				</Drawer>
			</div>
		</div>
	);
};

DrawerPinMessage.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	message: PropTypes.array,
};

DrawerPinMessage.defaultProps = {
	onOpen: null,
	onClose: null,
	message: [],
};

export default DrawerPinMessage;
