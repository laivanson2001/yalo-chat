import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./scss/App.scss";
import Home from "features/Home";
import Account from "features/Account";
import ProtectedRoute from "components/ProtectedRoute";
import ChatLayout from "layout/ChatLayout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "app/globalSlice";
import { fetchInfoWebs } from "features/Home/homeSlice";
import CallVideo from "features/CallVideo";
import AdminProtectedRoute from "components/AdminProtectedRoute";
import Admin from "features/Admin";
import JoinFromLink from "components/JoinFromLink";

function App() {
	const dispatch = useDispatch();

	const [isFetch, setIsFetch] = useState(false);

	useEffect(() => {
		const fetchProfile = async () => {
			const token = localStorage.getItem("token");

			if (token) await dispatch(fetchUserProfile());

			setIsFetch(true);
		};

		fetchProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// dispatch(fetchInfoWebs());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!isFetch) return "";

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='account/*' element={<Account />} />
				<Route element={<AdminProtectedRoute />}>
					<Route path='admin/*' element={<Admin />} />
				</Route>
				<Route
					path='jf-link/:conversationId'
					element={<JoinFromLink />}
				/>
				<Route element={<ProtectedRoute />}>
					<Route path='chat/*' element={<ChatLayout />} />
				</Route>
				<Route element={<ProtectedRoute />}>
					<Route
						path='call-video/:conversationId'
						element={<CallVideo />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
