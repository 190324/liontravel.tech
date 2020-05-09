import * as React from 'react'
import { withApollo } from '@lib/withApollo'
import { StyledWrapper } from '@styled/index'
import CardGroup from '@containers/CardGroup'

export const config = { amp: 'hybrid' }

const Page = () => {
    return (
        <StyledWrapper>
            <div className="banner"></div>
            <CardGroup title="最新商品" />
            <CardGroup title="熱銷商品" />
        </StyledWrapper>
    )
}

export default withApollo(Page)
