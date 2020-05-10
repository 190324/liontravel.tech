import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                })
            const props = await Document.getInitialProps(ctx)
            return {
                ...props,
                styles: (
                    <>
                        {props.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <script src={`/static/scripts/gtm.js`}></script>

                    <meta name="application-name" content="LionTech PWA APP" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta
                        name="apple-mobile-web-app-status-bar-style"
                        content="default"
                    />
                    <meta
                        name="apple-mobile-web-app-title"
                        content="LionTech PWA APP"
                    />
                    <meta
                        name="description"
                        content="Welcome To LionTech Website"
                    />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta
                        name="msapplication-config"
                        content="/static/icons/browserconfig.xml"
                    />
                    <meta name="msapplication-TileColor" content="#2B5797" />
                    <meta name="msapplication-tap-highlight" content="no" />
                    <meta name="theme-color" content="#000000" />
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                    />

                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/static/icons/icon-180x180.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/static/icons/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/static/icons/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/static/manifest.json" />
                    <link
                        rel="mask-icon"
                        href="/static/icons/safari-pinned-tab.svg"
                        color="#5bbad5"
                    />
                    <link
                        rel="shortcut icon"
                        href="/static/icons/favicon.ico"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
                    />

                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:url" content="https://liontavel.tech" />
                    <meta name="twitter:title" content="PWA App" />
                    <meta
                        name="twitter:description"
                        content="Best PWA App in the world"
                    />
                    <meta
                        name="twitter:image"
                        content="/static/icons/icon-192x192.png"
                    />
                    <meta name="twitter:creator" content="@LionTech" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="LionTech PWA APP" />
                    <meta
                        property="og:description"
                        content="Welcome To LionTech Website"
                    />
                    <meta property="og:site_name" content="LionTech PWA APP" />
                    <meta property="og:url" content="https://liontavel.tech" />
                    <meta
                        property="og:image"
                        content="https://liontavel.tech/static/icons/apple-touch-icon.png"
                    />
                </Head>
                <body>
                    {/*Google Tag Manager (noscript)*/}
                    <noscript>
                        <iframe
                            src={process.env.GTM_URI}
                            height="0"
                            width="0"
                            style={{ display: 'none', visibility: 'hidden' }}
                        ></iframe>
                    </noscript>
                    {/*End Google Tag Manager (noscript)*/}
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
