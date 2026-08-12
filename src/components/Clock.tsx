import { useGSAP } from '@gsap/react'
import { useCurrentTime } from '../hooks/useCurrentTime'
import gsap from 'gsap'

export default function Clock() {
	const { hours, minutes, date } = useCurrentTime()

	useGSAP(() => {
		gsap.fromTo(
			'.clock',
			{
				autoAlpha: 0,
				ease: 'power4.out',
			},
			{
				autoAlpha: 1,
				duration: 1,
				stagger: 0.3,
				delay: 0.5,
			},
		)
	}, [])

	return (
		<div className='flex flex-col relative items-center'>
			<span className='clock text-[7rem] text-black dark:text-white text-shadow-md text-shadow-gray-500'>
				{hours}:{minutes}
			</span>
			<span className='absolute text-black dark:text-white clock text-xl bottom-3 text-shadow-sm text-shadow-gray-500'>
				{date}
			</span>
		</div>
	)
}
