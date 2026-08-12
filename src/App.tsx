import { Route, Routes, useNavigate } from 'react-router-dom'
import JoinRoom from './pages/JoinRoom'
import Room from './pages/Room'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootType } from './store/store'
import { setConnected, setDisconnected } from './store/slices/isConnected'
import { clearGlobalError, setGlobalError } from './store/slices/globalError'
import { socket } from './socket'
import { Moon, Snowflake, Sun } from 'lucide-react'
import Snowfall from 'react-snowfall'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import { setIsDark } from './store/slices/darkTheme'
import NotFound from './pages/NotFound'

gsap.registerPlugin(SplitText)

function App() {
	const [dark, setDark] = useState(false)

	const [isSnowing, setIsSnowing] = useState(
		localStorage.getItem('isSnowing') === 'true',
	)

	const dispatch = useDispatch<AppDispatch>()
	const isUserLeaving = useSelector(
		(state: RootType) => state.isUserLeaving.isUserLeaving,
	)

	useEffect(() => {
		if (localStorage.getItem('theme')) {
			const isDark = localStorage.getItem('theme') === 'dark'
			setDark(isDark)
			dispatch(setIsDark(isDark))
		}
	})

	useEffect(() => {
		document.documentElement.classList.toggle('dark', dark)
		if (dark) {
			document.body.style.backgroundColor = 'black'
			dispatch(setIsDark(true))
		} else {
			document.body.style.backgroundColor = 'white'
			dispatch(setIsDark(false))
		}
	}, [dark])

	const navigate = useNavigate()

	useEffect(() => {
		const handleConnect = () => {
			dispatch(setConnected())
			dispatch(clearGlobalError())
		}

		const handleConnectError = (error: Error) => {
			dispatch(setDisconnected())

			if (error.message === 'Too Many Requests') {
				dispatch(setGlobalError('Too many requests'))
			} else if (error.message === 'Forbidden') {
				dispatch(setGlobalError('Connection forbidden'))
			} else {
				dispatch(setGlobalError('Unable to connect to server'))
			}

			navigate('/')
		}

		const handleDisconnect = () => {
			if (isUserLeaving) {
				return
			}

			dispatch(setGlobalError('Connection to server lost'))

			navigate('/')
		}

		socket.on('connect', handleConnect)
		socket.on('disconnect', handleDisconnect)
		socket.on('connect_error', handleConnectError)

		return () => {
			socket.off('connect', handleConnect)
			socket.off('disconnect', handleDisconnect)
			socket.off('connect_error', handleConnectError)
		}
	}, [])

	function switchTheme() {
		setDark(prev => {
			localStorage.setItem('theme', prev ? 'light' : 'dark')

			return !prev
		})
	}

	function setIsSnowingFunc(value: boolean) {
		setIsSnowing(value)
		localStorage.setItem('isSnowing', value.toString())
	}

	useGSAP(() => {
		gsap.fromTo(
			'.anim',
			{
				yPercent: 100,
				autoAlpha: 0,
				ease: 'power4.out',
			},
			{
				yPercent: 0,
				autoAlpha: 1,
				duration: 1,
				stagger: 0.2,
			},
		)
	}, [])
	return (
		<>
			{isSnowing && (
				<div className='snowfall-wrapper bg-transparent w-full h-screen absolute top-0 left-0 pointer-events-none'>
					<Snowfall
						color={dark ? 'white' : 'black'}
						radius={[1, 3]}
						snowflakeCount={15}
					/>
				</div>
			)}
			<div className='absolute flex sm:flex-col gap-4 w-full justify-between p-5 sm:p-0 sm:justify-baseline sm:w-fit  z-10 sm:top-[50%] sm:left-10 '>
				<button
					className='anim w-10 h-10 flex justify-center items-center cursor-pointer'
					title='Switch Theme'
					onClick={() => switchTheme()}
				>
					{dark ? (
						<Sun size={40} color='white' />
					) : (
						<Moon size={40} color='black' />
					)}
				</button>
				<button
					className='anim  w-10 h-10 flex justify-center items-center cursor-pointer'
					title='Switch Effect'
					onClick={() => setIsSnowingFunc(!isSnowing)}
				>
					{dark ? (
						<Snowflake size={40} color='white' />
					) : (
						<Snowflake size={40} color='black' />
					)}
				</button>
			</div>
			<Routes>
				<Route path='/' element={<JoinRoom />} />
				<Route path='/room/:roomId' element={<Room />} />

				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	)
}

export default App
