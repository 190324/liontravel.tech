import * as React from 'react'
import Link from 'next/link'
import { StyledWrapper } from '@styled/login'
import Input from '@components/Input'
import Button from '@components/Button'

const Page = () => {
    return (
        <StyledWrapper>
            <div className="title">會員登入</div>
            <div className="loginWrap">
                <div className="emailLogin">
                    <div className="item">
                        <Input type="text" placeholder="請輸入 e-mail" />
                    </div>
                    <div className="item">
                        <Input type="password" placeholder="請輸入密碼" />
                    </div>
                    <div className="item">
                        <Button bg="primary" color="white" display="block">
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
                        <Button bg="#36609F" color="white" display="block">
                            Facebook 登入
                        </Button>
                    </div>
                    <div className="item">
                        <Button bg="#ff635e" color="white" display="block">
                            Google 登入
                        </Button>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    )
}

export default Page
