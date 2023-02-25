import { envsafe, str } from 'envsafe'

const env = envsafe({
  NEXT_PUBLIC_FRONTEND_BASE_URL: str({
    default: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL,
    devDefault: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL,
  }),
  NEXT_PUBLIC_BACKEND_ENDPOINT_BASE_URL: str({
    default: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_BASE_URL,
    devDefault: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_BASE_URL,
  }),
  NODE_ENV: str({
    default: process.env.NODE_ENV,
    choices: ['production', 'development', 'test'],
    devDefault: process.env.NODE_ENV,
  }),
})

export { env }
