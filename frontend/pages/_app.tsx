import * as React from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import { GlobalStyle, theme } from '@styled/_app'
import { ThemeProvider } from 'styled-components'
import Layout from '@containers/Layout'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
    const setStyleProperty = () => {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    React.useEffect(() => {
        setStyleProperty()
        window.addEventListener('resize', setStyleProperty, false)

        Router.events.on('routeChangeComplete', () => {
            window.scrollTo(0, 0)
        })
        return () => {
            window.removeEventListener('resize', setStyleProperty, false)
        }
    }, [])

    return (
        <>
            <Head>
                <title>{process.env.APP_NAME}</title>
            </Head>
            <ThemeProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <GlobalStyle />
            </ThemeProvider>
        </>
    )
}

export default MyApp
