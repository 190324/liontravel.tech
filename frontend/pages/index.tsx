import * as React from 'react'
import { withApollo } from '@lib/withApollo'
import { StyledWrapper } from '@styled/index'
import CardGroup from '@containers/CardGroup'

const Page = () => {
    return (
        <StyledWrapper>
            <div className="banner"></div>
            <div>
                <CardGroup />
            </div>
            <div>熱銷商品</div>
        </StyledWrapper>
    )
}

export default withApollo(Page)
