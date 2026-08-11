import { useCurrentTime } from '../hooks/useCurrentTime'

export default function Clock() {
	const { hours, minutes } = useCurrentTime()

	return (
		<span className='clock text-[7rem] text-black dark:text-white '>
			{hours}:{minutes}
		</span>
	)
}
