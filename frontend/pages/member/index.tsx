import * as React from 'react'
import { withApollo } from '@lib/withApollo'
import { withAuth } from '@lib/withAuth'

const Page = () => {
    return (
        <div>
            <div>Member</div>
        </div>
    )
}

export default withApollo(withAuth(Page), { ssr: false })
