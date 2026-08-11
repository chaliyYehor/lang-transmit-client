import z from 'zod'

export const roomSchema = z.object({
	roomNum: z.string().min(3, 'Room Id Is Too Short'),
})

export type Room = z.infer<typeof roomSchema>
