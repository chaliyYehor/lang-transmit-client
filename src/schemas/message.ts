import z from 'zod'

export const messageSchema = z.object({
	type: z.string('lang'),
	data: z.string().min(2),
})

export type Message = z.infer<typeof messageSchema>
