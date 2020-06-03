import * as React from 'react'
import Card from '@components/Card'
import { StyledWrapper } from './styled'

import { STORAGE_PATH } from '@graphql/product'

interface Props {
    title: string
    data: any
    subTitle?: string
}

const Container: React.FC<Props> = (props) => {
    return (
        <StyledWrapper>
            <div className="title">
                <h2>{props.title}</h2>
                {props.subTitle ? <h3>{props.subTitle}</h3> : null}
            </div>
            <div className="itemWrap">
                {props?.data?.map((row, key) => {
                    return (
                        <Card
                            key={key}
                            className="item"
                            no={row.no}
                            title={row.name}
                            sale_price={row.sale_price}
                            list_price={row.list_price}
                            image={
                                row.images.length > 0
                                    ? `${STORAGE_PATH}${row.no}/${row.images[0].path}`
                                    : '//via.placeholder.com/300'
                            }
                        />
                    )
                })}
            </div>
        </StyledWrapper>
    )
}

export default Container
