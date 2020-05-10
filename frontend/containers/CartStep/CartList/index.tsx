import * as React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { StyledWrapper } from './styled'
import Row from './row'

import { QUERY_CARTS, MUTATION_DELCART } from '@graphql/cart'

interface Props {
    data: any
    onRefetch: () => void
}

const Container: React.FC<Props> = (props) => {
    const [mutationDelCart, { data: delCartResult }] = useMutation(
        MUTATION_DELCART
    )

    const onDelete = (no: string) => {
        let result = mutationDelCart({
            variables: {
                no: no,
            },
        })

        result.then(() => {
            props.onRefetch()
        })
    }
    return (
        <StyledWrapper>
            {props.data.length > 0 ? (
                props.data.map((row) => {
                    return (
                        <Row
                            className="cartItem"
                            key={row.no}
                            data={row}
                            onDelete={() => onDelete(row.no)}
                        />
                    )
                })
            ) : (
                <div className="alignCenter">快去添購商品唄！</div>
            )}
        </StyledWrapper>
    )
}

export default Container
