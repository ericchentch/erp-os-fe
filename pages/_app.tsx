import { AuthLayout } from '@/components/layout/AuthLayout'
import { NextUiProviderTheme } from '@/components/layout/NextUiProviderTheme'
import { useGetDarkMode } from '@/hooks'
import store from '@/redux/store'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  const isDark = useGetDarkMode()

  return (
    <Provider store={store}>
      <ToastContainer
        autoClose={3000}
        position="top-center"
        theme={isDark ? 'dark' : 'light'}
        style={{ zIndex: 1000000 }}
      />
      <CookiesProvider>
        <NextUiProviderTheme>
          <AuthLayout>{getLayout(<Component {...pageProps} />)}</AuthLayout>
        </NextUiProviderTheme>
      </CookiesProvider>
    </Provider>
  )
}

export default MyApp
