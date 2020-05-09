import styled, { css } from 'styled-components'

const StyledMiddleLine = css`
    content: ' ';
    width: calc(50% - 12px);
    height: 2px;
    background: #000;
    display: block;
    position: absolute;
    top: 11px;
`

export const StyledWrapper = styled.ul<any>`
    margin: 0;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
    li {
        list-style: none;
        display: inline-block;
        width: calc(100% / 5);
        text-align: center;
        position: relative;
        &:not(:first-child):before {
            ${StyledMiddleLine}
            left: 0;
        }
        &:not(:last-child):after {
            ${StyledMiddleLine}
            right: 0;
        }
        .serial {
            border-radius: 50%;
            font-size: 14px;
            width: 22px;
            height: 22px;
            border: 1px solid #000;
            background: #fff;
            margin: 0 auto;
            font-weight: bold;
            line-height: 22px;
        }
        &.active {
            .serial {
                border: 1px solid ${(props) => props.theme.colors.primary};
                background: ${(props) => props.theme.colors.primary};
                color: #fff;
            }
        }
        .name {
            font-size: 14px;
            padding: 2px 0;
        }
    }
`
