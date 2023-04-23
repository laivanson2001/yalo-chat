import React from "react";
import PropTypes from "prop-types";

const FeatureBox = ({ data }) => {
	return (
		<div className='box'>
			<img
				src='https://channel.mediacdn.vn/thumb_w/640/prupload/441/2016/08/img20160831162127458.jpg'
				alt=''
			/>
			<h3>Gõ @ để gửi bài hát Zing Mp3 hoặc ảnh GIF</h3>
			<p>
				Khi gõ ký tự @, ta sẽ thấy gợi ý sử dụng @GIF để tìm kiếm hình
				GIF hoặc @MP3 để gửi các bản nhạc từ Zing Mp3 thật nhanh chóng
				và thuận tiện phải không nào.
			</p>
		</div>
	);
};

FeatureBox.propTypes = { data: PropTypes.object };

export default FeatureBox;
