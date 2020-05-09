import * as React from 'react'
import { StyledWrapper } from './styled'
import Trash from '@components/Icon/Trash'
import Quantity from '@components/Quantity'

import { STORAGE_PATH } from '@graphql/product'
interface Props {
    data: any
}

const Container: React.FC<Props> = (props) => {
    return (
        <StyledWrapper>
            <div className="imgWrap">
                <img
                    src={`${
                        props.data?.product?.images?.length > 0
                            ? `${STORAGE_PATH}${props.data.product.no}/${props.data?.product.images[0].path}`
                            : '//via.placeholder.com/150'
                    }`}
                    alt=""
                />
            </div>
            <div className="infoWrap">
                <div>
                    <b>{props.data.product.name}</b>
                </div>
                <div>
                    NT{' '}
                    <span className="primaryColor">
                        <b>{props.data.product.sale_price.toLocaleString()}</b>
                    </span>
                </div>
                <div>
                    <Quantity value={props.data.qty} onChange={() => {}} />
                </div>
            </div>
            <div className="mutationWrap">
                <Trash fontSize="24" />
            </div>
        </StyledWrapper>
    )
}

export default Container
