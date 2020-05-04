import * as React from 'react'
import { StyledWrapper } from '@root/styled/logout'
import Cookies from 'js-cookie'

const { useEffect } = React

const Page = () => {
    useEffect(() => {
        Cookies.remove('access_token', {
            path: '',
            domain: `${process.env.AUTH_DOMAIN}`,
        })
        location.href = '/login'
    }, [])

    return (
        <StyledWrapper>
            <p className="logout">
                登出中<span>.</span>
                <span>.</span>
                <span>.</span>
            </p>
        </StyledWrapper>
    )
}

export default Page
