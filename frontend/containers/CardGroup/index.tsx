import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Card from '@components/Card'
import { StyledWrapper } from './styled'

import { QUERY_PRODUCTS } from '@graphql/product'

interface Props {
    title: string
}

const Container: React.FC<Props> = (props) => {
    const { loading, error, data } = useQuery(QUERY_PRODUCTS, {
        variables: {},
    })

    return (
        <StyledWrapper>
            <div className="title">
                <h2>{props.title}</h2>
            </div>
            <div className="itemWrap">
                {data?.products?.data?.edges.map((row, key) => {
                    return (
                        <Card
                            className="item"
                            key={key}
                            no={row.no}
                            title={row.name}
                            price={row.sale_price}
                        />
                    )
                })}
            </div>
        </StyledWrapper>
    )
}

export default Container
