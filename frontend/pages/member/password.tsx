import * as React from 'react'
import Link from 'next/link'
import { withApollo } from '@lib/withApollo'
import { withAuth } from '@lib/withAuth'
import MemberSubLayout from '@containers/MemberSubLayout'
import { StyledWrapper } from '@styled/sell/product/index'

const { Fragment } = React

const Page = () => {
    return (
        <MemberSubLayout title="密碼變更">
            <StyledWrapper></StyledWrapper>
        </MemberSubLayout>
    )
}

export default withApollo(withAuth(Page), { ssr: false })
