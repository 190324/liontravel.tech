import * as React from 'react'
import { withApollo } from '@lib/withApollo'
import { withAuth } from '@lib/withAuth'
import { useQuery } from '@apollo/react-hooks'
import Loading, { LoadingType } from '@components/Loading'

import { QUERY_CARTS } from '@graphql/cart'

const { Fragment } = React

const Page = () => {
    const { loading, error, data } = useQuery(QUERY_CARTS)

    return (
        <Fragment>
            {loading ? (
                <Loading type={LoadingType.container} size={20} />
            ) : (
                <div>
                    {data?.carts?.data?.edges.map((row) => {
                        return (
                            <div>
                                {row.product.name}-{row.product.sale_price}-
                                {row.qty}
                            </div>
                        )
                    })}
                </div>
            )}
        </Fragment>
    )
}

export default withApollo(withAuth(Page), { ssr: false })
