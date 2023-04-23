import React from "react";
import "./style.scss";
import { Result } from "antd";

const NotFoundPage = () => {
	return (
		<div id='not-found-page'>
			<div className='main'>
				<Result
					status='404'
					title='404'
					subTitle='Trang không khả dụng'
				/>
			</div>
		</div>
	);
};

export default NotFoundPage;
