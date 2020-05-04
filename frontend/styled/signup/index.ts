import styled, { css } from 'styled-components'

export const StyledWrapper = styled.div`
    max-width: ${(props) => props.theme.size.mobileM};
    margin: 0 auto;
    .inner {
        .item {
            padding: 10px 0;
        }
    }
`
