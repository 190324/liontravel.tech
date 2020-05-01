import styled from 'styled-components'

export const StyledWrapper = styled.div<any>`
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    border-radius: ${(props) => props.size / 2}px;
    background: url('${(props) => props.src}') no-repeat ${(props) =>
    props.theme.colors.secondary}
`
