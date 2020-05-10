import styled from 'styled-components'
import { device } from '@styled/_app'

export const StyledWrapper = styled.div<any>`
    @media ${device.tablet} {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    & ~ div {
        margin-top: 16px;
    }
`

export const StyledLabelWrap = styled.label<any>`
    padding: 0;
    width: 120px;
    box-sizing: border-box;
    display: block;
    padding: 6px 0;
    @media ${device.tablet} {
        padding: 0 10px;
    }
`

export const StyledInputWrap = styled.input<any>`
    display: block;
    flex: 1;
    width: 100%;
    height: 40px;
    font-size: 14px;
    box-sizing: border-box;
    outline: none;
    padding: 0 10px;
`

StyledWrapper.defaultProps = {}
