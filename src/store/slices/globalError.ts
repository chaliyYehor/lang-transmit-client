import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type GlobalError = {
	error: string | null
}

const initialState: GlobalError = {
	error: null,
}

const errorSlice = createSlice({
	name: 'globalError',
	initialState,
	reducers: {
		setGlobalError: (state, action: PayloadAction<string>) => {
			state.error = action.payload
		},
		clearGlobalError: state => {
			state.error = null
		},
	},
})

export const { setGlobalError, clearGlobalError } = errorSlice.actions
export default errorSlice.reducer