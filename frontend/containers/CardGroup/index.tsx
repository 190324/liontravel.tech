import * as React from 'react'
import Card from '@components/Card'
import { StyledWrapper } from './styled'

interface Props {
    title: string
}

const Container: React.FC<Props> = (props) => {
    return (
        <StyledWrapper>
            <div className="title">
                <h2>{props.title}</h2>
            </div>
            <div className="itemWrap">
                <Card className="item" />
                <Card className="item" />
                <Card className="item" />
                <Card className="item" />
                <Card className="item" />
                <Card className="item" />
            </div>
        </StyledWrapper>
    )
}

export default Container
