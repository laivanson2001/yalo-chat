import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const style_MainEditor = {
	minHeight: "122px",
};

const regEx = new RegExp("^(<p><br></p>)+$");

const TextEditor = ({
	showFormat,
	onBlur,
	onFocus,
	showLike,
	valueHtml,
	onSetValue,
}) => {
	const ref = useRef();

	const handleOnChange = (content, delta, source, editor) => {
		if (onSetValue) {
			onSetValue(content);
		}
		if (showLike && !regEx.test(content)) {
			showLike(false);
		} else {
			showLike(true);
		}
	};

	const handleFocus = () => {
		if (onFocus) {
			onFocus();
		}
	};

	const handleOnBlur = () => {
		if (onBlur) {
			onBlur();
		}
	};

	const formats = [
		[{ header: "1" }, { header: "2" }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
	];

	const handleOnKeyDown = (event) => {};

	useEffect(() => {
		ref.current?.editor.root.setAttribute("spellcheck", "false");
	}, []);

	return (
		<div id='text-editor' style={showFormat ? style_MainEditor : undefined}>
			<ReactQuill
				ref={ref}
				theme='snow'
				value={valueHtml}
				onChange={handleOnChange}
				placeholder='Nhập tin nhắn'
				onFocus={handleFocus}
				onBlur={handleOnBlur}
				modules={{ toolbar: showFormat ? formats : false }}
				style={{ border: "none", outline: "none" }}
				onKeyDown={handleOnKeyDown}
			/>
		</div>
	);
};

TextEditor.propTypes = {
	showFormat: PropTypes.bool,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	showLike: PropTypes.func,
	onSetValue: PropTypes.func,
	valueHtml: PropTypes.string,
};

TextEditor.defaultProps = {
	showFormat: null,
	onBlur: null,
	onFocus: null,
	showLike: null,
	onSetValue: null,
	valueHtml: "",
};

export default TextEditor;
