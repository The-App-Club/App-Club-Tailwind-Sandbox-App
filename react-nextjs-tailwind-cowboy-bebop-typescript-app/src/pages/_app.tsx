import type { AppPropsWithLayout } from 'next/app'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import NextNProgress from 'nextjs-progressbar'
import { Toaster } from 'react-hot-toast'
import { RecoilRoot } from 'recoil'

import { queryClient } from '@/libs/queryClient'

import '@/styles/globals.css'

interface CowboyAppProps extends AppPropsWithLayout {}

const BebopApp = ({ Component, pageProps }: CowboyAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

const CowboyApp = (props: CowboyAppProps) => {
  return (
    <RecoilRoot>
      <Toaster position='bottom-left' reverseOrder={false} />
      <NextNProgress
        color={`#4338ca`}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <BebopApp {...props} />
    </RecoilRoot>
  )
}

export default CowboyApp
