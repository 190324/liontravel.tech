import * as React from 'react'
import { StyledWrapper, Col } from './styled'

const Component = () => {
    return (
        <StyledWrapper gutter={40}>
            <Col span={10} className="ec-row">
                <div>12</div>
            </Col>
            <Col span={10} className="ec-row">
                <div>34</div>
            </Col>
            <Col span={4} className="ec-row">
                <div>56</div>
            </Col>
        </StyledWrapper>
    )
}

export default Component
