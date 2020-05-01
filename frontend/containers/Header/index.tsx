import * as React from 'react'
import { StyledWrapper } from './styled'
import Menu from '@components/Icon/Menu'
import Bell from '@components/Icon/Bell'
import Search from '@components/Icon/Search'
import Avator from '@components/Avator'

const Container = () => {
    return (
        <StyledWrapper>
            <div className="inner">
                <div className="item">
                    <Menu color="#FFF" fontSize="20px" />
                </div>
                <div className="item logo">{process.env.APP_NAME}</div>
            </div>
            <div className="inner">
                <div className="item">
                    <Search color="#FFF" fontSize="18px" />
                </div>
                <div className="item">
                    <Bell color="#FFF" fontSize="20px" />
                </div>
                <div className="item">
                    <Avator size="30" src="//via.placeholder.com/30" />
                </div>
            </div>
        </StyledWrapper>
    )
}

export default Container
