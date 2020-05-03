import * as React from 'react'
import { StyledWrapper } from './styled'

const Component = (props) => {
    return (
        <StyledWrapper
            type={props.type}
            placeholder={props.placeholder}
            onChange={(e) => {
                if (props.onChange) {
                    props.onChange(e.target.value)
                }
            }}
        ></StyledWrapper>
    )
}

export default Component
