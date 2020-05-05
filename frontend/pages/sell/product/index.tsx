import * as React from 'react'
import { withApollo } from '@lib/withApollo'
import { withAuth } from '@lib/withAuth'
import Link from 'next/link'
import MemberSubLayout from '@containers/MemberSubLayout'
import { StyledWrapper } from '@styled/sell/product/index'

const Page = () => {
    return (
        <MemberSubLayout title="產品列表">
            <StyledWrapper>
                <Link href="/sell/product/mutation">
                    <a>新增</a>
                </Link>
            </StyledWrapper>
        </MemberSubLayout>
    )
}

export default withApollo(withAuth(Page), { ssr: false })
