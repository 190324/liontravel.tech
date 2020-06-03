import * as React from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { useAmp } from 'next/amp'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { GlobalStyle, theme } from '@styled/_app'
import { ThemeProvider } from 'styled-components'
import NProgress from 'nprogress'

Router.events.on('routeChangeStart', (url) => {
    // console.log(`Loading: ${url}`)
    NProgress.start()
})
Router.events.on('routeChangeError', () => NProgress.done())

Router.events.on('routeChangeComplete', () => {
    NProgress.done()
    window.scrollTo(0, 0)
})

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
    const isAmp = useAmp()
    const router = useRouter()
    const setStyleProperty = () => {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    React.useEffect(() => {
        setStyleProperty()
        window.addEventListener('resize', setStyleProperty, false)
        return () => {
            window.removeEventListener('resize', setStyleProperty, false)
        }
    }, [])

    return (
        <>
            <Head>
                <title>{process.env.APP_NAME}</title>
                {isAmp ? null : (
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                )}
            </Head>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} key={router.route} />
                <GlobalStyle />
            </ThemeProvider>
        </>
    )
}

export default MyApp
