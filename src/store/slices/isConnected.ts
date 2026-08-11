import { createSlice } from '@reduxjs/toolkit'

type IsConnected = {
	isConnected: boolean
}

const initialState: IsConnected = {
	isConnected: false
}

const isConnectedSlice = createSlice({
	name: 'isConnected',
	initialState,
	reducers: {
		setDisconnected: (state) => {
			state.isConnected = false
		},
		setConnected: (state) => {
			state.isConnected = true
		}
	}
})

export const {setConnected, setDisconnected} = isConnectedSlice.actions
export default isConnectedSlice.reducer