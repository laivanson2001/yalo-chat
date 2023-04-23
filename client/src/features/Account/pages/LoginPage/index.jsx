import React, { useEffect, useState } from "react";
import IMAGE_ACCOUNT_PAGE from "assets/images/account/account-bg.png";
import { Button, Col, Divider, Row, Tag, Typography, message } from "antd";
import { FastField, Form, Formik } from "formik";
import { loginValues } from "features/Account/initValues";
import InputField from "customfield/InputField";
import ReCAPTCHA from "react-google-recaptcha";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "features/Account/accountSlice";
import loginApi from "api/loginApi";
import { fetchUserProfile, setLogin } from "app/globalSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import axiosClient from "api/axiosClient";

const { Text, Title } = Typography;

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [keyGoogleCaptcha, setKeyGoogleCaptcha] = useState(null);
	const [isError, setError] = useState(false);
	const [isVerify, setVerify] = useState(false);

	const handleSubmit = async (values) => {
		const { username, password } = values;
		try {
			if (true) {
				dispatch(setLoading(true));
				const { token, refreshToken } = await loginApi.login(
					username,
					password
				);
				localStorage.setItem("token", token);
				localStorage.setItem("refreshToken", refreshToken);
				dispatch(setLogin(true));
				const { isAdmin } = unwrapResult(
					await dispatch(fetchUserProfile())
				);
				if (isAdmin) navigate("/admin");
				else navigate("/chat");
			} else {
				message.error("Hãy xác thực capcha", 5);
			}
		} catch (error) {
			setError(true);
			console.log(error);
		}
		dispatch(setLoading(false));
	};

	const onChange = () => {
		setVerify(true);
	};

	useEffect(() => {
		axiosClient
			.get("/common/google-captcha")
			.then((res) => setKeyGoogleCaptcha(res.KEY_GOOGLE_CAPTCHA));
	}, []);

	return (
		<div className='account-common-page'>
			<div className='account-wrapper'>
				<div className='account_left'>
					<img src={IMAGE_ACCOUNT_PAGE} alt='yalo_login' />
				</div>

				<div className='account_right'>
					<Title level={2} style={{ textAlign: "center" }}>
						<Text style={{ fontSize: "32px", color: "#4d93ff" }}>
							Đăng Nhập
						</Text>
					</Title>
					<Divider />
					<div className='form-account'>
						<Formik
							initialValues={{ ...loginValues.initial }}
							onSubmit={(values) => handleSubmit(values)}
							validationSchema={loginValues.validationSchema}
							enableReinitialize={true}
						>
							{(formikProps) => {
								return (
									<Form>
										<Row gutter={[0, 8]}>
											<Col span={24}>
												<FastField
													name='username'
													component={InputField}
													type='text'
													title='Tài khoản'
													placeholder='Nhập tài khoản'
													maxLength={50}
													titleCol={24}
													inputCol={24}
												/>
											</Col>

											<Col span={24}>
												<FastField
													name='password'
													component={InputField}
													type='password'
													title='Mật khẩu'
													placeholder='Nhập mật khẩu'
													maxLength={200}
													titleCol={24}
													inputCol={24}
												/>
											</Col>
											<Col span={24}>
												<br />
												{keyGoogleCaptcha && (
													<ReCAPTCHA
														sitekey={
															keyGoogleCaptcha
														}
														onChange={onChange}
													/>
												)}
											</Col>
											{isError ? (
												<Col span={24}>
													<Tag
														color='error'
														style={{
															fontWeight: "bold",
														}}
														icon={
															<CloseCircleOutlined />
														}
													>
														Tài khoản không hợp lệ
													</Tag>
												</Col>
											) : (
												""
											)}

											<Col span={24}>
												<br />
												<Button
													type='primary'
													htmlType='submit'
													block
												>
													Đăng nhập
												</Button>
											</Col>
										</Row>
									</Form>
								);
							}}
						</Formik>
					</div>
					<Divider />
					<div className='addtional-link'>
						<Link to='/'>Trang chủ</Link>
						<Link to='/account/forgot'>Quên mật khẩu</Link>
						<Link to='/account/registry'>
							Bạn chưa có tài khoản ?
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
