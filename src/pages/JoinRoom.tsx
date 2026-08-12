import { useForm, type SubmitHandler } from 'react-hook-form'
import { roomSchema, type Room } from '../schemas/joinRoomSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootType } from '../store/store'
import { clearGlobalError } from '../store/slices/globalError'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import clsx from 'clsx'

gsap.registerPlugin(SplitText)

function JoinRoom() {
	const dispatch = useDispatch<AppDispatch>()
	const globalError = useSelector((state: RootType) => state.globalError)
	const isDark = useSelector((state: RootType) => state.isDark.isDark)

	const navigate = useNavigate()

	useGSAP(() => {
		const tl = gsap.timeline({
			delay: 3,
			repeat: -1,
			repeatDelay: 2,
		})
		const split = SplitText.create('.split', { type: 'chars' })

		gsap.set(split.chars, {
			display: 'inline-block',
		})

		tl.to(split.chars, {
			keyframes: [
				{
					yPercent: -40,
					duration: 0.4,
				},
				{
					yPercent: 0,
					duration: 0.4,
				},
			],
			stagger: 0.15,
			ease: 'power2.inOut',
		})
	}, [])
	const {
		handleSubmit,
		register,
		watch,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<Room>({
		resolver: zodResolver(roomSchema),
		defaultValues: { roomNum: '' },
		mode: 'onSubmit',
	})

	const roomNumInput = watch('roomNum')

	const onSubmit: SubmitHandler<Room> = data => {
		console.log(data)
		dispatch(clearGlobalError())
		navigate(`/room/${data.roomNum}`)
	}

	function clearInput() {
		reset()
	}

	return (
		<>
			<div className='joinRoomWrapper relative w-full h-screen flex justify-center items-center'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex relative flex-col gap-10 justify-center items-center h-full'
				>
					<h1
						className={
							'anim split tracking-wider text-4xl text-black dark:text-white text-shadow-md text-shadow-gray-500  '
						}
					>
						Enter Room:
					</h1>
					<div className='relative'>
						<input
							{...register('roomNum')}
							type='number'
							className='anim room-inp rounded-sm text-md p-2 pr-8 outline-2 w-60 outline-black text-black shadow-md shadow-black dark:outline-white dark:text-white dark:shadow-white'
						/>
						{roomNumInput && (
							<button
								onClick={clearInput}
								type='button'
								className='absolute text-black dark:text-white right-0 text-2xl flex justify-center items-center top-1 cursor-pointer pb-2 w-7'
							>
								&#215;
							</button>
						)}
						<p className='absolute -bottom-7 font-semibold text-red-800'>
							{errors.roomNum && errors.roomNum.message}
						</p>
					</div>
					<button
						type='submit'
						className='anim join text-3xl text-black dark:text-white w-25 h-14 hover:bg-gray-700 cursor-pointer border-black dark:border-white border-2 rounded-sm active:bg-black active:text-black dark:active:bg-white transition-colors flex justify-center items-center shadow-sm shadow-black dark:shadow-black text-shadow-gray-500 text-shadow-md'
					>
						{isSubmitting ? (
							<div className={clsx(isDark ? 'dark' : '', 'loader')} />
						) : (
							'Join'
						)}
					</button>
					<p className='absolute bottom-10 font-semibold text-red-800'>
						{globalError.error ? globalError.error : ''}
					</p>
				</form>
			</div>
		</>
	)
}

export default JoinRoom
