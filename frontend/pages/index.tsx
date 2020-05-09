import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { withApollo } from '@lib/withApollo'
import { StyledWrapper } from '@styled/index'
import CardGroup from '@containers/CardGroup'

import { QUERY_PRODUCTS } from '@graphql/product'
export const config = { amp: 'hybrid' }

const Page = () => {
    const queryMultiple = () => {
        const latestProducts = useQuery(QUERY_PRODUCTS, {
            variables: { page: 1, per_page: 8, order: ['latest'] },
        })
        const hotProducts = useQuery(QUERY_PRODUCTS, {
            variables: { page: 1, per_page: 4, order: ['hot'] },
        })
        return [latestProducts, hotProducts]
    }
    const [
        { loading: latestLoading, data: latestProducts },
        { loading: hotLoading, data: hotProducts },
    ] = queryMultiple()

    return (
        <StyledWrapper>
            <div className="banner"></div>
            <CardGroup
                title="最新商品"
                data={latestProducts?.products?.data?.edges}
            />
            <CardGroup
                title="熱銷商品"
                data={hotProducts?.products?.data?.edges}
            />
        </StyledWrapper>
    )
}

export default withApollo(Page)
