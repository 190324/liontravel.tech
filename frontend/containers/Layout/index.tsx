import * as React from 'react'
import Header from '@containers/Header'
import Footer from '@containers/Footer'
import { StyledContainer } from './styled'

const Container: React.FC = (props) => {
    return (
        <React.Fragment>
            <Header />
            <StyledContainer>{props.children}</StyledContainer>
            <Footer />
        </React.Fragment>
    )
}

export default Container
