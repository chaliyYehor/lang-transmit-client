import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
	useGSAP(() => {
		gsap.fromTo(
			'.notFound',
			{
				yPercent: -20,
				autoAlpha: 0,
			},
			{
				yPercent: 0,
				autoAlpha: 1,
				delay: 0.5,
				duration: 0.7,
				ease: 'power1.inOut',
				stagger: 0.2
			},
		)
	}, [])

	const navigate = useNavigate()

	function goHome() {
		navigate('/')
	}

	return (
		<div className='wrapper w-full gap-5 h-screen flex flex-col justify-center items-center'>
			<h1 className='notFound text-[10rem] text-black dark:text-white text-shadow-md mt-7 text-shadow-gray-500 z-20'>
				404
			</h1>
			<h1 className='notFound text-[3rem] text-black dark:text-white text-shadow-md  text-shadow-gray-500 z-20'>
				This Page Is Not Build Yet
			</h1>

			<button
				title='Leave Room'
				className='notFound mt-8 p-5 text-black dark:text-white dark:hover:bg-gray-700 hover:bg-gray-400 cursor-pointer border-black dark:border-white border-2 rounded-sm active:bg-black active:text-black dark:active:bg-white transition-colors flex justify-center items-center shadow-sm shadow-black dark:shadow-black text-shadow-gray-500 text-shadow-md text-3xl'
				onClick={goHome}
			>
				Home
			</button>
		</div>
	)
}
