import * as React from 'react'
import { StyledWrapper } from './styled'

const Container = () => {
    return (
        <StyledWrapper>
            <div className="inner">
                <div className="logo">
                    <h1>{process.env.APP_NAME}</h1>
                </div>
                <div>供練習及展示使用</div>
                <div className="copyright">
                    Copyright &copy; 2020 {process.env.APP_NAME} All rights
                    reserved
                </div>
            </div>
        </StyledWrapper>
    )
}

export default Container
