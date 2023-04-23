import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
	const { user } = useSelector((state) => state.global);
	return (
		<>
			{user && user.isAdmin ? (
				<Outlet />
			) : (
				<Navigate to='/account/login' />
			)}
		</>
	);
};

export default AdminProtectedRoute;
