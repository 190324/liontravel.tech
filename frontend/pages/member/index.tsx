import * as React from 'react'
import Link from 'next/link'
import { withApollo } from '@lib/withApollo'
import { withAuth } from '@lib/withAuth'

const { Fragment } = React

const Page = () => {
    return (
        <div>
            <div>Member</div>
            <div></div>
        </div>
    )
}

export default withApollo(withAuth(Page), { ssr: false })
