import gsap from 'gsap'
import { MorphSVGPlugin } from 'gsap/all'
import { useParams } from 'react-router-dom'
import Clock from '../components/Clock'
import { SquareArrowRightExit } from 'lucide-react'

gsap.registerPlugin(MorphSVGPlugin)

export default function Room() {
	const { roomId } = useParams()

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

				<div className='clock language text-black dark:text-white text-6xl text-shadow-md text-shadow-gray-500 mt-10'>
					{true ? 'SK' : <div className='loaderRoom' />}
				</div>

				<div className='popUp absolute invisible  opacity-0 text-white bottom-10 right-[50%] translate-x-[50%] p-2 rounded-sm shadow-md shadow-gray-500 bg-gray-600 select-none pointer-events-none'>
					Copied!
				</div>

				<button
					title='Leave Room'
					className='anim absolute sm:top-10 top-[80%] right-5 cursor-pointer flex justify-center items-center p-2'
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
