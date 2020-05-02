import styled, { css } from 'styled-components'

const StyledOrSeperate = css`
    content: ' ';
    position: absolute;
    width: 1px;
    height: 30px;
    border-left: 1px solid #222;
    left: calc(50% - 0.5px);
`

export const StyledWrapper = styled.div`
    max-width: ${(props) => props.theme.size.tablet};
    margin: 0 auto;
    .title {
        font-weight: bold;
        font-size: 24px;
        padding: 30px 0;
        &:before {
            content: ' ';
            border-left: 3px solid ${(props) => props.theme.colors.primary};
            padding-right: 12px;
        }
    }
    .loginWrap {
        display: flex;
        justify-content: space-between;
        .emailLogin {
            width: 50%;
            .item {
                padding: 10px 0;
                &.extra {
                    text-align: right;
                    margin: 0 -20px;
                    a {
                        color: #222;
                        display: inline-block;
                        text-decoration: none;
                        padding: 0 16px;
                    }
                }
            }
        }
        .or {
            width: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            &:before {
                ${StyledOrSeperate}
                top: calc(50% - 50px);
            }
            &:after {
                ${StyledOrSeperate}
                bottom: calc(50% - 50px);
            }
        }
        .socialAuth {
            width: calc(50% - 80px);
            .item {
                padding: 10px 0;
            }
        }
    }
`
