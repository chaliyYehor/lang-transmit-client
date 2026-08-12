import gsap from 'gsap'
import { MorphSVGPlugin } from 'gsap/all'
import { useNavigate, useParams } from 'react-router-dom'
import Clock from '../components/Clock'
import { SquareArrowRightExit } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootType } from '../store/store'
import { socket } from '../socket'
import { setGlobalError } from '../store/slices/globalError'
import { messageSchema, type Message } from '../schemas/message'
import { setIsLeaving, setIsNotLeaving } from '../store/slices/isUserLeaving'
import clsx from 'clsx'

gsap.registerPlugin(MorphSVGPlugin)

export default function Room() {
	const [isPcConnected, setIsPcConnected] = useState(false)
	const [language, setLanguage] = useState('')

	const { roomId } = useParams()

	const navigate = useNavigate()

	function popUp() {
		const tl = gsap.timeline()

		tl.fromTo(
			'.popUp',
			{
				yPercent: 100,
				autoAlpha: 0,
			},
			{
				yPercent: 0,
				autoAlpha: 1,
				duration: 0.5,
				ease: 'back.out',
			},
		).to('.popUp', {
			yPercent: 100,
			autoAlpha: 0,
			duration: 0.5,
			delay: 0.5,
			ease: 'back.in',
		})
	}

	const dispatch = useDispatch<AppDispatch>()
	const isConnected = useSelector(
		(data: RootType) => data.isConnected.isConnected,
	)
	const isDark = useSelector((state: RootType) => state.isDark.isDark)

	useEffect(() => {
		if (!roomId) {
			navigate('/')
			return
		}

		const joinRoom = () => {
			socket.emit(
				'connectToRoom',
				{ type: 'user', roomNum: roomId },
				(response: { success: boolean; error?: string }) => {
					if (!response.success) {
						if (response.error) {
							dispatch(setGlobalError(response.error))
						}
						navigate('/')
						return
					}
				},
			)
		}

		if (socket.connected) {
			joinRoom()
		}

		const handleUserJoined = (data: {
			usersConnected: number
			pcConnected: boolean
		}) => {
			setIsPcConnected(data.pcConnected)
		}

		const handleMessage = (data: Message) => {
			const parsed = messageSchema.safeParse(data)
			if (!parsed.success) {
				return
			}
			const { data: lang } = parsed.data
			setLanguage(lang)
		}

		socket.on('userJoined', handleUserJoined)
		socket.on('message', handleMessage)

		return () => {
			socket.off('userJoined', handleUserJoined)
			socket.off('message', handleMessage)
		}
	}, [navigate, roomId, isConnected])

	function handleDisconnect() {
		dispatch(setIsLeaving())

		socket.emit(
			'leaveRoom',
			{ type: 'user', roomNum: roomId },
			(response: { success: boolean; error?: string }) => {
				if (!response.success) {
					dispatch(setIsNotLeaving())

					if (response.error) {
						dispatch(setGlobalError(response.error))
					}
					return
				}

				dispatch(setIsNotLeaving())
				navigate('/')
			},
		)
	}

	return (
		<>
			<div className='roomWrapper w-full sm:gap-0 gap-30 h-screen relative flex flex-col items-center lg:justify-around'>
				<h1
					className='anim text-3xl text-black dark:text-white text-shadow-md mt-7 text-shadow-gray-500 flex justify-center items-center gap-2 cursor-pointer z-20'
					title='Click to copy'
					onClick={() => {
						navigator.clipboard.writeText(roomId || '')
						popUp()
					}}
				>
					Room:{' '}
					<span className='inline-block max-w-30 overflow-hidden text-ellipsis'>
						{roomId}
					</span>
				</h1>

				<Clock />

				<div className='clock uppercase language text-black dark:text-white text-6xl text-shadow-md text-shadow-gray-500 mt-10 h-10'>
					{isPcConnected && language ? (
						language
					) : (
						<div className={clsx(isDark ? 'dark' : '', 'loaderRoom')} />
					)}
				</div>

				<div className='popUp absolute invisible  opacity-0 text-white bottom-10 right-[50%] translate-x-[50%] p-2 rounded-sm shadow-md shadow-gray-500 bg-gray-600 select-none pointer-events-none'>
					Copied!
				</div>

				<button
					title='Leave Room'
					className='anim absolute sm:top-10 top-[80%] right-5 cursor-pointer flex justify-center items-center p-2'
					onClick={handleDisconnect}
				>
					<SquareArrowRightExit
						className='text-black text-shadow-md text-shadow-gray-500 dark:text-white'
						size={50}
					/>
				</button>
			</div>
		</>
	)
}
