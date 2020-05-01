import styled, { css } from 'styled-components'
import { device } from '@styled/_app'

const StyledTitleLine = () => css`
    content: ' ';
    border-top: 2px solid #222;
    width: 20px;
    position: absolute;
    transform-origin: center center;
    top: 50%;
`

export const StyledWrapper = styled.div`
    > .title {
        text-align: center;
        padding: 10px 0;
        h2 {
            display: inline-block;
            padding: 0 10px;
            position: relative;
            &:before {
                ${StyledTitleLine}
                left: -20px;
            }
            &:after {
                ${StyledTitleLine}
                right: -20px;
            }
        }
    }
    .itemWrap {
        display: flex;
        flex-wrap: wrap;
        .item {
            width: calc(100% - 16px);
            margin: 8px;
            @media ${device.tablet} {
                width: calc(50% - 16px);
            }
            @media ${device.laptop} {
                width: calc(25% - 16px);
            }
            @media ${device.laptopL} {
                width: calc(20% - 16px);
            }
        }
    }
`
