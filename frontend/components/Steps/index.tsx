import * as React from 'react'
import { StyledWrapper } from './styled'

const Component = (props) => {
    return (
        <StyledWrapper className={props.className}>
            {props.children}1 => 2 => 3
        </StyledWrapper>
    )
}

export default Component
