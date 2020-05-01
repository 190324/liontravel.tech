import * as React from 'react'
import { StyledWrapper } from './styled'

const Component = (props) => {
    return (
        <StyledWrapper bg={props.bg} color={props.color}>
            {props.children}
        </StyledWrapper>
    )
}

export default Component
