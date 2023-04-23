import React from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";

const { Footer } = Layout;

AdminFooter.propTypes = {};

function AdminFooter(props) {
	return (
		<Footer style={{ textAlign: "center", background: "#fff" }}>
			Ant Design ©2023 Created by Atomic
		</Footer>
	);
}

export default AdminFooter;
