import * as React from 'react'
import { StyledContainer } from './styled'
import PageTitle from '@components/PageTitle'
import Menu from './menu'

interface Props {
    title?: string
}

const Container: React.FC<Props> = (props) => {
    return (
        <React.Fragment>
            <StyledContainer>
                <Menu />
                <div className="memberContent">
                    {props.title ? (
                        <PageTitle className="title">{props.title}</PageTitle>
                    ) : null}
                    {props.children}
                </div>
            </StyledContainer>
        </React.Fragment>
    )
}

export default Container
