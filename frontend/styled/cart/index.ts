import styled, { css } from 'styled-components'

export const StyledWrapper = styled.div`
    max-width: ${(props) => props.theme.size.tablet};
    margin: 0 auto;
    .stepsWrap {
        padding: 16px 0;
    }
    .stepWrap {
        display: none;
        padding: 0 16px;
        &.active {
            display: block;
        }
    }
    .switchPageWrap {
        padding: 16px 0;
        display: flex;
        justify-content: space-around;
    }
`
