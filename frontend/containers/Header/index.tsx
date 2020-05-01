import * as React from 'react'
import Link from 'next/link'
import { StyledWrapper, StyledNav } from './styled'
import Menu from '@components/Icon/Menu'
import Bell from '@components/Icon/Bell'
import Search from '@components/Icon/Search'
import Avator from '@components/Avator'

const Container = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <React.Fragment>
            <StyledWrapper>
                <div className="innerWrap">
                    <div className="inner">
                        <div
                            className="item"
                            onClick={() => {
                                setIsOpen(true)
                            }}
                        >
                            <Menu color="#FFF" fontSize="20px" />
                        </div>
                        <div className="item logo">
                            <Link href="/">
                                <a>{process.env.APP_NAME}</a>
                            </Link>
                        </div>
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
                </div>
            </StyledWrapper>
            <StyledNav isOpen={isOpen}>
                <ul>
                    <li
                        onClick={() => {
                            setIsOpen(false)
                        }}
                    >
                        &times;
                    </li>
                    <li>電玩遊戲</li>
                    <li className="active">3C與筆電</li>
                    <li>居家生活</li>
                </ul>
            </StyledNav>
        </React.Fragment>
    )
}

export default Container
