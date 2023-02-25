import { z } from 'zod'

export const BackendResponseDataSchema = z.object({
  message: z.string(),
})

export type BackendResponseData = z.infer<typeof BackendResponseDataSchema>
