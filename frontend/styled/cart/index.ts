import styled, { css } from 'styled-components'

export const StyledWrapper = styled.div`
    max-width: ${(props) => props.theme.size.tablet};
    margin: 0 auto;
    .steps {
        display: none;
        &.active {
            display: block;
        }
    }
`
