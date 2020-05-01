import styled from 'styled-components'

export const StyledWrapper = styled.div<any>`
    display: flex;
    .ctl {
        width: 34px;
        height: 34px;
        background: #222;
        color: #fff;
        text-align: center;
        line-height: 32px;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
    }
    .input {
        input {
            width: 80px;
            height: 34px;
            box-sizing: border-box;
            text-align: center;
            font-size: 20px;
            outline: none;
            border: 2px solid #222;
        }
    }
`
