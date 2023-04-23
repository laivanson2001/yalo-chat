import React from "react";
import "./style.scss";
import { Spin } from "antd";
import Header from "./Components/Header";
import Feature from "./Components/Feature";
import AboutWebApp from "./Components/AboutWebApp";
import Developer from "./Components/Developer";
import Footer from "./Components/Footer";

const Home = () => {
	return (
		<Spin size='large' spinning={false}>
			<div className='home_page'>
				<Header />
				<Feature />
				<AboutWebApp />
				<Developer />
				<Footer />
			</div>
		</Spin>
	);
};

export default Home;
