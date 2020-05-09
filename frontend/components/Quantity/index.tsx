import * as React from 'react'
import { StyledWrapper } from './styled'

const { useState } = React

interface Props {
    value: number
    onChange: (value: number) => void
}

const Component: React.FC<Props> = (props) => {
    const onChange = (e) => {
        let value = parseInt(e.target.value)
        props.onChange(value)
    }

    const onClick = (value) => {
        props.onChange(props.value + value)
    }

    return (
        <StyledWrapper>
            <div className="ctl" onClick={() => onClick(-1)}>
                -
            </div>
            <div className="input">
                <input
                    type="text"
                    value={props.value}
                    onChange={(e) => onChange(e)}
                />
            </div>
            <div className="ctl" onClick={() => onClick(1)}>
                +
            </div>
        </StyledWrapper>
    )
}

export default Component
