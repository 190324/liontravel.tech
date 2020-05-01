import * as React from 'react'
import { StyledWrapper } from './styled'

const Component = (props) => {
    return (
        <StyledWrapper>
            <div className="ctl">-</div>
            <div className="input">
                <input type="text" value="1" />
            </div>
            <div className="ctl">+</div>
        </StyledWrapper>
    )
}

export default Component
