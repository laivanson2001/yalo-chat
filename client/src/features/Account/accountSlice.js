import { createSlice } from "@reduxjs/toolkit";

const KEY = "account";

const accountSlice = createSlice({
	name: KEY,
	initialState: {
		isLoading: false,
	},
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	extraReducers: (builder) => builder,
});

const { reducer, actions } = accountSlice;
export const { setLoading } = actions;

export default reducer;
