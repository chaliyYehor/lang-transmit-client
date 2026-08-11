import { createSlice } from '@reduxjs/toolkit'

type IsUserLeaving = {
	isUserLeaving: boolean
}

const initialState: IsUserLeaving = {
	isUserLeaving: false,
}

const isUserLeaving = createSlice({
	name: 'isUserLeaving',
	initialState,
	reducers: {
		setIsLeaving: state => {
			state.isUserLeaving = true
		},
		setIsNotLeaving: state => {
			state.isUserLeaving = false
		},
	},
})

export const { setIsLeaving, setIsNotLeaving } = isUserLeaving.actions
export default isUserLeaving.reducer
