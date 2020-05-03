import * as React from 'react'
import { StyledWrapper } from './styled'

export enum LoadingType {
    page,
    container,
}

interface Props {
    size?: number
    type?: LoadingType
}

const Comp = (props: Props) => {
    return (
        <StyledWrapper
            {...props}
            className={props.type == LoadingType.page ? 'page' : 'container'}
        />
    )
}

export default Comp
