import styled from 'styled-components'

export const StyledWrapper = styled.div<any>`
    font-weight: bold;
    font-size: 24px;
    padding: 30px 0;
    &:before {
        content: ' ';
        border-left: 3px solid ${(props) => props.theme.colors.primary};
        padding-right: 12px;
    }
`
