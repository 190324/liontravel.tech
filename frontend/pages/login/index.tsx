import * as React from 'react'
import { withApollo } from '@lib/withApollo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useMutation } from '@apollo/react-hooks'
import { StyledWrapper } from '@styled/login'
import Input from '@components/Input'
import Button from '@components/Button'
import PageTitle from '@components/PageTitle'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'

import { MUTATION_LOGIN } from '@graphql/user'

const Page = () => {
    const router = useRouter()
    const [login, { data }] = useMutation(MUTATION_LOGIN)
    const [emailLogin, setEmailLogin] = React.useState({
        email: '',
        password: '',
    })

    const clickLogin = () => {
        let result = login({
            variables: {
                input: {
                    ...emailLogin,
                },
            },
        })
        result.then((rs) => {
            let row = rs?.data?.login
            switch (row.code) {
                case 200:
                    let _data = row.data
                    Cookies.set('access_token', _data.access_token, {
                        expires: 7,
                        domain: process.env.AUTH_DOMAIN,
                    })
                    Cookies.set('refresh_token', _data.refresh_token, {
                        expires: 7,
                        domain: process.env.AUTH_DOMAIN,
                    })
                    Cookies.set('token_type', _data.token_type, {
                        expires: 7,
                        domain: process.env.AUTH_DOMAIN,
                    })
                    Cookies.set('expires', _data.expires, {
                        expires: 7,
                        domain: process.env.AUTH_DOMAIN,
                    })

                    router.push('/member', '/member')
                    break
                case 406:
                    break
                default:
                    break
            }
        })
    }

    return (
        <StyledWrapper>
            <PageTitle>會員登入</PageTitle>
            <div className="loginWrap">
                <div className="emailLogin">
                    <div className="item">
                        <Input
                            type="text"
                            name="email"
                            placeholder="請輸入 e-mail"
                            onChange={(value) => {
                                setEmailLogin((prev) => {
                                    return { ...prev, email: value }
                                })
                            }}
                        />
                    </div>
                    <div className="item">
                        <Input
                            type="password"
                            name="password"
                            placeholder="請輸入密碼"
                            onChange={(value) => {
                                setEmailLogin((prev) => {
                                    return { ...prev, password: value }
                                })
                            }}
                        />
                    </div>
                    <div className="item">
                        <Button
                            bg="primary"
                            color="white"
                            display="block"
                            onClick={clickLogin}
                        >
                            登入
                        </Button>
                    </div>
                    <div className="item extra">
                        <Link href="/signup">
                            <a>免費註冊</a>
                        </Link>
                        <Link href="/">
                            <a>忘記密碼</a>
                        </Link>
                    </div>
                </div>
                <div className="or">
                    <span>或</span>
                </div>
                <div className="socialAuth">
                    <div className="item">
                        {/* <Button bg="#36609F" color="white" display="block">
                            Facebook 登入
                        </Button> */}
                        <FacebookLogin
                            appId={process.env.FACEBOOK_APP_ID}
                            autoLoad={false}
                            fields="name,email,picture"
                            onClick={() => {}}
                            callback={() => {}}
                        />
                    </div>
                    <div className="item">
                        {/* <Button bg="#ff635e" color="white" display="block">
                            Google 登入
                        </Button> */}
                        <GoogleLogin
                            clientId={process.env.GOOGLE_CLIENT_ID}
                            buttonText="Login with Google"
                            onSuccess={() => {}}
                            onFailure={() => {}}
                        ></GoogleLogin>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    )
}

export default withApollo(Page)
