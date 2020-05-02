import * as React from 'react'
import { StyledWrapper } from './styled'

const Component = (props) => {
    return (
        <StyledWrapper
            type={props.type}
            placeholder={props.placeholder}
        ></StyledWrapper>
    )
}

export default Component
