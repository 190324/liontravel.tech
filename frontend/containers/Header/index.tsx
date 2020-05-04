import * as React from 'react'
import Link from 'next/link'
import { StyledWrapper, StyledNav } from './styled'
import Menu from '@components/Icon/Menu'
import Bell from '@components/Icon/Bell'
import Search from '@components/Icon/Search'
import Avator from '@components/Avator'

import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

const Container = () => {
    const [isLogin, setIsLogin] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)

    React.useEffect(() => {
        try {
            const user = jwt_decode(Cookies.get('access_token'))
            if (user) {
                setIsLogin(true)
            } else {
                setIsLogin(false)
            }
        } catch {
            setIsLogin(false)
        }
    })

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

                        {!isLogin ? (
                            <>
                                <div className="item login">
                                    <Link href="/login">
                                        <a>登入</a>
                                    </Link>
                                </div>
                                <div className="item login">
                                    <Link href="/signup">
                                        <a>註冊</a>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="item">
                                    <Bell color="#FFF" fontSize="20px" />
                                </div>
                                <div className="item">
                                    <Avator
                                        size="30"
                                        src="//via.placeholder.com/30"
                                    />
                                </div>
                                <div className="item login">
                                    <Link href="/logout">
                                        <a
                                            onClick={(e) => {
                                                e.preventDefault()
                                                Cookies.remove('access_token', {
                                                    path: '',
                                                    domain: `${process.env.AUTH_DOMAIN}`,
                                                })
                                                location.reload()
                                            }}
                                        >
                                            登出
                                        </a>
                                    </Link>
                                </div>
                            </>
                        )}
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
