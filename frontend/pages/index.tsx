import * as React from 'react'
import Layout from '@containers/Layout'
import { useQuery } from '@apollo/react-hooks'
import { withApollo } from '@lib/withApollo'
import { StyledWrapper } from '@styled/index'
import Header from '@containers/Header'
import Banner from '@components/Banner'
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
        <>
            <Header />
            <Banner />
            <Layout hasHeader={false}>
                <StyledWrapper>
                    <CardGroup
                        title="最新商品"
                        subTitle="New Products"
                        data={latestProducts?.products?.data?.edges}
                    />
                    <div className="adWrap">
                        <img src="https://via.placeholder.com/640x100" alt="" />
                    </div>
                    <CardGroup
                        title="熱銷商品"
                        subTitle="Hot Products"
                        data={hotProducts?.products?.data?.edges}
                    />
                </StyledWrapper>
            </Layout>
        </>
    )
}

export default withApollo(Page)
