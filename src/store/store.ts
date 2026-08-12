import { configureStore } from '@reduxjs/toolkit'
import globalErrorReducer from './slices/globalError'
import isUserLeavingReducer from './slices/isUserLeaving'
import isConnectedReducer from './slices/isConnected'
import isDarkReducer from './slices/darkTheme'

export const store = configureStore({
	reducer: {
		globalError: globalErrorReducer,
		isUserLeaving: isUserLeavingReducer,
		isConnected: isConnectedReducer,
		isDark: isDarkReducer
	},
})

export type RootType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
