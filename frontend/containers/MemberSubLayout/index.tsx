import * as React from 'react'
import { StyledContainer } from './styled'
import Menu from './menu'

const Container: React.FC = (props) => {
    return (
        <React.Fragment>
            <StyledContainer>
                <Menu />
                {props.children}
            </StyledContainer>
        </React.Fragment>
    )
}

export default Container
