import React from 'react'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'

import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

let globalApolloClient = null

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent, { ssr = true } = {}) {
    const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
        const client = apolloClient || initApolloClient(apolloState)
        return (
            <ApolloProvider client={client}>
                <PageComponent {...pageProps} />
            </ApolloProvider>
        )
    }

    // Set the correct displayName in development
    if (process.env.NODE_ENV !== 'production') {
        const displayName =
            PageComponent.displayName || PageComponent.name || 'Component'

        if (displayName === 'App') {
            console.warn('This withApollo HOC only works with PageComponents.')
        }

        WithApollo.displayName = `withApollo(${displayName})`
    }

    if (ssr || PageComponent.getInitialProps) {
        WithApollo.getInitialProps = async (ctx) => {
            const { AppTree } = ctx

            // Initialize ApolloClient, add it to the ctx object so
            // we can use it in `PageComponent.getInitialProp`.
            const apolloClient = (ctx.apolloClient = initApolloClient(null))

            // Run wrapped getInitialProps methods
            let pageProps = {}
            if (PageComponent.getInitialProps) {
                pageProps = await PageComponent.getInitialProps(ctx)
            }

            // Only on the server:
            if (typeof window === 'undefined') {
                // When redirecting, the response is finished.
                // No point in continuing to render
                if (ctx.res && ctx.res.finished) {
                    return pageProps
                }

                // Only if ssr is enabled
                if (ssr) {
                    try {
                        // Run all GraphQL queries
                        const { getDataFromTree } = await import(
                            '@apollo/react-ssr'
                        )
                        await getDataFromTree(
                            <AppTree
                                pageProps={{
                                    ...pageProps,
                                    apolloClient,
                                }}
                            />
                        )
                    } catch (error) {
                        // Prevent Apollo Client GraphQL errors from crashing SSR.
                        // Handle them in components via the data.error prop:
                        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
                        console.error(
                            'Error while running `getDataFromTree`',
                            error
                        )
                    }

                    // getDataFromTree does not call componentWillUnmount
                    // head side effect therefore need to be cleared manually
                    Head.rewind()
                }
            }

            // Extract query data from the Apollo store
            const apolloState = apolloClient.cache.extract()

            return {
                ...pageProps,
                apolloState,
            }
        }
    }

    return WithApollo
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (typeof window === 'undefined') {
        return createApolloClient(initialState)
    }

    // Reuse client on the client-side
    if (!globalApolloClient) {
        globalApolloClient = createApolloClient(initialState)
    }

    return globalApolloClient
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}) {
    const httpLink = createUploadLink({
        uri: process.env.GRAPHQL_URI,
        fetchOptions: {},
        fetch,
    })

    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const accessToken = Cookies.get('access_token')
        const tokenType = Cookies.get('token_type')

        var authorization = ''
        if (accessToken && tokenType) {
            authorization = `${tokenType} ${accessToken}`
        }

        // return the headers to the context so httpLink can read them
        return {
            fetchOptions: {
                credentials: 'include',
            },
            headers: {
                ...headers,
                'keep-alive': 'true',
                Authorization: authorization,
            },
        }
    })

    // Create a WebSocket link:
    const wsLink = process.browser
        ? new WebSocketLink({
              uri: `ws://localhost:8080/query`,
              //uri: 'ws://api-gokahoot.herokuapp.com/query',
              options: {
                  connectionParams: () => {
                      const auth = { Authorization: 'Bearer ...' }
                      // return auth.headers
                  },
                  reconnect: true,
              },
          })
        : null

    const link = process.browser
        ? split(
              // split based on operation type
              ({ query }) => {
                  const definition = getMainDefinition(query)
                  return (
                      definition.kind === 'OperationDefinition' &&
                      definition.operation === 'subscription'
                  )
              },
              wsLink,
              httpLink
          )
        : httpLink

    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new ApolloClient({
        ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
        link: authLink.concat(link),
        cache: new InMemoryCache().restore(initialState),
    })
}
