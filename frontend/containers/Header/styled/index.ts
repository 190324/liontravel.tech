import styled from 'styled-components'
import { device } from '@styled/_app'

export const StyledWrapper = styled.div`
    height: 54px;
    background: ${(props) => props.theme.colors.primary};
    .innerWrap {
        height: inherit;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        max-width: ${(props) => props.theme.size.laptopL};
        .inner {
            display: flex;
            align-items: center;
            .item {
                padding: 0 12px;
                display: inline-flex;
                cursor: pointer;
                &.logo {
                    font-weight: bold;
                    font-size: 20px;
                    padding: 0 4px;
                    a {
                        color: #fff;
                        text-decoration: none;
                    }
                }
                &.login {
                    a {
                        color: #fff;
                        text-decoration: none;
                    }
                }
            }
        }
    }
`

export const StyledNav = styled.section<any>`
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: ${(props) =>
        props.isOpen ? 0 : `calc((100% + ${props.paddingRL}px * 2) * -1)`};
    background-color: #222;
    overflow-x: hidden;
    transition: 0.2s;
    padding: 0 ${(props) => props.paddingRL}px;
    box-sizing: border-box;
    @media ${device.tablet} {
        width: ${(props) => props.width}px;
        left: ${(props) =>
            props.isOpen
                ? 0
                : `calc((${props.width} + ${props.paddingRL}px * 2) * -1)`};
    }
    ul {
        margin: 0;
        padding: 0;
        li {
            &:nth-child(1) {
                text-align: right;
                font-size: 40px;
                &:hover {
                    color: #fff;
                }
            }
            list-style: none;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
            padding: 6px 0;
            &.active {
                color: ${(props) => props.theme.colors.primary};
            }
            &:hover {
                color: ${(props) => props.theme.colors.secondary};
            }
        }
    }
`

StyledNav.defaultProps = {
    width: 250,
    paddingRL: 20,
}
