import * as React from 'react'
import { useAmp } from 'next/amp'
import Header from '@containers/Header'
import Footer from '@containers/Footer'
import { StyledContainer } from './styled'

const Container: React.FC = (props) => {
    const isAmp = useAmp()

    return (
        <React.Fragment>
            {isAmp ? null : <Header />}
            <StyledContainer>{props.children}</StyledContainer>
            <Footer />
        </React.Fragment>
    )
}

export default Container
