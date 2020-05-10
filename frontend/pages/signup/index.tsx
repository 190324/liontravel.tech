import * as React from 'react'
import { withApollo } from '@lib/withApollo'
import Router from 'next/router'
import { StyledWrapper } from '@styled/signup'
import { useMutation } from '@apollo/react-hooks'
import PageTitle from '@components/PageTitle'
import Button from '@components/Button'
import Input from '@components/Input'

const { useState } = React
import { MUTATION_SIGNUP } from '@graphql/user'

const Page = () => {
    const [signup, { data }] = useMutation(MUTATION_SIGNUP)
    const [emailSignup, setEmailSignup] = useState({
        email: null,
        name: null,
        password: null,
        confirm_password: null,
    })

    const clickSignup = () => {
        if (emailSignup.email == '') {
            alert('e-mail 必填')
            return
        }
        if (emailSignup.name == '') {
            alert('名稱必填')
            return
        }
        if (emailSignup.password == '') {
            alert('密碼必填')
            return
        }
        if (emailSignup.password != emailSignup.confirm_password) {
            alert('兩次密碼輸入不相符')
            return
        }

        let result = signup({
            variables: {
                input: {
                    email: emailSignup.email,
                    name: emailSignup.name,
                    password: emailSignup.password,
                },
            },
        })

        result.then((rs) => {
            if (rs.data.user.code == 200) {
                alert('註冊成功，請登入')
                Router.push('/login')
            } else {
                alert('填寫資料異常')
            }
        })
    }

    return (
        <StyledWrapper>
            <PageTitle>註冊會員</PageTitle>
            <div className="inner">
                <div className="item">
                    <Input
                        type="text"
                        name="email"
                        value={emailSignup.email}
                        placeholder="請輸入 e-mail"
                        onChange={(value) => {
                            setEmailSignup((prev) => {
                                return { ...prev, email: value }
                            })
                        }}
                    />
                </div>
                <div className="item">
                    <Input
                        type="text"
                        name="name"
                        value={emailSignup.name}
                        placeholder="請輸入暱稱"
                        onChange={(value) => {
                            setEmailSignup((prev) => {
                                return { ...prev, name: value }
                            })
                        }}
                    />
                </div>
                <div className="item">
                    <Input
                        type="password"
                        name="password"
                        value={emailSignup.password}
                        placeholder="請輸入密碼"
                        onChange={(value) => {
                            setEmailSignup((prev) => {
                                return { ...prev, password: value }
                            })
                        }}
                    />
                </div>
                <div className="item">
                    <Input
                        type="password"
                        name="comfirm_password"
                        value={emailSignup.confirm_password}
                        placeholder="確認密碼"
                        onChange={(value) => {
                            setEmailSignup((prev) => {
                                return { ...prev, confirm_password: value }
                            })
                        }}
                    />
                </div>
                <div className="item">
                    <Button
                        bg="primary"
                        color="white"
                        display="block"
                        onClick={clickSignup}
                    >
                        免費註冊
                    </Button>
                </div>
            </div>
        </StyledWrapper>
    )
}

export default withApollo(Page)
