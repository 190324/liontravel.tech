import styled, { css } from 'styled-components'

export const StyledWrapper = styled.div`
    max-width: ${(props) => props.theme.size.tablet};
    margin: 0 auto;
    .stepsWrap {
        padding: 16px 0;
    }
    .steps {
        display: none;
        &.active {
            display: block;
        }
    }
    .switchPageWrap {
        display: flex;
        justify-content: space-around;
    }
`
