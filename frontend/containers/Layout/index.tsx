import * as React from 'react'
import { useAmp } from 'next/amp'
import Header from '@containers/Header'
import Footer from '@containers/Footer'
import { StyledContainer } from './styled'

interface Props {
    hasHeader?: boolean
    hasFooter?: boolean
}

const Container: React.FC<Props> = (props) => {
    const isAmp = useAmp()

    return (
        <React.Fragment>
            {isAmp ? null : !props.hasHeader ? null : <Header />}
            <StyledContainer>{props.children}</StyledContainer>
            {!props.hasFooter ? null : <Footer />}
        </React.Fragment>
    )
}

Container.defaultProps = {
    hasHeader: true,
    hasFooter: true,
}

export default Container
