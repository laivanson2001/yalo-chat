import { Spin } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistryPage from "./pages/RegistryPage";
import ForgotPage from "./pages/ForgotPage";
import NotFoundPage from "components/NotFoundPage";
import "./style.scss";

const Account = () => {
	return (
		<Spin spinning={false}>
			<div id='account_page'>
				<Routes>
					<Route path='login' element={<LoginPage />} />
					<Route path='registry' element={<RegistryPage />} />
					<Route path='forgot' element={<ForgotPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</div>
		</Spin>
	);
};

export default Account;
