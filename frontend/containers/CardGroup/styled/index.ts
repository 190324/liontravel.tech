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
            margin: 0;
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
        h3 {
            font-family: 'Pinyon Script', cursive;
            font-size: 14px;
            padding: 0;
            margin: 0;
            position: relative;
            width: fit-content;
            padding: 0 10px;
            margin: 0 auto;
            &:before {
                content: '';
                display: inline-block;
                position: absolute;
                width: 100%;
                height: 6px;
                text-align: center;
                left: 0;
                top: 4px;
                background: ${(props) => props.theme.colors.primary};
                z-index: -1;
            }
        }
    }
    .itemWrap {
        display: flex;
        flex-wrap: wrap;
        .item {
            width: calc(50% - 16px);
            margin: 8px;
            @media ${device.laptop} {
                width: calc(25% - 16px);
            }
            @media ${device.laptopL} {
                width: calc(20% - 16px);
            }
        }
    }
`
