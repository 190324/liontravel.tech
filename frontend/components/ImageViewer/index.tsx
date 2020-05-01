import * as React from 'react'
import { StyledWrapper } from './styled'

const Component = (props) => {
    return (
        <StyledWrapper>
            <div className="viewer">
                <img src="//via.placeholder.com/512x512" alt="" />
            </div>

            <div className="imagesWrap">
                <div className="ctlPrev">◀</div>
                <ul>
                    <li>
                        <img src="//via.placeholder.com/120x120" alt="" />
                    </li>
                    <li>
                        <img src="//via.placeholder.com/120x120" alt="" />
                    </li>
                    <li>
                        <img src="//via.placeholder.com/120x120" alt="" />
                    </li>
                    <li>
                        <img src="//via.placeholder.com/120x120" alt="" />
                    </li>
                    <li>
                        <img src="//via.placeholder.com/120x120" alt="" />
                    </li>
                    <li>
                        <img src="//via.placeholder.com/120x120" alt="" />
                    </li>
                </ul>
                <div className="ctlNext">▶</div>
            </div>
        </StyledWrapper>
    )
}

export default Component
