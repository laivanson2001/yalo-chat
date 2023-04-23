import React from "react";
import PropTypes from "prop-types";
import { GithubOutlined, MailTwoTone } from "@ant-design/icons";

const DevInfoBox = ({ data }) => {
	return (
		<div className='box'>
			<img
				src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
				alt=''
			/>
			<h3>Lại Văn Sơn</h3>
			<div className='contact-info'>
				<span>
					<MailTwoTone />
					&nbsp;Email: laivanson.dev@gmail.com
				</span>
				<span>
					<GithubOutlined />
					&nbsp;Github:{" "}
					<a href='https://github.com/laivanson-dev'>
						https://github.com/laivanson-dev
					</a>
				</span>
			</div>
		</div>
	);
};

DevInfoBox.propTypes = { data: PropTypes.object };

export default DevInfoBox;
