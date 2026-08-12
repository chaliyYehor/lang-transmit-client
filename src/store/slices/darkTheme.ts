import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type IsDark = {
	isDark: boolean
}

const initialState: IsDark = {
	isDark: false,
}

const isDark = createSlice({
	name: 'isDark',
	initialState,
	reducers: {
		setIsDark: (state, payload: PayloadAction<boolean>) => {
			state.isDark = payload.payload
		},
	},
})

export const { setIsDark } = isDark.actions
export default isDark.reducer
