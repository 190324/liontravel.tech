import styled, { css } from 'styled-components'
import { device } from '@styled/_app'

const StyledSwitchArrow = css`
    color: #fff;
    background: rgba(125, 125, 125, 0.8);
    height: 100px;
    width: 20px;
    border-radius: 4px;
    position: absolute;
    top: calc(50% - 50px);
    text-align: center;
    line-height: 100px;
    font-size: 14px;
    cursor: pointer;
`

export const StyledWrapper = styled.div<any>`
    overflow: hidden;
    .viewer {
        font-size: 0;
        width: 100%;
        display: none;
        @media ${device.tablet} {
            display: block;
        }
        img {
            width: inherit;
        }
    }
    .imagesWrap {
        position: relative;
        .ctlPrev {
            ${StyledSwitchArrow}
            left: -1px;
        }
        .ctlNext {
            ${StyledSwitchArrow}
            right: -1px;
        }
    }
`

export const StyledUlWrapper = styled.ul<any>`
    margin: 0;
    padding: 10px 0;
    white-space: nowrap;
    overflow-x: hidden;
    @media ${device.tablet} {
        height: auto;
    }
    li {
        display: inline-block;
        width: 100%;
        @media ${device.tablet} {
            width: calc(100% / 4);
            padding: 0 5px;
            box-sizing: border-box;
        }
        img {
            width: 100%;
            height: auto;
            object-fit: cover;
        }
    }
`
