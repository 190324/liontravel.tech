import * as React from 'react'
import { StyledWrapper } from './styled'

const Component = (props) => {
    return (
        <StyledWrapper className={props.className}>
            {props.children}
        </StyledWrapper>
    )
}

export default Component
