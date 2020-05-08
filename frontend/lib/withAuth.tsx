import * as React from 'react'
import Router from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import { QUERY_ME } from '@graphql/user'
import Loading, { LoadingType } from '@components/Loading'

//source: https://github.com/zeit/next.js/blob/canary/examples/with-cookie-auth-fauna/utils/auth.js

export const withAuth = (Component) => {
    const Wrapper = (props) => {
        const { loading, error, data } = useQuery(QUERY_ME)

        React.useEffect(() => {
            console.log(loading, error, data)
            if (!loading && data?.me?.code != 200) {
                Router.push('/login')
            }
            return () => {}
        }, [data])

        return (
            <>
                {loading ? <Loading type={LoadingType.page} /> : null}
                {data?.me?.code == 200 ? <Component {...props} /> : null}
            </>
        )
    }

    if (Component.getInitialProps) {
        Wrapper.getInitialProps = Component.getInitialProps
    }

    return Wrapper
}
