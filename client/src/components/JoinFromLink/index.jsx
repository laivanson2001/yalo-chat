import React from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";

JoinFromLink.propTypes = {};

function JoinFromLink(props) {
	const navigate = useNavigate();
	const { conversationId } = useParams();

	navigate(`/chat/${conversationId}`);

	return <div>{conversationId}</div>;
}

export default JoinFromLink;
