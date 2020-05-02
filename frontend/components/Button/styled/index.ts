import styled from 'styled-components'

export const StyledWrapper = styled.button<any>`
    background-color: ${(props) =>
        props.theme.colors[props.bg] ? props.theme.colors[props.bg] : props.bg};
    border: none;
    color: ${(props) =>
        props.theme.colors[props.color]
            ? props.theme.colors[props.color]
            : props.color};
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: ${(props) => props.display};
    font-size: 16px;
    cursor: pointer;
    width: ${(props) => (props.display == 'block' ? '100%' : 'auto')};
`

StyledWrapper.defaultProps = {
    display: 'inline-block',
}
