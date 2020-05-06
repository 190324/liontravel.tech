import styled, { css } from 'styled-components'

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
        max-width: 512px;
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
    padding: 0;
    display: flex;
    flex-wrap: unwrap;
    padding: 6px;
    margin: 0 -3px;
    overflow: hidden;
    li {
        cursor: pointer;
        width: 100%;
        min-width: 120px;
        height: 120px;
        list-style: none;
        font-size: 0;
        padding: 0 5px;
        img {
            width: inherit;
            height: auto;
            object-fit: cover;
        }
    }
`
