import * as React from 'react'
import { withApollo } from '@lib/withApollo'
import { useQuery } from '@apollo/react-hooks'
import { QUERY_ME } from '@graphql/user'

const Page = () => {
    const { loading, error, data } = useQuery(QUERY_ME)

    return <div>Member</div>
}

export default withApollo(Page, { ssr: false })
