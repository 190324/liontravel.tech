import * as React from 'react'
import { StyledWrapper } from './styled'

const Component = (props) => {
    return (
        <StyledWrapper
            type="button"
            bg={props.bg}
            color={props.color}
            display={props.display}
            onClick={() => {
                if (props.onClick) {
                    props.onClick()
                }
            }}
        >
            {props.children}
        </StyledWrapper>
    )
}

export default Component
