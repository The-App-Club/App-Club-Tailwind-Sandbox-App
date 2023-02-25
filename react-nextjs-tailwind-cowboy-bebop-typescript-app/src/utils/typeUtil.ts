import { JsonArray, JsonObject, JsonValue } from 'type-fest'
import { z } from 'zod'

const isArray = (data: unknown): data is Array<unknown> => {
  return z.unknown().array().safeParse(data).success
}

const isNullOrUndefined = (data: unknown): data is null | undefined => {
  return data === null || data === undefined
}

const isJSONData = (data: unknown) => {
  return z.custom<JsonObject | JsonArray | JsonValue>().safeParse(data).success
}

export { isNullOrUndefined, isJSONData, isArray }
