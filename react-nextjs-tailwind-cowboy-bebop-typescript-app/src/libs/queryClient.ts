import { QueryClient } from '@tanstack/react-query'

export const generateQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        networkMode: 'online',
        retry: 2,
        retryDelay: 3000,
        useErrorBoundary: false, // try change
        suspense: false, // try change
        retryOnMount: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
      mutations: {},
    },
  })
}

export const queryClient = generateQueryClient()
