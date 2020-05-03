import styled from 'styled-components'

export const StyledWrapper = styled.div<any>`
    display: block;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    padding: 8px;
    &.page {
        position: fixed;
    }
    &.container {
        position: relative;
    }
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &::after {
        content: ' ';
        display: block;
        width: ${(props) => props.size * 0.8}px;
        height: ${(props) => props.size * 0.8}px;
        border-radius: 50%;
        border: ${(props) =>
            `${props.size / 13}px solid ${props.theme.colors.primary}`};
        border-color: ${(props) =>
            `${props.theme.colors.primary} transparent ${props.theme.colors.primary} transparent`};
        animation: spin 1.2s linear infinite;
    }
    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

StyledWrapper.defaultProps = {
    size: 80,
}
